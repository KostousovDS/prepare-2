'use strict'

var gulp = require('gulp'); // определим переменную gulp
var sass = require('gulp-sass'); // определим переменную sass
var rigger = require('gulp-rigger'); // определим переменную rigger
var watch = require('gulp-watch'); // определим переменную watch
var copy = require('gulp-copy'); // определим переменную copy
var connect = require('gulp-connect'); // определим переменную connect

sass.compiler = require('node-sass'); // определим переменную sass.compiler

gulp.task('sass', function () {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/styles/'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    watch('./src/styles/**/*.scss', gulp.series('sass'));
    watch(['./src/template/*.html', './src/index.html'], gulp.series('rigger'));
    watch('./src/js/**/*.js', gulp.series('js'));
});

gulp.task('rigger', function () {
    return gulp.src('./src/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src('./src/js/index.js')
        .pipe(rigger())
        .pipe(gulp.dest('./build/js/'))
        .pipe(connect.reload());
});

gulp.task('copy', function () {
    gulp.src('./src/images/**.*')
        .pipe(gulp.dest('./build/images/'))
});

gulp.task('copy', function () {
    gulp.src('./src/fonts/**.*')
        .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 9002
    });
});

gulp.task('default', gulp.parallel('watch', 'connect', 'rigger', 'copy', 'sass', 'js'));