const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');

const htmlSource = './src/index.html';
const cssSource = './src/css/*.css';
const jsSource = './src/js/app.js';

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

gulp.task('watch', () => {
  gulp.watch(htmlSource, ['html']);
  gulp.watch(cssSource, ['css']);
  gulp.watch(jsSource, ['js']);
});

gulp.task('default', ['html', 'css', 'js', 'open', 'connect', 'watch']);
