/**
 * Gulp tasks for
 * my website y'all
 * @author  Jack Armley
 */

// Dependancies
var
  gulp = require('gulp'),
  shell = require('gulp-shell'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cmq = require('gulp-combine-media-queries'),
  modernizr = require('gulp-modernizr'),
  rjs = require('gulp-requirejs'),
  connect = require('gulp-connect');

// Static assets
var
  root = 'themes/jackarmley/source/static',
  assets = {
    styles: root + '/styles/',
    scripts: root + '/scripts/'
  };

// Task: styles
gulp.task('styles', function(){
  return sass(assets.styles + '_sass/',{
    style: 'compressed',
    cache: false
  })
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(cmq({
    log: true
  }))
  .pipe(gulp.dest(assets.styles));
});

// Task: requirejs
gulp.task('requirejs',function(){
  rjs({
    name: 'app',
    baseUrl : assets.scripts,
    mainConfigFile : assets.scripts + 'app.js',
    out: 'app.min.js'
  })
    .pipe(gulp.dest(assets.scripts));
});

// Task: modernizr
gulp.task('modernizr',function(){
  gulp.src([
    assets.scripts + '*.min.js',
    assets.styles + '*.css'
  ])
    .pipe(modernizr())
    .pipe(gulp.dest(assets.scripts));
});

// Task: hexo generate
gulp.task('hexogen', shell.task(
  'hexo generate'
));

// Task: hexo deploy
gulp.task('hexodeploy', shell.task([
  'hexo generate',
  'hexo clean',
  'hexo deploy'
]));

// Task: watch
gulp.task('watch',function(){
  gulp.watch(assets.styles + '**/*.scss',['styles']);
});

// Task: server
gulp.task('server', function(){
  connect.server({
    port: 3000,
    root: 'public'
  });
});

// Task: deploy
gulp.task('deploy',[
  'styles',
  'requirejs',
  'modernizr',
  'hexodeploy'
]);

// Task: default
gulp.task('default',[
  'server',
  'styles',
  'requirejs',
  'modernizr',
  'watch'
]);
