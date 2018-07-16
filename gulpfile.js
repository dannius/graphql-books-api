let gulp = require('gulp');
let ts = require("gulp-typescript")
let nodemon = require("gulp-nodemon");

var tsConfig = ts.createProject('./tsconfig.json');

gulp.task("watch", () => {
  gulp.watch('./src/**/*.ts', ["compile"]);
});

gulp.task("compile", () => {
  return gulp.src(['src/**/*.ts'])
    .pipe(tsConfig())
    .pipe(gulp.dest('dist'))
})

gulp.task("serve", ["compile", "watch"], () => {
  nodemon({
    script: "dist/index.js",
    watch: "dist/",
    env: { "NODE_ENV": "development" }
  })
})
