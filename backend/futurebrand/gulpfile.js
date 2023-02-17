'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const minifyCSS = require('gulp-minify-css');
const tailwind = require('tailwindcss');

const buildStyles = () => {
  return gulp
    .src('blocks/blocks.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([postcssImport, tailwind]))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'));
};

const buildStylesProduction = () => {
  return gulp
    .src('build/blocks.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/'));
};

const runBuildStylesProduction = gulp.series(
  buildStyles,
  buildStylesProduction
);

exports.build = gulp.series(runBuildStylesProduction);

exports.watch = () => {
  gulp.watch('blocks/**/*.css', buildStyles);
  gulp.watch('**/*.php', gulp.series(buildStyles));
};
