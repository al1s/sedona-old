/*
Based on the Gulpfile.js for this tutorial:
Using Gulp, SASS and Browser-Sync for your front end web development - DESIGNfromWITHIN
http://designfromwithin.com/blog/gulp-sass-browser-sync-front-end-dev

Steps:

1. Install gulp globally:
npm install --global gulp

2. Place this file into project forlder.

3. Run:
npm init
to create package.js. It will contain all required modules from gulpfile.json.

.... PROFIT?

4. Setup your vhosts or just use static server (see 'Prepare Browser-sync for localhost' below)

5. Type 'Gulp' and ster developing
*/

/* Needed gulp config */
const gulp = require('gulp');  
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const neat = require('node-neat');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps');
const reload = browserSync.reload;
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

/* Setup scss path */
var paths = {
  scss: ['./sass/*.scss', './sass/*.css']
};

/* Scripts task */
gulp.task('scripts', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    './js/*.js',
    './js/app.js',
    '!./js/main.js',
    '!./js/*.min.js'
    ])
    .pipe(jshint())
  //.pipe(jshint.reporter('default'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

/* Sass task */
gulp.task('sass', function () {  
    gulp.src(['./stylesheets/scss/style.scss', './stylesheets/scss/*.css'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: ['scss'].concat(neat)
    }))
    .pipe(postcss([                                         // делаем постпроцессинг
        autoprefixer({ browsers: ['last 2 version', '> 5%'] }),     // автопрефиксирование
        mqpacker({ sort: true }),                           // объединение медиавыражений
     ]))   
    .pipe(sourcemaps.write('../stylesheets/maps'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    /* Reload the browser CSS after every change */
    .pipe(reload({stream:true}));
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['./css/*.css', './js/*.js'], {
        /*
        I like to use a vhost, WAMP guide: https://www.kristengrote.com/blog/articles/how-to-set-up-virtual-hosts-using-wamp, XAMP guide: http://sawmac.com/xampp/virtualhosts/
        */
      /*proxy: 'your_dev_site.url'*/
        /* For a static server you would use this: */
        
        server: {
            baseDir: './'
        }
        
    });
});

/* Extract js from HTML and lint it */
gulp.task('lintHTML', function() {
  return gulp.src('./*.html')
    // if flag is not defined default value is 'auto'
    // .pipe(jshint.extract('auto|always|never'))
    .pipe(jshint.extract('auto'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    .pipe(jshint.reporter('fail'));
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'browser-sync'], function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['./stylesheets/scss/*.scss', './stylesheets/scss/**/*.scss'], ['sass'])
    /* Watch app.js file, run the scripts task on change. */
    gulp.watch(['./js/*.js'], ['scripts'])
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['./*.html'], ['bs-reload']);
});
