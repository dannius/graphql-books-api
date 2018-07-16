let gulp = require('gulp');
let ts = require("gulp-typescript")
let nodemon = require("gulp-nodemon");

gulp.task("watch", () => {
  gulp.watch('src/**/*.ts', ["compile"]);
});

gulp.task("compile", () => {
  return gulp.src(['src/**/*.ts'])
    .pipe(ts({ module: 'commonjs' })).js
    .pipe(gulp.dest('dist'))
})

gulp.task("serve", ["compile", "watch"], () => {
  nodemon({
    script: "dist/index.js",
    env: { "NODE_ENV": "development" }
  })
})