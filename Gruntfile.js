/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      // options: {
      //   banner: '<%= banner %>',
      //   stripBanners: true
      // },
      dist: {
        src: [
            'scripts/libs/*.js', // All JS in the libs folder
            'scripts/nail.js'  // This specific file
        ],
        dest: 'scripts/build/js.js'
      }
    },
    uglify: {
      // options: {
      //   banner: '<%= banner %>'
      // },
      dist: {
        src: 'scripts/build/js.js',
        dest: 'scripts/build/js.min.js'
      }
    },
    imagemin: {
      dynamic: {
          files: [{
              expand: true,
              cwd: 'images/',
              src: ['*.{png,jpg,gif}'],
              dest: 'images/build/'
          }]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['scripts/**/*.js']
      }
    },
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    watch: {
      scripts: {
          files: ['scripts/**/*.js'],
          tasks: ['jshint', 'concat', 'uglify'],
          options: {
              spawn: false,
          },
      }
      // gruntfile: {
      //   files: '<%= jshint.gruntfile.src %>',
      //   tasks: ['jshint:gruntfile']
      // },
      // lib_test: {
      //   files: '<%= jshint.lib_test.src %>',
      //   tasks: ['jshint:lib_test', 'qunit']
      // }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
};
