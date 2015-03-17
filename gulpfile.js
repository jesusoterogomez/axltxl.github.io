/*
  Gulp tasks for axltxl.github.io
 */

// The so-called gulp modules
var gulp    = require('gulp'),
    sass    = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    open    = require('gulp-open'),
    clean   = require('gulp-clean');

// Directories
var dir_build = 'build/',
    dir_dist  = 'dist/';

// Build tasks
gulp.task('build', ['html', 'styles', 'media', 'watch']);
gulp.task('build:dist', ['html:dist', 'styles:dist', 'watch']);

// Watch task
gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['styles'])
  gulp.watch('index.html', ['html'])
  gulp.watch('/media/**', ['media'])
});

// Build html
gulp.task('html', function() {
  return gulp.src('index.html')
  .pipe(gulp.dest(dir_build));
});

// Media
gulp.task('media', function(){
  return gulp.src('media/**')
  .pipe(gulp.dest(dir_build + '/media'));
});

// Compile SCSS (SaSS)
gulp.task('styles', function() {
  return sass('scss/styles.scss', {
    style: 'compact',
    compass: true
  })
  .on('error', function (err) { 
    console.log(err.message); 
  })
  .pipe(gulp.dest(dir_build + 'css/'));
});

// Open a web browser window
gulp.task('open:www', ['connect'], function() {
  //
  return gulp.src(dir_build + '/index.html')
  .pipe(open('', {
    url:"http://localhost:8080"
  }));
});

// Start a web server
gulp.task('connect', ['build'], function() {
  //
  return connect.server({
    root: dir_build
  });
});

//
gulp.task('serve', ['open:www']);

//
gulp.task('clean', function() {
  gulp.src(dir_dist,  {read: false})
  .pipe(clean({force:true}))
  gulp.src(dir_build, {read: false})
  .pipe(clean({force:true}))
  gulp.src('.sass-cache', {read: false})
  .pipe(clean({force:true}))
});