const http=require('http');
const cheerio=require('cheerio');
const url='http://blog.lxstart.net';
const distinguish={
    header:".article-title"
};
function filter(html){
    var detail_message={
        title:[],
        detailUrl:[]
    };
    var $=cheerio.load(html);
    var title=$(distinguish.header);
    $(title).each(function(index,elem){
        detail_message.title.push(elem.firstChild.data);
        detail_message.detailUrl.push(url+elem.attribs.href);
    });
    return detail_message;
}
module.exports=filter;