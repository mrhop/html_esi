/**
 * Created by Donghui Huo on 2015/5/15.
 */

_handleRequest = function (method, container, url, param, complete) {
    $.blockUI.defaults.overlayCSS.backgroundColor = '#FFF';
    $.blockUI.defaults.overlayCSS.opacity = 0.1;
    $.blockUI.defaults.applyPlatformOpacityRules = false;// enable transparent overlay on FF/Linux

    $(document).ajaxStart($.blockUI(
        {
            css: {
//                width:          '50px',
//                left:           '50%',
                border: 'none',
                background: 'none'
            },
            message: '<img src="../images/loading.gif"/> '
        }));
    $.ajax({
        url: url,
        data: param,
        type: method,
        dataType: "html",
        success: function (data) {

            $(container).html(data);

            if (complete != '') {
                eval(complete);
            }
        },
        complete: function () {
            $.unblockUI();
        }
    });
};

_showmenu = function () {
    $(".top-menu").slideToggle();
}
var flag_showmenu=0;
_responsive = function () {
    var viewportWidth = $(window).width();
    if (viewportWidth < 661) {
        flag_showmenu=1;
        $(".body-left").css( "display","none" );
        $(".top-menu-bg").css("display", "block");
        // $(".pages").css( "display","none" );
        //$("#prevslide, .prevPage").css( {"left":"0","position" :"fixed" });
        // $("#nextslide, .nextPage").css( { "position" :"fixed" });
        // $(".pagespan").css( "padding-left","0" );
        //$("#supersized li").css( "margin-top","59px" );
    } else {
        $(".body-left").css( "display","block" );
        $(".top-menu-bg").css("display", "none");
        if($(".top-menu").css("display")!="none"&&flag_showmenu==1){
            _showmenu();
        }
        flag_showmenu = 0;
        // $(".pages").css( "display","block" );
        // $("#prevslide, .prevPage").css( {"left":"100px","position" :"absolute" });
        // $("#nextslide, .nextPage").css( { "position" :"absolute" });
        //  $(".pagespan").css( "padding-left","100px" );
        // $("#supersized li").css( "margin-top","0" );
    }
}





_animated = function(obj){
    $(obj).each(function(){
        $(this).css('visibility', 'visible');
        $(this).addClass($(this).data('fx'));
    });
}

var beforeSlide = function (slide, idx,dir){
    var before,after;
    before=idx==0?slide.prevObject.length-1:idx-1;
    if(dir=='next'){
        $(slide.prevObject[before]).addClass('sl-trans-back-elems');
    }
}

//all after document loaded

$(document).ready(function () {
    _responsive();

    $(window).resize(function () {
        _responsive();
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.animated').removeClass('animated');
    }

    $(".menu li").click(function () {
        $(".menu li.select ul").slideUp();
        $(this).find('ul').stop();
        $(this).find('ul').css("overflow","hidden");
        $(this).find('ul').slideDown();
        $('.li').removeClass('select');
        $(this).addClass('select');
    });


    $(".top-menu li").click(function () {
        $(".top-menu li.select ul").slideUp();
        $(this).find('ul').stop();
        $(this).find('ul').css("overflow","hidden");
        $(this).find('ul').slideDown();
        $('.li').removeClass('select');
        $(this).addClass('select');
    });
    new gnMenu(document.getElementById('gn-menu'));
});

