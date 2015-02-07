// Load plugins
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	haml = require('gulp-ruby-haml'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	browserSync = require('browser-sync'),
	del = require('del'),
	reload = browserSync.reload;

// Paths
var paths = {
	haml: ['./src/haml/**/*.haml'],
	scss: ['./src/scss/styles.scss'],
	js: ['./src/js/*.js'],
	img: ['./src/img/**/*.{png,jpg,jpeg,gif}'],
	extras: ['./src/*.*'],
	libs: ['./src/js/vendor/**/*.js'],
	dist: {
		html: './dist/',
		css: './dist/css/',
		js: './dist/js/',
		img: './dist/img/',
		extras: './dist/',
		libs: './dist/js/'
	}
};

// Server initiation and livereload, opens server in browser
gulp.task('serve', function() {
	browserSync.init(null, {
		server: {
			baseDir: './dist'
		},
		host: 'localhost',
		port: 4000
    });
});

// Get and render all .haml files recursively 
gulp.task('haml', function () {
	return gulp.src(paths.haml)
		.pipe(haml({doubleQuote: true}))
		.pipe(gulp.dest(paths.dist.html))
		.pipe(reload({stream:true}))
		.pipe(notify({ message: 'Haml task complete' }));
});

// Styles
gulp.task('styles', function() {
	return gulp.src(paths.scss)
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(paths.dist.css))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest(paths.dist.css))
		.pipe(reload({stream:true}))
		.pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src(paths.js)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(paths.dist.js))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist.js))
		.pipe(reload({stream:true}))
		.pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
	return gulp.src(paths.img)
		.pipe(cache(imagemin({ optimizationLevel: 5, interlaced: true })))
		.pipe(gulp.dest(paths.dist.img))
		.pipe(reload({stream:true}))
		.pipe(notify({ message: 'Images task complete' }));
});

// Extras
gulp.task('extras', function() {
	return gulp.src(paths.extras)
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream:true}));
});

// Vendor scripts
gulp.task('libs', function() {
	return gulp.src(paths.libs)
		.pipe(gulp.dest(paths.dist.js))
		.pipe(reload({stream:true}));
});

// Delete the dist directory and start fresh
gulp.task('clean', function(cb) {
	del(['dist'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('haml', 'styles', 'scripts', 'images', 'extras', 'libs', 'watch');
});

// Watch
gulp.task('watch', ['serve'], function() {
	// Watch .haml files
	gulp.watch(paths.haml, ['haml']);
	// Watch .scss files
	gulp.watch('./src/scss/**/*.scss', ['styles']);
	// Watch .js files
	gulp.watch(paths.js, ['scripts']);
	// Watch image files
	gulp.watch(paths.img, ['images']);
	// Watch extra files
	gulp.watch(paths.extras, ['extras']);
	// Watch vendor files
	gulp.watch(paths.libs, ['libs']);
});