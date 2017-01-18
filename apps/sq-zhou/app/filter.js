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
        /*
         *关于代码为什么用这样的方式可以从title是一个多元素集合节点
         * 其中title中的一个节点含有如下的一些结构:
         * attribs:
         { class: 'article-title',
         href: '/2016/08/04/javascript/pattern/singleton/' },
         children:
         [ { data: 'Javascript 设计模式之单例模式',
         type: 'text',
         next: null,
         prev: null,
         * parent: [Circular] } ]}；

         *从结构出发，可以得到如下方法（可以自行console（elem）来查看节点的信息）
         */
        detail_message.title.push(elem.children[0].data);
        detail_message.detailUrl.push(url+elem.attribs.href);
    });
    return detail_message;
}
module.exports=filter;