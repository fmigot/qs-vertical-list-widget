
const avro = require('avsc');
const fs = require('fs');
const fsExtra = require("fs-extra");
const gulp = require('gulp');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');

const babel = require('gulp-babel');
var clean = require('gulp-clean');
const rename = require('gulp-rename');
const transform = require('gulp-transform');

function avscIdl(content) {
    return new Promise((resolve, reject) => {
        try {
            var protocol = avro.readProtocol(content);
            resolve(JSON.stringify(protocol, null, 2));
        } catch (e) {
            reject(e);
        }
    });
}

function mergeTasksYml(tasksYml, conf) {
    return function (protocol) {
        return new Promise((resolve, reject) => {
            try {
                var doc = yaml.safeLoad(fs.readFileSync(tasksYml, 'utf8'));
                doc['avroProtocol'] = protocol;

                resolve(yaml.safeDump(doc));
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = {

  buildModule: (name) => {

    const moduleDir = 'src';
    const moduleDistDir = 'dist';
    const moduleScope = {

      buildComponent: () => {

        gulp
          .src(path.join(moduleDir, '**/*.js'))
          .pipe(babel({
              presets: [ 'es2015', 'react', 'stage-0' ],
              plugins: [ 'transform-react-jsx' ]
          }))
          .pipe(gulp.dest(moduleDistDir));

        gulp
          .src(path.join(moduleDir, '**/*.scss'))
          .pipe(gulp.dest(moduleDistDir));

        gulp
          .src(path.join(moduleDir, '**/*.css'))
          .pipe(gulp.dest(moduleDistDir));

        return moduleScope;
      },

      buildAvscIdl: () => {

        const src = path.join(moduleDir, 'protocol.avdl');

        if (!fs.existsSync(src)) {
          return moduleScope;
        }
        gulp
          .src(src)
          .pipe(transform('utf8', avscIdl))
          .pipe(rename({ extname: '.avsc' }))
          .pipe(gulp.dest(moduleDistDir));

        return moduleScope;
      },

      buildCksrTaskYaml: (conf) => {

        const src = path.join(moduleDir, 'protocol.avdl');
        const tasks = path.join(moduleDir,'tasks.yml');

        if (!fs.existsSync(src) || !fs.existsSync(tasks)) {
          return moduleScope;
        }
        gulp
          .src(src)
          .pipe(transform('utf8', avscIdl))
          .pipe(transform('utf8', mergeTasksYml(tasks, conf) ))
          .pipe(rename('tasks.yml'))
          .pipe(gulp.dest(moduleDistDir))
          .pipe(rename(name + '-tasks.yml'))
          .pipe(gulp.dest(os.homedir() + '/.cksr/'));

        return moduleScope;
      },

      clean: () => {

        gulp
          .src(path.join(moduleDir, 'dist'), { read: false })
          .pipe(clean());

        return moduleScope;
      }
    };

    return moduleScope;
  }
};
