const gulp = require('gulp');
const watch = require('gulp-watch');
const clean = require('gulp-clean-dest');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('clean',()=>{
  gulp.src('./dist/**/*')
      .pipe(clean('./dist'))
});

gulp.task(server,()=>{
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
      .pipe(gulp.dest('./dist/css'))
      .pipe(connect.reload());
});

gulp.task('toBabel',()=>{
  glup.src('./src/scripts/**/*.js')
      .pipe(watch('./src/scripts/**/*.js'))
      .pipe(babel({
        preset:'2015'
      }))
      .pipe(gulp.dest('./dest/js'))
      .pipe(connect.reload());
});

gulp.task('imgSource',()=>{
  glup.src('./src/imgs/**/*')
      .pipe(wathc('./src/imgs/**/*'))
      .pipe(gulp.dest('./dist/imgs'));
});

gulp.task('watch',['index','toCss','toBabel','imgSource']);