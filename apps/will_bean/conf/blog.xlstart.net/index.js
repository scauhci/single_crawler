/**
 * Created by Will Bean on 2017/1/18.
 */
'use strict';

module.exports = {
    url: "http://blog.lxstart.net/",//目的网站,
    savePath: "J:/nodejs/spider/web_getter/result",//保存路径
    containOutLink: false, //是否爬取外部链接
    totalNum: 10, //爬取页面上限，0为不限制
    endWith: "html",//文件结尾
    saveStrategy: 1,
    getOuterJs: false,//是否爬取远端js
    getOuterCss: false,//是否爬取远端Css
    getOuterImages: false,//是否爬取远端图片
    autorun: true
};