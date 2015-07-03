/**
 * Created by Donghui Huo on 2015/5/27.
 */
;

(function ($, window, undefined) {
    'use strict';

    $.Esi = function (type) {
        this._init(type);
    };
    $.Esi.slit_slider=null;
    $.Esi.menu_index=null;
    $.Esi.prototype = {
        _init: function (type) {
            if (type == "home") {
                this._svg_start_stop();
                $('#slider').slitslider({autoplay: true, keyboard: false, speed: 1000, onBeforeChange: beforeSlide});
            }else if(type=="developer"){
                this._basic_animation(1);
            }else if(type=="quality"){
                this._basic_animation(2);
            }else if(type=="property"){
                this._basic_animation(3);
            }else if(type=="upscalehomes"){
                this._basic_animation(4);
            }else if(type=="building"){
                $.Esi.menu_index = 5;
                $("div.middle-menu-box > ul li:nth-child(5) > a").addClass('sel');
                $("div.middle-menu-box > ul li:nth-child(5) ul").show();
                $.Esi.slit_slider = $('#slider').slitslider({autoplay: false, speed: 500});
                this._nav_arrow_action();
            }else if(type=="house"){
                $.Esi.menu_index = 5;
                $("div.middle-menu-box > ul li:nth-child(5) ul").show();
                var id = $("div.house-slider").attr("id").split("-")[2];
                $("div.middle-menu-box > ul li:nth-child(5) ul li:nth-child("+id+") a").addClass('sel');
                $.Esi.slit_slider  = $('#slider').slitslider({autoplay: false,width:"100%", speed: 500,onBeforeChange:this._on_before_hange_without_links});
                this._nav_action();
            }else if(type=="design"){
                $.Esi.menu_index = 6;
                $("div.middle-menu-box > ul li:nth-child(6) > a").addClass('sel');
                $("div.middle-menu-box > ul li:nth-child(6) ul").show();
                $.Esi.slit_slider  = $('#slider').slitslider();
                $('.content-wrapper .scrollbar-page').perfectScrollbar({maxScrollbarLength:50});
            }else if(type=="location"){
                this._basic_animation(7);
            }
        },
        _svg_start_stop: function () {
            var mySVGsToInject = document.querySelectorAll('.js-svg-injected');

            SVGInjector(mySVGsToInject);

            $("button").click(function () {
                if (document.getElementById('backgroundMusic').muted == true) {
                    document.getElementById('backgroundMusic').muted = false;
                } else {
                    document.getElementById('backgroundMusic').muted = true;
                }
            });

            var music = document.getElementById('backgroundMusic');

            $(".btn.volume").click(function () {
                if (music.paused) {
                    music.play();
                    $(".btn.volume").removeClass("muted");
                } else {
                    music.pause();
                    $(".btn.volume").addClass("muted");
                }
            });
        },
        _nav_arrow_action:function(){
            var $navArrows = $('#nav-arrows');
            $navArrows.children(':last').on('click', function () {
                $.Esi.slit_slider.next();
                return false;
            });
            $navArrows.children(':first').on('click', function () {
                $.Esi.slit_slider.previous();
                return false;
            });
        },
        _nav_action:function(){
            var $nav = $('.pages > li');
            $nav.each(function (i) {
                $(this).on('click', function (event) {
                    var $dot = $(this);
                    if (!$.Esi.slit_slider.isActive()) {
                        $nav.removeClass('active');
                        $dot.addClass('active');
                    }
                    $.Esi.slit_slider.jump(i + 1);
                    return false;
                });
            });
        },
        _nav_links_action:function(i){
            var $navLinks = $("div.middle-menu-box > ul > li:nth-child("+i+") ul li a");
            $navLinks.each(function (i) {
                $(this).on('click', function (event) {
                    var $dot = $(this);
                    if (!$.Esi.slit_slider.isActive()) {
                        $navLinks.removeClass('sel');
                        $dot.addClass('sel');
                    }
                    $.Esi.slit_slider.jump(i + 1);
                    return false;
                });
            });
        },
        _on_before_hange:function(slide,idx,dir){
            var $nav = $('.pages > li');
            $nav.removeClass('active');
            $nav.eq(idx).addClass('active');
            var $navLinks = $("div.middle-menu-box > ul > li:nth-child("+$.Esi.menu_index+") ul li a");
            $navLinks.removeClass('sel');
            $navLinks.eq(idx).addClass('sel');
            beforeSlide(slide, idx,dir);
        },
        _on_before_hange_without_links:function(slide,idx,dir){
            var $nav = $('.pages > li');
            $nav.removeClass('active');
            $nav.eq(idx).addClass('active');
            beforeSlide(slide, idx,dir);
        },
        _basic_animation:function(i){
            $.Esi.menu_index = i;
            $("div.middle-menu-box > ul li:nth-child("+i+") ul").show();
            $("div.middle-menu-box > ul li:nth-child("+i+") ul li:first-child a").addClass('sel');
            $.Esi.slit_slider = $('#slider').slitslider({autoplay: false, speed: 500,onBeforeChange:this._on_before_hange});
            this._nav_arrow_action();
            this._nav_action();
            this._nav_links_action(i);
            $('.content-wrapper .scrollbar-page').perfectScrollbar({maxScrollbarLength:50});
        }

    };
    $.fn.esi = function (type) {
        new $.Esi(type);
    }
})(jQuery, window);

$(document).ready(function () {
    $(window).esi($("body").attr("data-doc-type"));
});