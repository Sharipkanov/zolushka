var gulp = require('gulp');
var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var fs = require('fs');
var merge = require('gulp-merge-json')

var onError = function (err) {
    console.log(err);
    this.emit('end');
};

var src = {
    l18n: 'src/assets/i18n/',
    locale: 'src/locale/',
    localeWatch: 'src/locale/**'
};

gulp.task('compass', function () {
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

gulp.task('locale', function () {
    /*gulp.src(src.localeWatch)
     .pipe(merge({
     fileName:
     }));*/

    var dirs = fs.readdirSync(src.locale);

    for (var i = 0; i < dirs.length; i++) {
        gulp.src(src.locale + dirs[i] + '/**')
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(merge({
                fileName: dirs[i] + '.json'
            }))
            .pipe(gulp.dest(src.l18n));
    }
});

gulp.task('watch', function () {
    gulp.watch('src/compass/icons.sass', ['compass']);
    gulp.watch(src.localeWatch, ['locale']);
});

gulp.task('default', ['compass', 'watch', 'locale']);