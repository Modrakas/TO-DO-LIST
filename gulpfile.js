const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss')

function styleBuilder() {
  return src('sass/**/*.scss')
    .pipe(sass())
    .pipe(purgecss({content: ['*.html']}))
    .pipe(dest('css'))
}

function changes() {
  watch(['sass/**/*.scss', '*.html'], styleBuilder)
}

exports.default = series(styleBuilder, changes)