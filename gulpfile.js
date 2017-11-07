var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');	

var appSrc = 'development/',
    tsSrc = 'process/';

gulp.task('html', function() {
  gulp.src(appSrc + '**/*.html');
});

gulp.task('css', function() {
  gulp.src(appSrc + '**/*.css');
});

gulp.task('sass', function(){
  return gulp.src('process/scss/**/*.scss')
  .pipe(sass().on('error',sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest(appSrc + '/css'));
});

gulp.task('watch', function() {
  gulp.watch(appSrc + 'css/*.css', ['css']);
  gulp.watch(appSrc + '**/*.html', ['html']);
  gulp.watch('process/scss/**/*.scss',['sass']);
});

gulp.task('webserver', function() {
  gulp.src(appSrc)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['sass','watch', 'webserver']);
