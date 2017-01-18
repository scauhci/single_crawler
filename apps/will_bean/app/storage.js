/**
 * Created by Will Bean on 2017/1/9.
 */
'use strict';
const publicAPI = require('./publicAPI');
const request = require('request');
const fs = require('fs');
const parse = require('url').parse;

module.exports = {
    saveHTML: function (url, html, config, callback) {
        return new Promise((resolve, reject) =>{
            var urlInfo = parse(config.url);
            url = url.match(/https?:\/\/((?:(?![\?])[\S])*)/)[1];
            var endWith = /\/$/.test(url);
            url = endWith ? url.match(/(\S*)\/$/)[1] : url;
            var reg = new RegExp(/\.html|\.htm|\.asp|\.jsp$/);
            var usePathAsName = reg.test(url);
            var array = url.split("/");
            array[0] = urlInfo.hostname;
            var length = usePathAsName ? array.length - 1 : array.length;
            var currentPath = config.savePath;

            for (let i = 0; i < length; i++) {
                currentPath += "/" + array[i];

                if (!fs.existsSync(currentPath)) {
                    fs.mkdirSync(currentPath);
                }

                if (i === length - 1) {
                    var fileName = endWith ? "index." + config.endWith : usePathAsName ? array[array.length - 1] : array[array.length - 1] + '.' + config.endWith;
                    fs.writeFile(currentPath + "/" + fileName, html, function (err) {
                        if (err) {
                            reject(err);
                            console.log(err, "appendFile");
                        } else {
                            resolve();
                            callback();
                        }
                    });
                }
            }
        });

    },

    saveJS: function (url, js, config, callback) {
        return new Promise((resolve, reject)=>{
            if (!js.length) {
                resolve();
            }
            var urlInfo = parse(config.url);
            var length = js.length;
            var count = 0;
            var root = config.savePath + "/" + urlInfo.hostname;
            if (config.saveStrategy === publicAPI.Strategy.SAVE_IN_ROOT) {
                if (!fs.existsSync(root)) {
                    fs.mkdirSync(root);
                }
                for (let i = 0; i < length; i++) {
                    var reg = new RegExp(/^\//);
                    var path = reg.test(js[i]) ? js[i].substring(1) : js[i];
                    var array = path.split("/");
                    var currentPath = root;
                    var len = array.length;
                    for (let j = 0; j < len - 1; j++) {
                        currentPath += "/" + array[j];
                        if (!fs.existsSync(currentPath)) {
                            fs.mkdirSync(currentPath);
                        }
                        if (j === len - 2) {
                            request(url + js[i], function (err, res, body) {
                                if (err) {
                                    count++;
                                } else {
                                    fs.writeFile(root + "/" + js[i], body, function (err) {
                                        count++;
                                        if (count === length) {
                                            resolve();
                                        }
                                        if (err) {
                                            reject(err);
                                        } else {
                                            callback(count, js[i]);
                                        }
                                    });
                                }
                            })
                        }
                    }
                }
            }
        });

    },

    saveCSS: function (url, css, config, callback) {
        return new Promise((resolve, reject)=>{
            if (!css.length) {
                resolve();
            }
            var urlInfo = parse(config.url);
            var length = css.length;
            var count = 0;
            var root = config.savePath + "/" + urlInfo.hostname;
            if (config.saveStrategy === publicAPI.Strategy.SAVE_IN_ROOT) {
                if (!fs.existsSync(root)) {
                    fs.mkdirSync(root);
                }
                for (let i = 0; i < length; i++) {
                    var reg = new RegExp(/^\//);
                    var path = reg.test(css[i]) ? css[i].substring(1) : css[i];
                    var array = path.split("/");
                    var currentPath = root;
                    var len = array.length;
                    for (let j = 0; j < len - 1; j++) {
                        currentPath += "/" + array[j];
                        if (!fs.existsSync(currentPath)) {
                            fs.mkdirSync(currentPath);
                        }
                        if (j === len - 2) {
                            request(url + css[i], function (err, res, body) {
                                if (err) {
                                    count++;
                                } else {
                                    fs.writeFile(root + "/" + css[i], body, function (err) {
                                        count++;
                                        if (count === length) {
                                            resolve();
                                        }
                                        if (err) {
                                            reject(err);
                                        } else {
                                            callback(count, css[i]);
                                        }
                                    });
                                }
                            })
                        }
                    }
                }
            }
        });
        
    },

    saveImages: function (url, images, config, callback) {
        return new Promise((resolve, reject)=>{
            if (!images.length) {
                resolve();
            }
            var urlInfo = parse(config.url);
            var length = images.length;
            var count = 0;
            var root = config.savePath + "/" + urlInfo.hostname;
            if (config.saveStrategy === publicAPI.Strategy.SAVE_IN_ROOT) {
                if (!fs.existsSync(root)) {
                    fs.mkdirSync(root);
                }
                for (let i = 0; i < length; i++) {
                    var reg = new RegExp(/^\//);
                    var path = reg.test(images[i]) ? images[i].substring(1) : images[i];
                    var array = path.split("/");
                    var currentPath = root;
                    var len = array.length;
                    for (let j = 0; j < len - 1; j++) {
                        currentPath += "/" + array[j];
                        if (!fs.existsSync(currentPath)) {
                            fs.mkdirSync(currentPath);
                        }
                        if (j === len - 2) {
                            request.get(url + images[i]).on("response", function () {
                                callback(count, images[i]);
                                count++;
                                if (count === length) {
                                    resolve();
                                }
                            }).on("error", function (err) {
                                reject(err);
                            }).pipe(fs.createWriteStream(root + "/" + images[i]));
                        }
                    }
                }
            }
        });
        
    }
};

