/**
 * Created by Will Bean on 2017/1/9.
 */
'use strict';

const publicAPI = require('./publicAPI');
const parse = require('url').parse;

const fetcher = {
    getJS : function (scripts,config) {
        let res = [];
        scripts.each(function (i, script) {
            let src = script.attribs.src;
            if (!src) {
                return;
            }
            if (!config.getOuterJs) {
                if (/^https?/.test(src)) {
                    return;
                }
            }
            res.push(src);
        });
        return publicAPI.uniqueArray(res);
    },
    getCSS : function (stylesheets,config) {
        let res = [];
        stylesheets.each(function (i, style) {
            let src = style.attribs.href;
            if (!src) {
                return;
            }
            if (!config.getOuterCss) {
                if (/^https?/.test(src)) {
                    return;
                }
            }
            res.push(src);
        });
        return publicAPI.uniqueArray(res);
    },
    getImages : function (imgs,config) {
        let res = [];
        imgs.each(function (i, img) {
            let src = img.attribs.src;
            if (!src) {
                return;
            }
            if (!config.getOuterImages) {
                if (/^https?/.test(src)) {
                    return;
                }
            }
            res.push(src);
        });
        return publicAPI.uniqueArray(res);
    },
    getLink : function (list, url, links, config, count) {
        let urlInfo = parse(config.url);
        links.each(function (i, link) {
            let href = link.attribs.href;
            if (!href) {
                return;
            }
            if (!config.containOutLink && /^https?/.test(href) && href.indexOf(urlInfo.hostname) < 0) {
                return;
            }
            if (!config.totalNum || count < config.totalNum) {
                if (!/^https?/.test(href)) {
                    if (!/\.html|\.htm|\.asp|\.jsp$/.test(url)) {
                        href = url + "/" + href;
                    } else {
                        href = url.substring(0, url.lastIndexOf("/")) + "/" + href;
                    }
                }
                if (publicAPI.linkCheck(href)) {
                    list.push(publicAPI.urlFormat(href));
                }
            }
        });
        return publicAPI.uniqueArray(list);
    }
};

module.exports = fetcher;