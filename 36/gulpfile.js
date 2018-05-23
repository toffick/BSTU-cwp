const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const path = require('path');

const webpackConfig = require('./webpack.config');

gulp.task(
	'development',
	['compile', 'watch'],
	() => {
		gulp.start('browser-sync')
	}
);

gulp.task('browser-sync', () => {
	browserSync.init({
		server: './public',
		open: 'local'
	});
});

gulp.task('watch', () => {
	gulp.watch(path.resolve('./source/**/*.*'), ['build']);
});

gulp.task('build', ['compile'], () => {
	browserSync.reload();
});

gulp.task('compile', () =>
	gulp
		.src('source/index.jsx')
		.pipe(webpackStream(webpackConfig, require("webpack")))
		.pipe(gulp.dest('./public'))
);

