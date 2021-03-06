"use strict";

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const swPrecache = require('sw-precache');
const uglifyify = require('gulp-uglifyjs');
const stripDebug = require('gulp-strip-debug');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        // .pipe(uglifyify())
        // .pipe(stripDebug())
        .pipe(gulp.dest("build"));
});




/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            'mathjax/**',
            '@angular/**/bundles/**',
            'angularfire2/**/*',
            'firebase/**',
            'angular2-google-maps/**/*'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

gulp.task("dependencies", () => {
    return gulp.src([
            '/dependencies/*.*',
        ], {cwd: "src/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/dependencies"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});


gulp.task('generate-service-worker', function (callback) {
    swPrecache.write('build/my-service-worker.js', {
        staticFileGlobs: ['src/index.html','src/systemjs.config.js','src/app/**/*','src/dependencies/*.js'],
        stripPrefix: 'src'
    }, callback);
});


/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources', 'libs','dependencies', 'generate-service-worker'], () => {
    console.log("Building the project ...");
});