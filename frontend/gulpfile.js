/**
 * Some sweet gulp action,
 * 'cause who doesn't like burgers
 * and shakes together, yeah?
 */

// Include dependancies
var
    gulp = require('gulp'),
    data = require('gulp-data'),
    sass = require('gulp-ruby-sass'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-combine-media-queries'),
    connect = require('gulp-connect')
;

// Define static assets
var
    root = 'static',
    assets = {
        markup: root + '/markup/',
        styles: root + '/styles/',
        scripts: root + '/scripts/'
    }
;

// Styles
gulp.task('styles', function(){
    return sass(assets.styles + 'sass/',{
        style: 'compressed',
        noCache: true
    })
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(cmq({
        log: true
    }))
    .pipe(gulp.dest(assets.styles));
});

// Markup
gulp.task('markup', function() {
  return gulp.src(assets.markup + 'jade/*.jade')
    .pipe(data(function(file) {
      return require('./' + assets.markup + '/jade/locals.json');
    }))
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('./'));
});

// Server
gulp.task('server', function(){
    connect.server({
        port: 3000,
        root: './'
    });
});

// Watch
gulp.task('watch',function(){
    gulp.watch(assets.styles + '**/*.scss',['styles']);
    gulp.watch(assets.markup + '**/*.jade',['markup']);
});

// Default
gulp.task('default', [
    'styles',
    'markup',
    'watch',
    'server'
]);
