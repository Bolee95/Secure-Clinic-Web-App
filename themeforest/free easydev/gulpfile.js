const gulp = require('gulp'),
  runSequence = require('run-sequence'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  cssnano = require('gulp-cssnano'),
  plumber = require('gulp-plumber'),
  minifyjs = require('gulp-js-minify'),
  imagemin = require('gulp-imagemin');

// SASS
gulp.task('style', function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(plumber({errorHandler: notify.onError("Style Build Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .on('error', onError)
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('style-build', function () {
  return gulp.src('./src/scss/main.scss')
    .pipe(plumber({errorHandler: notify.onError("Style Build Error: <%= error.message %>")}))
    .pipe(sass())
    .on('error', onError)
    .pipe(autoprefixer('last 4 version'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/assets/css'));
});

// Pug
gulp.task('pug', function () {
  return gulp.src('./src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
});

// JS
gulp.task('minify-js', function () {
  gulp.src('./src/js/*.js')
    .pipe(minifyjs())
    .pipe(gulp.dest('./dist/assets/js/'));
});

// Images
gulp.task('minify-imgs', function () {
  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img/'))
});

// Build for prod
gulp.task('build', function (callback) {
  runSequence(['style-build'], callback);
});

// Watcher
gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', function () {
    runSequence('style', ['notify']);
  });
  gulp.watch('./src/pug/**/*.pug', function () {
    runSequence('pug', ['notify'])
  });
});

// Default
gulp.task('default', function () {
  runSequence(['style', 'watch']);
  runSequence(['pug', 'watch']);
  runSequence(['minify-js']);
  runSequence(['minify-imgs']);
});

///////////////////////////////////////////////////////////
// Helpers
function onError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('notify', function () {
  return gulp.src('')
    .pipe(notify({message: 'DRAKARYS!!!', onLast: true}));
});
