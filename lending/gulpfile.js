var gulp        = require('gulp'),
	sass        = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglifyjs'),
	cssnano     = require('gulp-cssnano'),
	rename      = require('gulp-rename'),
	del         = require('del'),
	imagemin    = require('gulp-imagemin'),
	args        = require('yargs').argv,
	// pngquant    = require('imagemin-pngquant'),
	cache       = require('gulp-cache'),
	autoprefixer= require('gulp-autoprefixer'),
	csscomb 	= require('gulp-csscomb'),
	shell       = require('gulp-shell');

gulp.task('mytask', function(){
	console.log('Привет, я таск!');
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		//notify: false
		open: true
	});
})

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
})

gulp.task('css-libs', ['sass'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
})

// gulp.task('sass', function(){
// 	return gulp.src('app/sass/**/*.sass')
// 		.pipe(sass())
// 		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
// 		.pipe(gulp.dest('app/css'));
// 		//gulp.watch(browserSync.reload)
// })

gulp.task('sass', function() {
 	gulp.src('app/sass/**/*.sass')
      .pipe(sass({
          // outputStyle: 'compressed',
          outputStyle: 'expanded',
          includePaths: ['node_modules/susy/sass']
      }).on('error', sass.logError))
      .pipe(gulp.dest('app/css'));
});

gulp.task('scss', function() {
	gulp.src('app/sass/**/*.scss')
      .pipe(sass({
          // outputStyle: 'compressed',
          outputStyle: 'expanded',
          includePaths: ['node_modules/susy/sass']
      }).on('error', sass.logError))
      .pipe(gulp.dest('app/css'));
});

gulp.task('styles', function() {
  return gulp.src('app/css/main.css')
    .pipe(csscomb())
    .pipe(gulp.dest('app/css/new.css'));
});

gulp.task('clean', function(){
	return del.sync('dist');
})

gulp.task('clear', function(){
	return cashe.clearAll();
})

// gulp.task('img', function(){
// 	return gulp.src('app/img/**/*')
// 	.pipe(cache(imagemin({
// 		interlaced: true,
// 		progressive: true,
// 		svgoPlugins: [{removeViewBox: false}],
// 		use: [pngquant()]
// 	})))
// 	.pipe(gulp.dest('dist/img'));
// })

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/sass/**/*.scss', ['scss']);
	gulp.watch('app/css/*.css', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){
	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
})

gulp.task('open-sub', function(){
	return gulp.src('app/index.html')
	.pipe(shell([
		'sub ../test',
		'sub app/scss/main.scss',
		'sub app/index.html'
	]))
})


gulp.task('open-chrome', function(){
	return gulp.src('app/index.html')
	.pipe(shell([
		'start chrome app/index.html'
	]))
})

gulp.task("create-app", function(){
	var env = args.env || 'standart';

	gulp.src('*.*', {read: false})
	.pipe(gulp.dest('app'))
	.pipe(gulp.dest('app/css'))
	.pipe(gulp.dest('app/js'))
	.pipe(gulp.dest('app/fonts'))
	.pipe(gulp.dest('app/img'))
	.pipe(gulp.dest('app/sass'));

	if(env == 'standart'){
		gulp.src('src/html/index.html')
		.pipe(gulp.dest('app/'));
		gulp.src('src/scss/main.scss')
		.pipe(gulp.dest('app/sass/'));
	}

	if(env == 'setka'){
		gulp.src('src/html/setka.html')
		.pipe(rename('index.html'))
		.pipe(gulp.dest('app/'));
		gulp.src('src/scss/main.scss')
		.pipe(gulp.dest('app/sass/'));
	}

	setTimeout(start, 2000);

})

function start(){
	gulp.start('open-chrome');
	gulp.start('open-sub');
}

gulp.task("test", function(){
	var env = args.env || 'not';
	console.log(env);
})