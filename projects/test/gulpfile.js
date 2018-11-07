var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs'),
		coffee			 = require('gulp-coffee');

gulp.task('coffee', function(){
	gulp.src('./coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./js/'));
});

gulp.task('browser-sync', ['styles', 'scripts', 'coffee'], function() {
		browserSync.init({
				server: {
						baseDir: "./"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'libs/bootstrap/js/bootstrap.min.js',
		'libs/html5shiv/es5-shim.min.js',
		'libs/jquery/jquery-1.11.2.min.js',
		'libs/modernizr/modernizr.js',
		'libs/plugins-scroll/plugins-scroll.js',
		'libs/respond/respond.min.js',
		'libs/waypoints/waypoints.min.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./js/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	//gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('./coffee/*.coffee', ['coffee']);
	gulp.watch('./js/*.js').on("change", browserSync.reload);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./coffee/*.coffee').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);