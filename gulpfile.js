const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pump = require('pump');
const babel = require('gulp-babel');
const include = require('gulp-include');
const insert = require('gulp-insert');
const replace = require('gulp-replace');

const packageJson = require('./package.json');

gulp.task('build', callback => {
    pump([
        gulp.src('src/core.js'),
        include(),
        babel({
            presets: ['es2015']
        }),
        replace('{{versionNumber}}', packageJson.version),
        uglify(),
        insert.prepend('/*! enhanced-js v'+packageJson.version+' | (c) Niklas Engblom | MIT License */\n'),
        rename('enhanced.js'),
        gulp.dest('dist')
    ], callback);
});