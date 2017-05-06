const gulp = require('gulp');
const clean = require('gulp-clean-dest');
const connect = require('gulp-connect');

gulp.task('clean',()=>{
  gulp.src('./dist/**/*')
      .pipe(clean('./dist'))
});