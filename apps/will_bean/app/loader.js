/**
 * Created by Will Bean on 2017/1/9.
 */
'use strict';

const cheerio = require('cheerio');
const phantom = require("phantom");
const publicAPI = require('./publicAPI');

module.exports = (url)=>{
    let phantomJs = null;
    let page = null;
    let date,$ =  null;

    date = new Date();
    return phantom.create().then(function (ph) {
        publicAPI.timer(date, "[phantom create 用时]");
        date = new Date();
        phantomJs = ph;
        return phantomJs.createPage();
    }).then(function (p) {
        publicAPI.timer(date, "[phantom createPage 用时]");
        date = new Date();
        page = p;
        return page.open(url);
    }).then(function (status) {
        publicAPI.timer(date, "[page open 用时]");
        if (status === 'success') {
            date = new Date();
            return page.property('content');
        } else {
            return Promise.reject(new Error("PAGE_OPEN_ERROR"));
            page.close();
            phantomJs.exit();
        }
    }).then(function (html) {
        publicAPI.timer(date, "[phantom content 用时]");
        $ = cheerio.load(html);
        page.close();
        phantomJs.exit();
        return Promise.resolve($);
    }).catch(function (err) {
        console.log(err);
        page.close();
        phantomJs.exit();
    });


};