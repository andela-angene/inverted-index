const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

const htmlSource = './src/index.html';
const cssSource = './src/css/*.css';
const jsSource = './src/js/app.js';
const testSource = './test/spec/invertedIndexSpec.js';

gulp.task('connect', () => {
  connect.server({
    root: ['./src'],
    port: 1337,
    livereload: true,
  });
});

gulp.task('open', () => {
  gulp.src(__filename)
  .pipe(open({ uri: 'http://localhost:1337' }));
});

gulp.task('html', () => {
  gulp.src(htmlSource)
  .pipe(connect.reload());
});

gulp.task('css', () => {
  gulp.src(cssSource)
  .pipe(connect.reload());
});

gulp.task('js', () => {
  gulp.src(jsSource)
  .pipe(connect.reload());
});

gulp.task('browserify', () => {
  const bundleStream = browserify(testSource).bundle();
  bundleStream
    .pipe(source('generatedSpec.js'))
    .pipe(gulp.dest('./test'));
});

gulp.task('watchTest', () => {
  gulp.watch(testSource, ['browserify']);
});

gulp.task('watch', () => {
  gulp.watch(htmlSource, ['html']);
  gulp.watch(cssSource, ['css']);
  gulp.watch(jsSource, ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'open', 'connect', 'watch']);
