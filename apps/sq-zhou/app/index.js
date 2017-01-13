const cheerio= require('cheerio');
const http=require('http');
const totalUrl=require('./url');
const Promise=require('bluebird');
const filter=require('./filter');
const url='http://blog.lxstart.net';
const fetchArray=[];
const dataArray={
    detailUrl:[],
    title:[]
};
function getHtml(url){
    return new Promise(function(resolve,reject){
        http.get(url, function (res){
            var html ='';
            res.on('data',function(data){
                html+=data;
            });
            res.on('end',function(){
                resolve(html);
            })
        }).on('error',function(e){
            reject(e);
            console.log('获取课程数据出错'+'e');
        });
    });
}
totalUrl.forEach(function(value){
   fetchArray.push(getHtml(value));
});

Promise
    .all(fetchArray)
    .then(function(pages){
        pages.forEach(function(html){
            var temp=filter(html);
            dataArray.title.push(temp.title);
            dataArray.detailUrl.push(temp.detailUrl);
        });
    })
    .then(function(){
         dataArray.detailUrl.forEach(function(value){
             value.forEach(function(val){
                 console.log(val);
             })
         });
        dataArray.title.forEach(function(value){
            value.forEach(function(val){
                console.log(val);
            })
        })
    });
