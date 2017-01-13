const url='http://blog.lxstart.net';
const pageLength = 4;
function getUrl(){
    var totalUrl=[];
    totalUrl[totalUrl.length]=url;
    for(var i=2;i<4;i++){
        totalUrl[totalUrl.length]=url+'/page/'+i+'/';
    }
    return totalUrl;
}
module.exports=getUrl();