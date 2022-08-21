/* eslint-disable no-console */
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const autoprefixer = require('autoprefixer');
const fileinclude = require('gulp-file-include');
const svgmin = require('gulp-svgmin');
const path = require('path');
const svgstore = require('gulp-svgstore');
const browserSync = require('browser-sync').create();
const tinypng = require('gulp-tinypng-extended');
const parcel = require('gulp-parcel');
const fs = require('fs');

const paths = {
    src: './src',
    dist: './dist'
};

const { src, dest, series, watch, lastRun } = require('gulp');

/**
 * Workaround for browsersyncReload fires only once
 */
const reload = (done) => {
    browserSync.reload();
    done();
};

/**
 * Compiles js file to bundle
 */
const scripts = (done) => {
    src(`${paths.src}/js/*.js`, { since: lastRun(scripts), read: false, minify: true })
        .pipe(parcel({ outDir: `${paths.dist}/js`, publicURL: `/${paths.dist}/js` }))
        .pipe(dest(`${paths.dist}/js/`));
    done();
};

/**
 * Compiles SASS files to css bundle
 */
const css = (done) => {
    src(`${paths.src}/sass/style.scss`)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer(),
            ])
        )
        .pipe(
            purgecss({
                content: [`${paths.src}/**/*.html`],
                safelist: {
                    greedy: [/.*loaded.*/, /header*/, /.*typography.*/, /.*menu.*/, /.*table-responsive$/, /.*tns.*/, /.*modal.*/, /aside*/, /.*loading-dots.*/],
                },
            })
        )
        .pipe(dest(`${paths.dist}/css`))
        .pipe(browserSync.stream());
    done();
};

/**
 * Compiles SASS files to css modules
 */
const cssModules = (done) => {
    src(`${paths.src}/sass/modules/*.scss`)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer(),
            ])
        )
        .pipe(dest(`${paths.dist}/css/modules/`))
        .pipe(browserSync.stream());
    done();
};

/**
 * Runs dev server
 */
const server = (done) => {
    browserSync.init({
        server: {
            baseDir: './',
            routes: {
                '/components': 'components',
            },
        },
    });
    done();
};

/**
 * Compiles .html files
 */
const html = (done) => {
    src([`${paths.src}/**/*.html`, `!${paths.src}/components/**/*.html`])
    .pipe(fileinclude(), {
        prefix: '@@',
        basepath: '@file'
    })
    .pipe(dest('./'));
    done();
};

/**
 * Copies images from src to dist directory
 */
const copyContentImages = (done) => {
    src(`${paths.src}/images/**/*.*`).pipe(dest(`${paths.dist}/images`));
    done();
};
const copyCssImages = (done) => {
    src(`${paths.src}/images/*.+(png|jpg|jpeg|svg|webp)`).pipe(dest(`${paths.dist}/images`));
    done();
};

/**
 * Merges svg icons into one build file
 */
 const svg = (done) => {
    src(`${paths.src}/images/icons/*.svg`)
        .pipe(
            svgmin((file) => {
                const prefix = path.basename(file.relative, path.extname(file.relative));
                return {
                    plugins: [
                        {
                            removeAttrs: {
                                attrs: 'fill',
                            },
                            removeViewBox: false
                        },
                        'cleanupListOfValues',
                        {
                            cleanupIDs: {
                                prefix: `${prefix}-`,
                                minify: true,
                            },
                        }
                    ],
                };
            })
        )
        .pipe(svgstore())
        .pipe(dest(`${paths.dist}/images/icons/`));
    done();
};

/**
 * Minify SVG images
 */
const minifySVG = (done) => {
    src(`${paths.src}/images/content/*.svg`)
        .pipe(svgmin())
        .pipe(dest(`${paths.dist}/images/content/`));
    done();
};

/**
 * Minifies png/jpg images via tinypng
 */
const compressedImages = (done) => {
    src(`${paths.src}/images/content/*.+(png|jpg|jpeg)`)
        .pipe(
            tinypng({
                key: '1GDkQZCdt2Y36RFtYDgPZdjxkT2MBVQY',
                log: true,
                sigFile: `${paths.src}/images/.tinypng-sigs`,
            })
        )
        .pipe(dest(`${paths.dist}/images/content/`));
    done();
};

const syncImgFolder = (done) => {
    const pathSuffix = '/images/content/';
    let count = 0;
    // get images from src dir
    const srcFiles = fs.readdirSync(`${paths.src}${pathSuffix}`);
    // get images from dist dir
    const distFiles = fs.readdirSync(`${paths.dist}${pathSuffix}`);
    // compare files and delete unsuded in dist directory
    distFiles
        .filter((file) => !srcFiles.includes(file))
        .forEach((file) => {
            fs.unlink(`${paths.dist}${pathSuffix}${file}`, (err) => {
                if (err) throw err;
                console.log('\x1b[32m', `${file} deleted`);
                // count deleted files
                count += 1;
            });
        });
    console.log('\x1b[37m', `${count} files has been deleted`);
    done();
};

/**
 * Watches for changes in source files
 */
const watchdog = (done) => {
    watch(`${paths.src}/**/*.html`, series(html, reload));
    watch(`${paths.src}/sass/**/*.scss`, series(css, reload));
    watch(`${paths.src}/js/**/*.js`, series(scripts, reload));
    watch(`${paths.src}/images/content/*.+(png|jpg|jpeg)`, series(compressedImages, reload, syncImgFolder));
    watch(`${paths.src}/images/content/*.+(gif)`, series(copyContentImages, reload, syncImgFolder));
    watch(`${paths.src}/images/content/*.svg`, series(minifySVG, reload, syncImgFolder));
    watch(`${paths.src}/images/*.+(png|jpg|jpeg|svg|webp)`, series(copyCssImages, reload));
    watch(`${paths.src}/images/icons/*.svg`, series(svg, html, reload));
    done();
};

exports.scripts = scripts;
exports.css = css;
exports.cssModules = cssModules;
exports.html = html;
exports.imagesCompress = compressedImages;
exports.imagesCopy = copyContentImages;
exports.svg = svg;
exports.watch = series(watchdog, server);
