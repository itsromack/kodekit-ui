module.exports = function(grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load time-grunt and all grunt plugins found in the package.json
    require('jit-grunt')(grunt);

    // grunt config
    grunt.initConfig({

        // Grunt variables
        srcPath: 'src',
        distPath: 'dist',
        jquery: [
            'node_modules/jquery/dist/jquery.js',
            '<%= srcPath %>/js/koowa.noconflict.js'
        ],
        admin: [
            '<%= srcPath %>/js/kquery.set.js',
            'node_modules/select2/dist/js/select2.full.js',
            'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
            'node_modules/footable/js/footable.js',
            'node_modules/jqtree/tree.jquery.js',
            '<%= srcPath %>/js/custom-file-input.js',
            '<%= srcPath %>/js/bootstrap-dropdown.js',
            '<%= srcPath %>/js/bootstrap-tab.js',
            '<%= srcPath %>/js/bootstrap-tooltip.js',
            '<%= srcPath %>/js/jquery.ui.widget.js',
            '<%= srcPath %>/js/koowa.scopebar.js',
            '<%= srcPath %>/js/koowa.class.js',
            '<%= srcPath %>/js/koowa.grid.js',
            '<%= srcPath %>/js/koowa.tree.js',
            '<%= srcPath %>/js/datepicker.js',
            '<%= srcPath %>/js/overflowing.js',
            '<%= srcPath %>/js/tabbable.js',
            '<%= srcPath %>/js/off-canvas-menu.js',
            '<%= srcPath %>/js/konami.js',
            '<%= srcPath %>/js/main.js',
            '<%= srcPath %>/js/kquery.unset.js'
        ],


        // Compile sass files
        sass: {
            dist: {
                files: {
                    '<%= distPath %>/css/admin.css': '<%= srcPath %>/scss/admin-ui.scss'
                }
            },
            options: {
                includePaths: [
                    'node_modules'
                ],
                outputStyle: 'expanded',
                sourceMap: false
            }
        },


        // Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['> 5%', 'last 2 versions']
            },
            files: {
                expand: true,
                flatten: true,
                src: '<%= distPath %>/css/*.css',
                dest: '<%= distPath %>/css/'
            }
        },


        // Minify and clean CSS
        cssmin: {
            options: {
                roundingPrecision: -1,
                sourceMap: false
            },
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= distPath %>/css',
                    ext: '.min.css'
                }]
            }
        },


        // Iconfont
        webfont: {
            icons: {
                src: [
                    'node_modules/openiconic/svg/*.svg',
                    '<%= srcPath %>/icons/*.svg'
                ],
                dest: '<%= distPath %>/fonts/k-icons',
                destCss: '<%= srcPath %>/scss/utilities',
                options: {
                    codepointsFile: '<%= srcPath %>/fonts/k-icons-codepoints',
                    font: 'k-icons',
                    hashes: false,
                    stylesheet: 'scss',
                    relativeFontPath: '../fonts/icons/',
                    template: '<%= srcPath %>/icons/template.css',
                    types: 'eot,woff,ttf,svg',
                    htmlDemo: false
                }
            }
        },


        // Modernizr
        modernizr: {
            dist: {
                "cache": true,
                "dest": "<%= distPath %>/js/modernizr.js",
                "options": [
                    "html5shiv",
                    "prefixedCSS",
                    "setClasses"
                ],
                "uglify": false,
                "tests": [
                    "eventlistener",
                    "appearance",
                    "boxshadow",
                    "checked",
                    "cssanimations",
                    "flexbox",
                    "flexboxlegacy",
                    "flexboxtweener",
                    "flexwrap",
                    "touchevents"
                ],
                "crawl" : false,
                "customTests" : [],
                "classPrefix": "k-"
            }
        },


        // Concatenate files
        concat: {
            js: {
                options: {
                    // Footable needs to be provided with jQuery at all times
                    // which conflicts with our call to jQuery.noConflict(true)
                    process: function(src, filepath) {
                        if (filepath.match('footable.js')) {
                            return '(function($) { var jQuery = $;'+src+'})(jQuery);';
                        }
                        return src;
                    }
                },
                files: {
                    '<%= distPath %>/js/bootstrap.js': [
                        '<%= srcPath %>/js/bootstrap.js'
                    ],
                    '<%= distPath %>/js/jquery.js': [
                        'node_modules/jquery/dist/jquery.js',
                        '<%= srcPath %>/js/koowa.noconflict.js'
                    ],
                    '<%= distPath %>/js/jquery.min.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        '<%= srcPath %>/js/koowa.noconflict.js'
                    ],
                    '<%= distPath %>/js/jquery.magnific-popup.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/jquery.magnific-popup.min.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/jquery.validate.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/jquery-validation/dist/jquery.validate.js',
                        '<%= srcPath %>/js/jquery.validate.patch.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/koowa.datepicker.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        '<%= srcPath %>/js/datepicker.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/koowa.select2.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/select2/dist/js/select2.full.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/koowa.select2.min.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/select2/dist/js/select2.full.min.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/koowa.tree.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/jqtree/tree.jquery.js',
                        '<%= srcPath %>/js/koowa.tree.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/koowa.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        '<%= srcPath %>/js/jquery.ui.widget.js',
                        '<%= srcPath %>/js/koowa.scopebar.js',
                        '<%= srcPath %>/js/koowa.class.js',
                        '<%= srcPath %>/js/koowa.grid.js',
                        '<%= srcPath %>/js/koowa.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/tooltip.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        '<%= srcPath %>/js/bootstrap-tooltip.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/admin.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/select2/dist/js/select2.full.js',
                        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
                        'node_modules/footable/js/footable.js',
                        'node_modules/jqtree/tree.jquery.js',
                        '<%= srcPath %>/js/custom-file-input.js',
                        '<%= srcPath %>/js/bootstrap-dropdown.js',
                        '<%= srcPath %>/js/bootstrap-tab.js',
                        '<%= srcPath %>/js/bootstrap-tooltip.js',
                        '<%= srcPath %>/js/jquery.ui.widget.js',
                        '<%= srcPath %>/js/koowa.scopebar.js',
                        '<%= srcPath %>/js/koowa.class.js',
                        '<%= srcPath %>/js/koowa.grid.js',
                        '<%= srcPath %>/js/koowa.tree.js',
                        '<%= srcPath %>/js/datepicker.js',
                        '<%= srcPath %>/js/overflowing.js',
                        '<%= srcPath %>/js/tabbable.js',
                        '<%= srcPath %>/js/off-canvas-menu.js',
                        '<%= srcPath %>/js/konami.js',
                        '<%= srcPath %>/js/main.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ]
                }
            }
        },


        // Uglify
        uglify: {
            options: {
                sourceMap: false,
                preserveComments: /(?:^!|@(?:license|preserve|cc_on))/ // preserve @license tags
            },
            build: {
                files: {
                    '<%= distPath %>/js/bootstrap.min.js': [
                        '<%= srcPath %>/js/bootstrap.js'
                    ],
                    '<%= distPath %>/js/koowa.datepicker.min.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        '<%= srcPath %>/js/datepicker.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/koowa.tree.min.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/jqtree/tree.jquery.js',
                        '<%= srcPath %>/js/koowa.tree.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/tooltip.min.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        '<%= srcPath %>/js/bootstrap-tooltip.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/modernizr.min.js': [
                        '<%= distPath %>/js/modernizr.js'
                    ],
                    '<%= distPath %>/js/jquery.validate.min.js': [
                        '<%= srcPath %>/js/kquery.set.js',
                        'node_modules/jquery-validation/dist/jquery.validate.js',
                        '<%= srcPath %>/js/jquery.validate.patch.js',
                        '<%= srcPath %>/js/kquery.unset.js'
                    ],
                    '<%= distPath %>/js/koowa.min.js': '<%= distPath %>/js/koowa.js',
                    '<%= distPath %>/js/admin.min.js': '<%= distPath %>/js/admin.js'
                }
            }
        },


        // Watch files
        watch: {
            webfont: {
                files: [
                    'node_modules/open-iconic/svg/*.svg',
                    '<%= srcPath %>/icons/*.svg'
                ],
                tasks: ['webfont'],
                options: {
                    interrupt: true,
                    atBegin: false
                }
            },
            sass: {
                files: [
                    '<%= srcPath %>/scss/*.scss',
                    '<%= srcPath %>/scss/**/*.scss'
                ],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            javascript: {
                files: [
                    '<%= srcPath %>/js/*.js'
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            concat: {
                files: [
                    '<%= srcPath %>/js/*.js'
                ],
                tasks: ['concat'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        }


    });

    // The dev task will be used during development
    grunt.registerTask('default', ['modernizr', 'watch']);

    // JS only
    grunt.registerTask('js', ['watch:concat']);

};