'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat');

gulp.task('less', function () {
    return gulp.src(['./less/eBusiness/eBusinessBeltone.less','./less/*.less'])
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./'));
});


gulp.task('watch', function () {
    gulp.watch(['./less/**/*.less'], ['less']);
});