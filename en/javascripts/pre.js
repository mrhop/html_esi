/**
 * Created by Donghui Huo on 2015/5/18.
 */
var userAgent_infos = navigator.userAgent;

var iphone = userAgent_infos.search("iPhone");
var android = userAgent_infos.search("Android");
var palmpre = userAgent_infos.search("webOS");
var berry = userAgent_infos.search("BlackBerry");
var ipod = userAgent_infos.search("iPod");

if (iphone >= 0 || android >= 0 || palmpre >= 0 || berry >= 0 || ipod >= 0) {
    window.location = "mobile.html";
}


function clientSideInclude( url) {
    var req = false;

// Safari, Firefox, 及其他非微软浏览器
    if (window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch (e) {
            req = false;
        }
    } else if (window.ActiveXObject) {

// For Internet Explorer on Windows
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                req = false;
            }
        }
    }

    if (req) {
// 同步请求，等待收到全部内容
        req.open('GET', url, false);
        req.send(null);
        document.write( req.responseText);
    }
}