var gulp = require('gulp'), 
    //compass = require('gulp-compass');
    spritesmith=require('gulp.spritesmith');
     var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var replace = require('gulp-replace');
   // ejs = require('gulp-ejs');
   // babel = require('gulp-babel');
    //browserSync = require('browser-sync');
    var concat = require('gulp-concat');
    //gulp.task('concat', function() {                                //- 创建一个名为 concat 的 task
   // gulp.src(['./src/css/*.css'])    //- 需要处理的css文件，放到一个字符串数组里
     //   .pipe(concat('zj.css'))                            //- 合并后的文件名
        //.pipe(minifyCss())                                      //- 压缩处理成一行
        //.pipe(rev())                                            //- 文件名加MD5后缀
      //  .pipe(gulp.dest('./xm/css'))                               //- 输出文件本地
      //  .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
      //  .pipe(gulp.dest('./rev'));  
     /* gulp.task('sprite',function(){  
         gulp.src('./src/images/*.png')  
         .pipe(spritesmith({  
            retinaSrcFilter:['./src/images/*@2x.png'],
            imgName:'sprite.png', 
            retinaImgName:'sprite@2x.png',  
            cssName:'css/sprite.css',  
            padding:5,  
            algorithm:'binary-tree'  
        }))  
         .pipe(gulp.dest('dist/'))  */
         gulp.task('sprite',function(){  
	         gulp.src('./src/images/*.png')  
	         .pipe(spritesmith({  
	            //retinaSrcFilter:['./src/images/*@2x.png'],
	            imgName:'navigationIcon.png', 
	            //retinaImgName:'sprite@2x.png',  
	            cssName:'navigationIcon.css',  
	            padding:5,  
	            algorithm:'binary-tree'  
	        }))  
	         .pipe(gulp.dest('static/files/product_common/'))

		});                           //- 将 rev-manifest.json 保存到 rev 目录内

        gulp.task('spritecss', function() {
        	var spriteData = gulp.src('./src/images/*.png')
        						.pipe(spritesmith({
        							imgName:'navigationIcon.png',
        							cssName:'navigationIcon.css',
        							padding: 2, 
        						}))
        						//.pipe(gulp.dest('./'));
        	/* spriteData.img.pipe(gulp.dest("static/files/product_common/")); // output path for the sprite
    		 spriteData.css
    		 //.pipe(replace(/^\.icon-/gm, '.fa-'))
    		 .pipe(gulp.dest("./")); // output path for the CSS*/

    		  var imgStream = spriteData.img
			    // DEV: We must buffer our stream into a Buffer for `imagemin`
			    .pipe(buffer())
			    .pipe(imagemin())
			    .pipe(gulp.dest('static/files/product_common/'));

			  // Pipe CSS stream through CSS optimizer and onto disk
			  var cssStream = spriteData.css
			  	.pipe(replace(/^\.icon-/gm, '.fa-'))
			  	.pipe(replace(/_/g, '-'))
			  	.pipe(replace(/navigationIcon.png/g,'/static/files/product_common/navigationIcon.png'))
			    //.pipe(csso())
			    .pipe(gulp.dest('static/files/product_common/'));

			  // Return a merged stream to handle both `end` events
			  return merge(imgStream, cssStream);
        });



      
// gulp.task('compass', function () {
//     gulp.src('lib/scss/*.scss') //该任务针对的文件
//         .pipe(compass({
// 	        css: 'static/css',
// 	        sass: 'lib/scss'
//         })) //该任务调用的模块
//         .pipe(gulp.dest('static/css')); //将会在src/css下生成index.css
// });
// gulp.task('ejs', function () {
//     gulp.src('lib/ejs/*.ejs') //该任务针对的文件
//         .pipe(ejs({msg:'Hello Gulp!'},{ext: '.html'})) //该任务调用的模块
//         .pipe(gulp.dest('static/')); //将会在src/css下生成index.css
// });
// gulp.task('babel', function () {
//     gulp.src('lib/babel/*.js') //该任务针对的文件
//         .pipe(babel({presets:['es2015']})) //该任务调用的模块
//         .pipe(gulp.dest('static/js')); //将会在src/css下生成index.css
// });
// gulp.task('browserSync', function () {
//      var files = [
//     '**/*.html',
//     '**/*.css',
//     '**/*.js'
//     ];
//     browserSync.init(files,{
//         server: {
//             baseDir: "./static/"
//         }
//     });
// });

gulp.task('default',function(){
    // gulp.run("compass");
   // gulp.run("ejs");
   // gulp.run("babel");
   gulp.run("spritecss");
    // gulp.watch(["./lib/**"],function(event){
    //     // gulp.run("compass");
    //     gulp.run("ejs");
    //    gulp.run("babel");
    //})
}); //定义默认任务