"use strict";

module.exports = function(grunt) {

  // подключаем плагин load-grunt-tasks, чтобы не перечислять все прочие плагины
  require("load-grunt-tasks")(grunt);
  require('time-grunt')(grunt);

  // описываем задачи, которые планируем использовать (их запуск - см. низ этого файла)
    grunt.initConfig({

    // компилируем препроцессор
    less: {
      style: {
        files: {
          // в какой файл, из какого файла
          "build/css/style.css": "less/style.less",
          "build/css/normalize.css": "less/normalize.less"
        }
      }
    },

    // обрабатываем postcss-ом (там только autoprefixer, на самом деле)
      postcss: {
        style: {
          options: {
            processors: [
              require("autoprefixer")({browsers: [
                "last 1 version",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions"
              ]}),
              require("css-mqpacker")({
                sort: true
              })
            ]
          },
          src: "build/css/*.css"
        }
      },
    // минификация изображений
      imagemin: {
        images: {
          options: {
            optimizationLevel: 3
          },
          files: [{
            expand: true,
            src: ["build/img/**/*.{png,jpg,gif}"]
          }]
        }
      },

    // объединение svg в спрайт
      svgstore: {
        options: {
          svg: {
            style: "display: none"
          }
        },
        symbols: {
          files: {
            "build/img/symbols.svg": ["img/*.svg"]
          }
        }
      },

    // минификация svg спрайта
      svgmin: {
        symbols: {
          files: [{
            expand: true,
            src: ["build/img/*.svg"]
          }]
        }
      },

    // очистка билда
      clean: {
        build: ["build"]
      },

    // копирование контента в build
      copy: {
        build: {
          files: [{
            expand: true,
            src: [
              "fonts/**/*.{woff,woff2}",
              "img/**",
              "js/**",
              "*.html"
            ],
            dest: "build"
          }]
        },
        html: {
          files: [{
            expand: true,
            src: ["*.html"],
            dest: "build"
          }]
        }
      },

      // postcss: {
    //   options: {
    //     processors: [
    //       // автопрефиксер и его настройки
    //       require("autoprefixer")({browsers: [
    //         "last 1 version",
    //         "last 2 Chrome versions",
    //         "last 2 Firefox versions",
    //         "last 2 Opera versions",
    //         "last 2 Edge versions"
    //       ]})
    //     ]
    //   },
    //   style: {
    //     src: "css/style.css"
    //    }
    // },

    // локальный сервер, автообновление
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    // слежение за файлами
    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"]
      },
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"],
        options: {
          spawn: false
        }
      }
    },

    csso: {
      style : {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/normalize.min.css": ["build/css/normalize.css"],
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    // публикация на GitHub Pages (будет доступен в сети по адресу http://ВАШ-НИКНЕЙМ.github.io/ВАШ-РЕПОЗИТОРИЙ/)
    'gh-pages': {
      options: {
        // какую папку считать результатом работы
        base: 'build'
      },
      src: '**/*'
    }

//    concat: {
//     options: {
//      separator: ';',
//    },
//     dist: {
//      src: ['js/test1.js', 'js/test2.js'],
//      dest: 'build/main.js',
//     }
//    },

//    uglify: {
//      dist: {
//        src: ['build/main.js'],
//        dest: 'build/main.min.js'
//      }
//    }

  });

  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  grunt.registerTask("image", "imagemin");
  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "symbols",
    "imagemin",
    "gh-pages"
//    "concat",
//    "uglify"
  ]);
};







//"use strict";
//
//module.exports = function(grunt) {
//  grunt.loadNpmTasks("grunt-contrib-less");
//  grunt.loadNpmTasks("grunt-browser-sync");
//  grunt.loadNpmTasks("grunt-contrib-watch");
//  grunt.loadNpmTasks("grunt-postcss");
//  require('time-grunt')(grunt);
//
//  grunt.initConfig({
//    less: {
//      style: {
//        files: {
//          "css/normalize.css": "less/normalize.less",
//          "css/style.css": "less/style.less"
//        }
//      }
//    },
//
//    postcss: {
//      style: {
//        options: {
//          processors: [
//            require("autoprefixer")({browsers: [
//              "last 1 version",
//              "last 2 Chrome versions",
//              "last 2 Firefox versions",
//              "last 2 Opera versions",
//              "last 2 Edge versions"
//            ]})
//          ]
//        },
//        src: "css/*.css"
//      }
//    },
//
//    browserSync: {
//      server: {
//        bsFiles: {
//          src: [
//            "*.html",
//            "css/*.css"
//          ]
//        },
//        options: {
//          server: ".",
//          watchTask: true,
//          notify: false,
//          open: true,
//          ui: false
//        }
//      }
//    },
//
//    watch: {
//      style: {
//        files: ["less/**/*.less"],
//        tasks: ["less", "postcss"],
//        options: {
//          spawn: false
//        }
//      }
//    }
//  });
//
//  grunt.registerTask("serve", ["browserSync", "watch"]);
//};
