const gulp = require('gulp');
const watch = require('gulp-watch');
const clean = require('gulp-clean-dest');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const imageMin = require('gulp-imagemin');

gulp.task('clean',()=>{
  gulp.src('./dist/**/*')
      .pipe(clean('./dist'))
});

gulp.task('server',()=>{
  connect.server({
    root:'./dist',
    livereload:true
  });
});

gulp.task('index',()=>{
  gulp.src('./src/index.html')
      .pipe(watch('./src/index.html'))
      .pipe(gulp.dest('./dist'))
      .pipe(connect.reload());
});

gulp.task('toCss',()=>{
  gulp.src('./src/styles/**/*.scss')
      .pipe(watch('./src/styles/**/*.scss'))
      .pipe(sass())
      .pipe(minifyCss())
      .pipe(gulp.dest('./dist/styles'))
      .pipe(connect.reload());
});

gulp.task('toBabel',()=>{
  gulp.src('./src/scripts/**/*.js')
      .pipe(watch('./src/scripts/**/*.js'))
      .pipe(babel({
        presets:['es2015']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/scripts'))
      .pipe(connect.reload());
});

gulp.task('imgSource',()=>{
  gulp.src('./src/imgs/**/*')
      .pipe(watch('./src/imgs/**/*'))
      .pipe(imageMin())
      .pipe(gulp.dest('./dist/imgs'));
});

gulp.task('watch',['index','toCss','toBabel','imgSource']);

gulp.task('default',['server','watch']);