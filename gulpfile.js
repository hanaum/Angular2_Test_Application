'use strict';

const gulp = require('gulp');
const path = require('path');
const gutil = require('gulp-util');
const webpackStream = require('webpack-stream');
const webpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('./config/webpack.dev.js');
const webpackProdConfig = require('./config/webpack.prod.js');

const srcsToFmt = ['src/**/*.ts'];

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

gulp.task('watch-dev', ['compile-dev'], function() {
  gulp.watch(['src/**/*'], ['compile-dev']);
});

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
  return gulp.src([]).pipe(webpackStream(webpackDevConfig)).pipe(gulp.dest('dist/'));
});

gulp.task('compile-prod', ['lint', 'clean'], function() {
  return gulp.src([]).pipe(webpackStream(webpackProdConfig)).pipe(gulp.dest('dist/'));
});

gulp.task('test', function(done) {
  var Server = require('karma').Server;
  new Server({configFile: __dirname + '/karma.conf.js', singleRun: true}, done).start();
});

gulp.task('webpack-dev-server', function() {
  const webpack = require('webpack');
  var myConfig = Object.create(webpackDevConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  // Start a webpackStream-dev-server
  new webpackDevServer(webpack(myConfig), {
    publicPath: '/',
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if(err) throw new gutil.PluginError('webpackStream-dev-server', err);
    gutil.log('[webpackStream-dev-server]', 'http://localhost:8080/webpackStream-dev-server/index.html');
  });
});