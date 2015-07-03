/**
 * Created by Donghui Huo on 2015/5/18.
 */

var nav_arrow_action = function (slitslider) {
    var $navArrows = $('#nav-arrows');
    $navArrows.children(':last').on('click', function () {
        slitslider.next();
        return false;
    });
    $navArrows.children(':first').on('click', function () {
        slitslider.previous();
        return false;
    });
    var $nav = $('.pages > li');
    $nav.each(function (i) {
        $(this).on('click', function (event) {
            var $dot = $(this);
            if (!slitslider.isActive()) {
                $nav.removeClass('active');
                $dot.addClass('active');
            }
            slitslider.jump(i + 1);
            return false;
        });
    });
    var $navLinks = $("div.middle-menu-box > ul ul:first li a");
    $navLinks.each(function (i) {
        $(this).on('click', function (event) {
            var $dot = $(this);
            if (!slitslider.isActive()) {
                $navLinks.removeClass('sel');
                $dot.addClass('sel');
            }
            slitslider.jump(i + 1);
            return false;
        });
    });
}
var onBeforeChange = function (slide,idx,dir) {
    var $nav = $('.pages > li');
    $nav.removeClass('active');
    $nav.eq(idx).addClass('active');
    var $navLinks = $("div.middle-menu-box > ul ul:first li a");
    $navLinks.removeClass('sel');
    $navLinks.eq(idx).addClass('sel');
    beforeSlide(slide, idx,dir);
};
$(document).ready(function () {
    //_animated(".gn-menu-wrapper");
    $("div.middle-menu-box > ul ul:first").show();
    $("div.middle-menu-box > ul ul:first li:first-child a").addClass('sel');
    var slitslider = $('#slider').slitslider({autoplay: false, speed: 500,onBeforeChange:onBeforeChange});
    nav_arrow_action(slitslider);
    $('.content-wrapper .scrollbar-page').perfectScrollbar({maxScrollbarLength:50});
});