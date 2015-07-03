/**
 * Created by Donghui Huo on 2015/5/28.
 */
module.exports = function (grunt) {
    grunt.config.init({
        'concat': {
            scripts: {
                src: [
                    'javascripts/jquery/jquery-1.7.2.min.js',
                    'javascripts/jquery/jquery.blockUI.js',
                    'javascripts/jquery/pushmenu/classie.js',
                    'javascripts/jquery/pushmenu/modernizr.custom.js',
                    'javascripts/jquery/pushmenu/gnmenu.js',
                    'javascripts/svgInjector/svg-injector.min.js',
                    'javascripts/jquery/slides/modernizr.custom.79639.js',
                    'javascripts/jquery/slides/jquery.ba-cond.min.js',
                    'javascripts/jquery/slides/jquery.slitslider.js',
                    'javascripts/base.js'],
                dest: 'tmp/app.js'
            }
        },
        'uglify': {
            scripts: {
                files: {
                    'javascripts/app.js': 'tmp/app.js'
                }
            }
        },
        'compass': {
            dev: {
                options: {
                    sassDir: ['sass'],
                    cssDir: ['stylesheets'],
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: ['sass'],
                    cssDir: ['stylesheets'],
                    environment: 'production'
                }
            }
        },
        'copy': {
            main: {
                files:[
                    {expand: true, src: ['*.html'], dest: 'dest/', filter: 'isFile'},
                    {expand: true, src: ['include/*.html'], dest: 'dest/', filter: 'isFile'},
                    {expand: true, src: ['javascripts/pre.js'], dest: 'dest/', filter: 'isFile'},
                    {expand: true, src: ['javascripts/app.js'], dest: 'dest/', filter: 'isFile'},
                    {expand: true, src: ['javascripts/esi.js'], dest: 'dest/', filter: 'isFile'},
                    {expand: true, src: ['javascripts/jquery/fancybox/jquery.fancybox.js'], dest: 'dest/', filter: 'isFile'},
                    {expand: true, src: ['javascripts/jquery/scrollbar/perfect-scrollbar.jquery.min.js'], dest: 'dest/', filter: 'isFile'},
                    {expand: true, src: ['javascripts/jquery/scrollbar/perfect-scrollbar.jquery.min.js'], dest: 'dest/', filter: 'isFile'},
                    {expand: true, src: ['stylesheets/**'], dest: 'dest/'},
                    {expand: true, src: ['assets/**'], dest: 'dest/'},
                    {expand: true, src: ['images/**'], dest: 'dest/'},
                    {expand: true, src: ['favicon.ico'], dest: 'dest/', filter: 'isFile'}
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', "Builds the application.",
        ['compass:prod','concat', 'uglify','copy' ]);

}