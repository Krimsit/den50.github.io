var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create(),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    coffee       = require('gulp-coffee');
    lesss        = require('gulp-less');
 
gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(lesss())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('coffee', function(){
  gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./app/js/'));
});

gulp.task('browser-sync', ['styles', "less", 'scripts', 'coffee'], function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        notify: false
    });
});

gulp.task('styles', function () {
  return gulp.src('./sass/*.sass')
  .pipe(sass({
    includePaths: require('node-bourbon').includePaths
  }).on('error', sass.logError))
  .pipe(rename({suffix: '.min', prefix : ''}))
  .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
  .pipe(minifycss())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src([
    './app/libs/jquery/jquery-1.11.2.min.js',
    './app/libs/bootstrap/js/bootstrap.min.js',
    './app/libs/plugins-scroll/plugins-scroll.js',
    './app/libs/Snap.svg/dist/snap.svg-min.js'
    ])
    .pipe(concat('libs.js'))
    //.pipe(uglify()) //Minify libs.js
    .pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
  gulp.watch('./sass/*.sass', ['styles']);
  //gulp.watch('app/libs/**/*.js', ['scripts']);
  gulp.watch('./coffee/*.coffee', ['coffee']);
  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./app/js/*.js').on("change", browserSync.reload);
  gulp.watch('./app/*.html').on('change', browserSync.reload);
  gulp.watch('./coffee/*.coffee').on('change', browserSync.reload);
  gulp.watch('./less/*.less').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);