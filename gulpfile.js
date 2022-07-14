const { watch, series, src, dest } = require("gulp");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
var log = require("fancy-log");
const chalk = require("chalk");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

/*
Development Functions
---------------------------------------------------
*/

// Task for compiling our CSS files using PostCSS
function cssTask(cb) {
    return src("./src/src_assets/css/*.css").pipe(postcss()).pipe(dest("./src/assets/css")).pipe(browserSync.stream());
    cb();
}

// Task for compiling JS files
function jsTask(cb) {
    return src("./src/src_assets/js/*.js")
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(dest("./src/assets/js"))
        .pipe(browserSync.stream());
    cb();
}

// Task for dev images
function devImagesTask(cb) {
    return src("./src/src_assets/images/*").pipe(imagemin()).pipe(dest("./src/assets/images"));
    cb();
}

function browsersyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: "./src/",
        },
        open: false,
    });
    cb();
}

function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Files & Reload browser after tasks
function watchTask() {
    watch("./src/**/*.html", browsersyncReload);
    watch(["./src/src_assets/css/*.css", "./tailwind.config.js"], series(cssTask, browsersyncReload));
    watch(["./src/src_assets/js/*.js"], series(jsTask, browsersyncReload));
    watch(["./src/src_assets/images/**/*"], series(devImagesTask, browsersyncReload));
}

/*
Build Functions
---------------------------------------------------
*/
// First we remove all files from "dist" folder
function cleanDist(cb) {
    return del(["dist/**/*"]);
    cb();
}

// Build CSS for production
function cssClean(cb) {
    return src("./src/src_assets/css/*.css")
        .pipe(postcss())
        .pipe(cleanCSS())
        .on("end", function () {
            log(chalk.green("CSS files postCSS and cleaned"));
        })
        .pipe(dest("./dist/assets/css"))
        .on("end", function () {
            log(chalk.green("CSS files moved to " + chalk.bold("./dist/assets/css") + " folder"));
        });

    cb();
}

// Task for compiling JS files
function jsBuild(cb) {
    return src("./src/src_assets/js/*.js")
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(uglify())
        .pipe(dest("./dist/assets/js"))
        .on("end", function () {
            log(chalk.green("JS files proccesed with babel, uglify and moved to " + chalk.bold("./dist/assets/js") + " folder"));
        });
    cb();
}

// Task for minifying images
function imageminTask(cb) {
    return src("./src/src_assets/images/*")
        .pipe(imagemin())
        .pipe(dest("./dist/assets/images"))
        .on("end", function () {
            log(chalk.green("Images proccesed with imagemin and moved to " + chalk.bold("./dist/assets/images") + " folder"));
        });
    cb();
}

// Move HTML
function moveFiles(cb) {
    return src(["./src/**/*.html", "./src/favicon.ico", "./src/icon.png", "./src/site.webmanifest"])
        .pipe(dest("./dist"))
        .on("end", function () {
            log(chalk.green("HTML and others files moved to " + chalk.bold("./dist") + " folder"));
        });
    cb();
}

// Default Gulp Task
exports.default = series(cssTask, jsTask, devImagesTask, browsersyncServe, watchTask);
exports.build = series(cleanDist, cssClean, jsBuild, imageminTask, moveFiles);
exports.images = imageminTask;
