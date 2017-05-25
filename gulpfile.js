const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pump = require('pump');
const babel = require('gulp-babel');
const include = require('gulp-include');

gulp.task('build', callback => {
    pump([
        gulp.src('src/core.js'),
        include(),
        babel({
            presets: ['es2015']
        }),
        uglify(),
        rename('enhanced.js'),
        gulp.dest('dist')
    ], callback);
});