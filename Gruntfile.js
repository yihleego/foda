// Use this file to validate all js and json, 
//   bundle and minify the game js and css

// Require grunt and it's dependencies listed in package.json
// > run "npm install" then
// > run "grunt" in the game root folder


module.exports = function(grunt) {
  var init = {
    'pkg': grunt.file.readJSON('package.json'),
    'version': {
      defaults: {
        src: ['client/service-worker.js', 'client/package.json', 'client/manifest.json']
      }
    },
    'cssmin': { 
      target: {
        files: [{
          expand: true,
          cwd: 'client/css',
          src: ['*.css'],
          dest: 'client/bundle/css',
          ext: '.min.css'
        },{
          expand: true,
          rebaseTo: 'client/css',
          cwd: 'client/css/heroes',
          src: ['*.css'],
          dest: 'client/bundle/css/heroes',
          ext: '.min.css'
        }]
      }
    },
    'uglify': {
      options: {
        banner: '// <%= pkg.name %> grunt <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */'
      },
      target: {
        files: [{
          src: 'client/js/*.js',
          dest: 'client/bundle/js/game.min.js',
        },{
          src: 'client/js/*/**.js',
          dest: 'client/bundle/js/after.min.js'
        }]
      }
    },
    'concat': {
      css: {
        src: [
          'client/bundle/css/*.min.css',
          'client/bundle/css/**/*.min.css'
        ],
        dest: 'client/bundle/game.min.css'
      },
      js: {
        src: [
          'client/bundle/js/game.min.js',
          'client/bundle/js/after.min.js'
        ],
        dest: 'client/bundle/game.min.js'
      }
    },
    'clean':  [
      'client/bundle/js',
      'client/bundle/css'
    ],
    'compress': {
      main: {
        options: { 
          mode: 'gzip',
          level: 9
        },
        expand: true,
        cwd: 'client/',
        src: ['**/*.min.css','**/*.min.js','**/*.json', '!**/node_modules/**'],
        dest: 'gzip/'
      }
    }
  };
  /*if (electron) {
    init.electron = {
      winBuild: {
        options: {
          asar: true,
          overwrite: true,
          dir: 'client',
          out: 'downloads/windows',
          electronVersion: 'latest',
          platform: 'win32',
          arch: 'ia32'
        }
      },
      macosBuild: {
        options: {
          asar: true,
          overwrite: true,
          dir: 'client',
          out: 'downloads/mac',
          electronVersion: 'latest',
          platform: 'darwin',
          arch: 'x64'
        }
      },
      linuxBuild: {
        options: {
          asar: true,
          overwrite: true,
          dir: 'client',
          out: 'downloads/linux',
          electronVersion: 'latest',
          platform: 'linux',
          arch: 'ia32'
        }
      }
    };
  }*/
  grunt.initConfig(init);
  grunt.loadNpmTasks('grunt-version');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  var tasks = ['version', 'cssmin', 'uglify', 'concat', 'clean', 'compress'];
  grunt.registerTask('default', tasks);
};
