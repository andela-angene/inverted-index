const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

const testSource = './test/spec/invertedIndexSpec.js';

gulp.task('browserify', () => {
  const bundleStream = browserify(testSource).bundle();
  bundleStream
    .pipe(source('generatedSpec.js'))
    .pipe(gulp.dest('./test'));
});

gulp.task('watch', () => {
  gulp.watch(testSource, ['browserify']);
});

gulp.task('default', ['browserify', 'watch']);
