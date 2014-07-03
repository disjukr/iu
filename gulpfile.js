var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');

gulp.task('clean', function (callback) {
    del(['bin'], callback);
});

gulp.task('script', function () {
    gulp.src(['js/head.js', 'js/core.js', 'js/component/**', 'js/tail.js'])
        .pipe(concat('gosim.js'))
        .pipe(gulp.dest('bin'))
});

gulp.task('style', function () {
    gulp.src('styl/gosim.styl')
        .pipe(stylus({ errors: true }))
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
