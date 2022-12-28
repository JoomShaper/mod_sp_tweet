let gulp = require('gulp');
let zip = require('gulp-zip');
let clean = require('gulp-clean');
let cleanCSS = require('gulp-clean-css');

let version = "mod_sp_tweet_v3.0.0.zip";

gulp.task('copy_module_sp_tweet', () => gulp.src('./modules/mod_sp_tweet/**/*.*').pipe(gulp.dest('build/mod_sp_tweet')));

gulp.task('copy_lang_module_sp_tweet', () => gulp.src('./language/en-GB/en-GB.mod_sp_tweet.ini').pipe(gulp.dest('build/mod_sp_tweet/')));

gulp.task("copy", gulp.series("copy_module_sp_tweet","copy_lang_module_sp_tweet"));

gulp.task("minify_mod_css", () => gulp.src("build/mod_sp_tweet/assets/css/*.css").pipe(cleanCSS()).pipe(gulp.dest("build/mod_sp_tweet/assets/css/")));

gulp.task( "minify", gulp.series( "minify_mod_css"));

gulp.task("zip_it", () => gulp.src("./build/**/*.*").pipe(zip(version)).pipe(gulp.dest("./")));

gulp.task("clean_build", () => gulp.src("./build", { read: false, allowEmpty: true }).pipe(clean()));

gulp.task("clean_zip", () => gulp.src("./"+version, { read: false, allowEmpty: true }).pipe(clean()));

gulp.task("default", gulp.series("clean_zip", "clean_build", "copy", "minify", "zip_it", () => gulp.src("./build/**/*.*").pipe(zip(version)).pipe(gulp.dest("./"))));

