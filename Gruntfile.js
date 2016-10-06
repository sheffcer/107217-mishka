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
          "css/style.css": "less/style.less",
          "css/normalize.css": "less/normalize.less"
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
          src: "css/*.css"
        }
      },
    // минификация изображений
      imagemin: {
        images: {
          options: {
            optimizationLevel: 10
          },
          files: [{
            expand: true,
            src: ["img/**/*.{png,jpg,gif}"]
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
            "img/symbols.svg": ["img/*.svg"]
          }
        }
      },

    // минификация svg спрайта
      svgmin: {
        symbols: {
          files: [{
            expand: true,
            src: ["img/*.svg"]
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
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    // слежение за файлами
    watch: {
      files: ["less/**/*.less"],
      tasks: ["less", "postcss"],
      options: {
        spawn: false
      }
    },

    csso: {
      style : {
        options: {
          report: "gzip"
        },
        files: {
          "css/style.min.css": ["css/style.css"]
        }
      }
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
    "less",
    "postcss",
    "csso"
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
