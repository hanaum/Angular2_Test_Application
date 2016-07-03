'use strict';

const gulp = require('gulp');
const path = require('path');

const srcsToFmt = ['src/**/*.ts'];

gulp.task('clean', function() {
  const del = require('del');
  return del('dist/**/*');
});

gulp.task('format:enforce', () => {
  const format = require('gulp-clang-format');
  const clangFormat = require('clang-format');
  return gulp.src(srcsToFmt).pipe(
      format.checkFormat('file', clangFormat, {verbose: true, fail: true}));
});

gulp.task('format', () => {
  const format = require('gulp-clang-format');
  const clangFormat = require('clang-format');
  return gulp.src(srcsToFmt, {base: '.'})
      .pipe(format.format('file', clangFormat))
      .pipe(gulp.dest('.'));
});

gulp.task('lint', ['format:enforce'], () => {
  const tslint = require('gulp-tslint');
  const tslintConfig = require('./tslint.json');
  return gulp.src(srcsToFmt)
      .pipe(tslint({tslint: require('tslint').default, configuration: tslintConfig}))
      .pipe(tslint.report('prose', {emitError: true}));
});

gulp.task('compile-dev', ['clean'], function() {
  const webpack = require('webpack-stream');
  return gulp.src([]).pipe(webpack(require('./config/webpack.dev.js'))).pipe(gulp.dest('dist/'));
});

gulp.task('compile-prod', ['lint', 'clean'], function() {
  const webpack = require('webpack-stream');
  return gulp.src([]).pipe(webpack(require('./config/webpack.prod.js'))).pipe(gulp.dest('dist/'));
});

gulp.task('test', function(done) {
  var Server = require('karma').Server;
  new Server({configFile: __dirname + '/karma.conf.js', singleRun: true}, done).start();
});