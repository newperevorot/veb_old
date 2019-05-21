var gulp = require('gulp');
var sass = require('gulp-sass'); //Подключаем Sass пакет
var browserSync = require('browser-sync');

//Тестовый такс
gulp.task('mytask', function(){
	console.log('Привет, я таск!');
})


gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass') //Берем источник
		.pipe(sass()) //Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('app/css')) //Выгрузка результата в папку app/css
		.pipe(browserSync.reload({stream: true}))
})

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
})
