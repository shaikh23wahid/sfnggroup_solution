// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

//declare the task
/*
gulp.task('sass', function(done) {
    gulp.src(['public/style.css'])
        .pipe(sass())
        .pipe(concat('minimised.css'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('public/build/css'))
});
*/
//minify and concat css files into build folder as single file
gulp.task('styles', function() {
    console.log('----------------------------->>> STYLES Task');
    return gulp.src(['public/style.css','public/css/pptemplate.css'])
        .pipe(sass())
        .pipe(concat('ppbootstrap.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/build/css'))
});

// Default Task
gulp.task('default', ['styles']);