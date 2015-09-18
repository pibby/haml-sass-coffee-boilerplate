// Load plugins
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	haml = require('gulp-ruby-haml'),
	coffee = require('gulp-coffee'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	server = require('gulp-server-livereload'),
	del = require('del');

// Paths
var paths = {
	haml: ['./src/haml/**/*.haml'],
	scss: ['./src/scss/**/*.scss'],
	js: ['./src/coffee/**/*.coffee'],
	img: ['./src/img/**/*.{png,jpg,jpeg,gif}'],
	extras: ['./src/*.*'],
	dist: {
		html: './dist/',
		css: './dist/css/',
		js: './dist/js/',
		img: './dist/img/',
		extras: './dist/'
	}
};

// Server initiation and livereload, opens server in browser
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true,
			port: 4000
    }));
});

// Get and render all .haml files recursively 
gulp.task('haml', function () {
	return gulp.src(paths.haml)
		.pipe(haml({doubleQuote: true}))
		.pipe(gulp.dest(paths.dist.html))
		.pipe(notify({ message: 'Haml task complete' }));
});

// Styles
gulp.task('styles', function() {
	return sass('./src/scss/**/*.scss')
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4'))
		.pipe(gulp.dest(paths.dist.css))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest(paths.dist.css))
		.pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('coffee', function() {
  return gulp.src(paths.js)
    .pipe(coffee())
		.pipe(gulp.dest(paths.dist.js))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist.js))
		.pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
	return gulp.src(paths.img)
		.pipe(cache(imagemin({ optimizationLevel: 5, interlaced: true })))
		.pipe(gulp.dest(paths.dist.img))
		.pipe(notify({ message: 'Images task complete' }));
});

// Extras
gulp.task('extras', function() {
	return gulp.src(paths.extras)
		.pipe(gulp.dest('dist'));
});

// Delete the dist directory and start fresh
gulp.task('clean', function(cb) {
	del(['dist'], cb);
});

// Default task
gulp.task('default', ['webserver'], function() {
    gulp.start('haml', 'styles', 'coffee', 'images', 'extras', 'watch');
});

// Build task
gulp.task('build', function() {
    gulp.start('clean', 'haml', 'styles', 'coffee', 'images', 'extras');
});

// Watch
gulp.task('watch', function() {
	// Watch .haml files
	gulp.watch(paths.haml, ['haml']);
	// Watch .scss files
	gulp.watch('./src/scss/**/*.scss', ['styles']);
	// Watch .js files
	gulp.watch(paths.js, ['coffee']);
	// Watch image files
	gulp.watch(paths.img, ['images']);
	// Watch extra files
	gulp.watch(paths.extras, ['extras']);
});