var gulp = require('gulp');
var sass = require('gulp-sass'); 
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var pug = require('gulp-pug');
var runSequence = require('run-sequence');

//sass
gulp.task('sass', function() {
  return gulp.src('./src/css/*.sass') 
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./output/css')) 
    .pipe(browserSync.reload({
      stream: true
    }));
})

//pug
gulp.task('pug', function() {
    return gulp.src('./src/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./output/'))
})

//watch
gulp.task('watch', ['browserSync', 'sass', 'pug'], function (){
  gulp.watch('./src/css/*.sass', ['sass']);
  gulp.watch('./src/*.pug', ['pug']);
});

//reload
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './output/'
    },
  })
  gulp.watch("*.html").on("change", browserSync.reload);
});

//img optimize
gulp.task('images', function(){
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('output/img'))
});

// Speed Up Image Optimizer
gulp.task('images', function(){
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('output/img'))
});


gulp.task('default', function(callback) {
  runSequence(['sass', 'pug', 'browserSync', 'watch', 'images'],
    callback
  )
})