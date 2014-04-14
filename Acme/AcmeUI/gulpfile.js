var args = require('yargs').argv;
var browserify = require('browserify');
var clean = require('gulp-clean');
var glob = require('glob');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var hbsfy = require('hbsfy').configure({extensions: ['html']});
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var paths = {
  main: {
    app: './src/main/js/app.js',
    js: './src/main/js/**/*.js',
    resources: './src/main/resources/**/*.*'
  },
  test: {
    js: './src/test/js/**/*.js',
    jsnode: './src/test/jsnode/**/*.js',
    resources: './src/test/resources/**/*.*'
  },
  target: './target'
};

// gulp {task} --Env production
var isProduction = args.Env === 'production';

gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', paths.main.js, paths.test.js])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
  return gulp.src(paths.test.jsnode, {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      // globals: {
      //   should: require('should')
      // }
    })) // nyan, markdown
    .on('error', function (err) {
      gutil.log(err.toString());
      this.emit('end');
    });
});

gulp.task('build', function () {
  var b = browserify();
  b.add(paths.main.app)
    .transform(hbsfy)
    .bundle({debug: ! isProduction})
    .pipe(source('app.js'))
    .pipe(streamify(gulpif(isProduction, uglify())))
    .pipe(gulp.dest(paths.target))
    .on('error', function (err) {
      gutil.log(err.toString());
      this.emit('end');
    });
});

gulp.task('bundle-test', function () {
  var b = browserify();
  glob.sync(paths.main.js).forEach(function (file) {
    b.external(file);
  });
  glob.sync(paths.test.js).forEach(function (file) {
    b.add(file);
  });
  b.bundle()
    .pipe(source('tests.js'))
    .pipe(gulp.dest(paths.target));
});

gulp.task('bundle-core', function () {
  var b = browserify();
  glob.sync(paths.main.js).forEach(function (file) {
    b.add(file);
    b.require(file, {expose: '.'});
  });
  b.transform(hbsfy)
    .bundle()
    .pipe(source('core.js'))
    .pipe(gulp.dest(paths.target));
});

gulp.task('resources', function () {
  return gulp.src([paths.main.resources, paths.test.resources])
    .pipe(gulp.dest(paths.target));
});

gulp.task('clean', function () {
  return gulp.src(paths.target, {read: false})
    .pipe(clean());
});

gulp.task('test-build', ['bundle-core', 'bundle-test']);

gulp.task('build-all', ['resources', 'lint', 'test', 'test-build', 'build']);
gulp.task('watch-build', ['build-all'], function () {
  gulp.watch(
    ['.jshintrc', 'gulpfile.js', paths.main.js, paths.test.js],
    ['build-all']);
});

gulp.task('default', ['build-all'], function () {
  gutil.log('default task');
});
