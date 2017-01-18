/**
 * Created by Will Bean on 2017/1/9.
 */
'use strict';

const loader = require('./loader');
const fetcher = require('./fetcher');
const storage = require('./storage');

class WebGetter{
    constructor(conf){
        this.conf = conf;
        this.list = [];
        this.count = 0;
    }

    load(url){
        loader(url).then($=>{
            let js = fetcher.getJS($('script'), this.conf);
            let css = fetcher.getCSS($("link[rel='stylesheet']"), this.conf);
            let images = fetcher.getImages($("img"), this.conf);

            if (!this.conf.totalNum || this.count < this.conf.totalNum) {
                this.list = fetcher.getLink(this.list, url, $("a"), this.conf, this.count);
            }

            let promises = [];
            let _this = this;
            promises.push(storage.saveHTML(url, $('html'), this.conf, function () {
                console.log("[Page:" + (_this.count + 1) + "]    Url:" + url + "    success!\n");
            }));
            promises.push(storage.saveJS(url, js, this.conf, function (x, js) {
                console.log("[Page:" + (_this.count + 1) + "]    Js" + (x) + "     Src:" + js + "    Success!\n");
            }));
            promises.push(storage.saveCSS(url, css, this.conf, function (x, css) {
                console.log("[Page:" + (_this.count + 1) + "]    Css" + (x) + "     Src:" + css + "    Success!\n");
            }));
            promises.push(storage.saveImages(url, images, this.conf, function (x, img) {
                console.log("[Page:" + (_this.count + 1) + "]    Images" + (x + 1) + "     Src:" + img + "    Success!\n");
            }));

            Promise.all(promises).then(()=>{
                this.count++;
                console.log("[Page:" + (this.count) + "] finished!");
                var cur = this.list.shift(), next = this.list[0];
                next = /^https?:/.test(next) ? next : cur + '/' + next;
                if (this.count < this.conf.totalNum && next) {
                    this.load(next);
                }
            }).catch(err=>{
                console.error(err);
            })
        }).catch(err=>{
            console.error(err);
        });

    }

    start(){
        this.load(this.conf.url);
    }
}

module.exports = WebGetter;