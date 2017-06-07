var gulp = require('gulp');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');

var onError = function (err) {
    console.log(err);
    this.emit('end');
};

gulp.task('compass', function() {
    return gulp.src('src/compass/icons.sass')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(compass({
            sass: 'src/compass',
            css: 'src/assets/css',
            image: 'src/assets/images'
        }))
        .pipe(gulp.dest('src/assets/css'))
});

gulp.task('default', ['compass']);