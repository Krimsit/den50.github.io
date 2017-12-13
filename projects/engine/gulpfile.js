var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create(),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    coffee       = require('gulp-coffee');

gulp.task('coffee', function(){
  gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./scripts/'));
});

gulp.task('browser-sync', ['coffee'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});



gulp.task('watch', function () {

  gulp.watch('./coffee/*.coffee', ['coffee']);
  gulp.watch('./scripts/*.js').on("change", browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./coffee/*.coffee').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);