var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

gulp.task('clean', function (callback) {
    del(['bin'], callback);
});

gulp.task('script', function () {
    gulp.src(['js/head.js', 'js/core.js', 'js/component/**', 'js/tail.js'])
        .pipe(concat('iu.js'))
        .pipe(gulp.dest('bin'));
    gulp.src('bin/iu.js')
        .pipe(uglify())
        .pipe(rename('iu.min.js'))
        .pipe(gulp.dest('bin'));
});

gulp.task('style', function () {
    gulp.src('styl/iu.styl')
        .pipe(stylus({ errors: true }))
        .pipe(gulp.dest('bin'));
    gulp.src('bin/iu.css')
        .pipe(minifyCSS())
        .pipe(rename('iu.min.css'))
        .pipe(gulp.dest('bin'));
});

gulp.task('image', function () {
    gulp.src('img/**')
        .pipe(gulp.dest('bin/img'));
});

gulp.task('watch', function () {
    gulp.watch('js/**', ['script']);
    gulp.watch('styl/**', ['style']);
    gulp.watch('img/**', ['image']);
});

gulp.task('default', ['watch', 'script', 'style', 'image']);
