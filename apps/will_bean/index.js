/**
 * Created by Will Bean on 2017/1/9.
 * 
 * index.js-----程序入口
 * WebGetter -----业务逻辑（加载、获取、保存）
 * loader -----加载页面
 * fetcher -----获取页面信息（html，js，css，link）
 * storage -----保存
 *
 */
'use strict';

const fs = require('fs');
const path = require('path');
const WebGetter = require('./app/WebGetter');

const getTaskFiles = dir => {
    let list = fs.readdirSync(dir);
    list = list.map(file => {
            return require(path.join(__dirname, dir, file))
        });
    return list
};

const main = () => {
    let taskList = getTaskFiles('./conf');

    taskList.forEach(conf => {
        let app = new WebGetter(conf);
        if (conf.autorun) {
            app.start()
        }
    })
};

main();