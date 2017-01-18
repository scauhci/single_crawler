/**
 * Created by Will Bean on 2016/12/10.
 */
'use strict';

exports.Strategy = {//js,css,images等文件的保存策略
    "SAVE_IN_ROOT": 1,//保存在根目录下
    "SAVE_IN_SUB_DIR": 2//保存在各级子目录下
};

exports.uniqueArray = function (arr) {//数组去重
    let hash = {},
        len = arr.length,
        result = [];

    for (let i = 0; i < len; i++){
        if (!hash[arr[i]]){
            hash[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result;
};

exports.timer = function (date,msg) {//简易版计时器
    console.log(msg + " : "+(new Date() - date) +"ms" );
};

exports.linkCheck = function(link) {
    'use strict';
    if (link === "/") {
        return false;
    }
    return !/^#|javascript:|mailto:|tel:/.test(link);
};

exports.urlFormat = function (url) {//去除多于的/
    'use strict';
    return url.replace(/([^:])[\/\\\\]{2,}/g, "$1/");
};