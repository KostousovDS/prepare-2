Создание шаблона Gulp для работы проекта на Bootstrap 4
1. Устанавливаем на компьютере программу PphpStorm.
2. Устанавливаем на компьютере программу Node.js.
3. Создаем на жестком диске папку для проекта и открываем ее в программе PhpStorm (далее - Программа).
4. В корневой папке проекта создадим минимальнодостаточную структуру, сотоящую из вложенных папок, для проекта:
	папка проекта --> папка SRC --> папка fonts
		      --> файл gulpfile.js
		      --> файл readme.md
				    --> папка images
				    --> папка js	--> файл index.js
				    --> папка styles	--> файл style.scss
				    --> папка template	--> файл header.html
							--> файл section.html
				    --> файл index.html

					
5. Инициализируем менеджер пакетов JavaScript - Npm. В терминале Программы запустим команду: npm init. По результатом срабатывания команды в корневой папке проекта сформируется файл: package.json. В данном файле содердится основная информация о проете. Далее этот файл будет дополняться.
6. В связи с тем, что в последствие данный проект станет отслеживаться приложением Git и переместится на GitHub, создадим в корневой папке проекта файл: ".gitignore" и поместим в него три имя трех папок ".idea/", "node_modules/", "build/", которые не должны обрабатываться приложением Git.
7. Установим глобально набор инструментов Gulp, который помогает автоматизировать трудоемкие задачи в процессе разработки. В терминале Программы выполним команду: npm install gulp -g --save.
8. Установим Gulp в наш проект. В терминале Программы выполним команду: npm install gulp --save-dev.
9. Установим следующий минимальный набор библиотек, обеспечивающих сборку проекта:
	- Gulp-sass, Node-sass - компилирует SASS в CSS. Команда: npm install gulp-sass node-sass --save-dev;
	- Gulp-rigger - позволяет подключать файлы друг к другу. Команда: npm install gulp-rigger --save-dev;
	- Gulp-watch - наблюдает за изменениями в файлах. Команда: npm install gulp-watch --save-dev;
	- Gulp-copy - копирует необходимые файлы в папки сборки проекта. Команда: npm install gulp-copy --save-dev;
	- Gulp-connect - инициирует запуска веб-сервера для проекта. Команда: npm install gulp-connect --save-dev;
10. Установим следующий минимальный набор библиотек, обеспечивающих работу проекта:
	- Bootstrap версия 4.3.1. Команда: npm install bootstrap@4.3.1 --save;
	- Jquery версия 3.3.1. Команда: npm install jquery@3.3.1 --save;
	- Popper.js версия 1.14.7. Команда: npm install popper.js@1.14.7 --save;
11. Заполним файл gulpfile.js

'use strict' // означает что весь проект работает в "современном" режиме.

var gulp = require('gulp'); // определим переменную gulp
var sass = require('gulp-sass'); // определим переменную sass
var rigger = require('gulp-rigger'); // определим переменную rigger
var watch = require('gulp-watch'); // определим переменную watch
var copy = require('gulp-copy'); // определим переменную copy
var connect = require('gulp-connect'); //определим переменную connect

sass.compiler = require('node-sass'); // определим переменную sass.compiler

// напишем команды для заданных переменных.
gulp.task('sass', function () {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./build/styles/'))
        .pipe(connect.reload());

});

gulp.task('watch', function () {
    watch('./src/styles/**/*.scss', gulp.series('sass'));
    watch(['./src/template/*.html', './src/index.html'], gulp.series('rigger'));
    watch('./src/js/**/*.js', gulp.series('js'));

});

gulp.task('rigger', function () {
    return gulp.src('./src/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    return gulp.src('./src/js/index.js')
        .pipe(rigger())
        .pipe(gulp.dest('./build/js/'))
        .pipe(connect.reload());
});

gulp.task('copy', function () {
    gulp.src('./src/images/**.*')
        .pipe(gulp.dest('./build/images/'))
});

gulp.task('copy', function () {
    gulp.src('./src/fonts/**.*')
        .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true,
        port: 9000
    });
});

gulp.task('default', gulp.parallel('watch', 'connect', 'rigger', 'copy', 'sass', 'js'));

12. Заполним файл index.js

// подключим файлы с библиотеками в файл index.js

//= "../../node_modules/jquery/dist/jquery.min.js"
//= "../../node_modules/popper.js/dist/popper.min.js"
//= "../../node_modules/bootstrap/dist/js/bootstrap.min.js"

13. Создадим разметку в файле index.html

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

</body>
</html>

14. Импортируем в файл style.scss стили bootstrap 4

@import "../../node_modules/bootstrap/scss/bootstrap";

15. Подключим файл style.scss в файл index.html

<head>
<link rel="stylesheet" href="./styles/style.css">
</head>

16. Подключим файл section.html в файл index.html

<body>
//= "./template/section.html"
</body>

17. Подключим файл index.js в файл index.html

<body>
<script src="js/index.js"></script>
</body>

После всех проделанных действий в файле index.html разметка должна получить следующий вид:

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./styles/style.css">
</head>
<body>

//= "./template/section.html"

<script src="js/index.js"></script>
</body>
</html>

18. В терминале Программы запустим команду: gulp. Она должна запустить все команды, определенные в файле gulpfile.js

19. Запустим команду git init

20. Коммитим проект.
