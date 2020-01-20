'use strict';
/************************************
 * Configure build directory structure
 ************************************/

const buildDir        = './dist';
// const confOutputDir   = './conf';
// const localeDir       = './locales';
// const staticAssetsDir = `${buildDir}/static`;
// const cssDir          = `${staticAssetsDir}/css`;
// const jsDir           = `${staticAssetsDir}/js`;
// const imgDir          = `${staticAssetsDir}/img`;
// const fontsDir        = `${staticAssetsDir}/fonts`;

// const bootstrapJsPublicPath = `/static/js/bootstrap.js`;
// const appJsPublicPath       = `/static/js/app.js`;
// const preloadsJsPublicPath  = `/static/js/preloads.js`;
// const appDepsJsPublicPath   = `/static/js/app-deps.js`;
const moduleName            = `./name.js`;

// const appServerPort        = 8220;
// const managementServerPort = 8221;

// Configuration to target a specific environment

// var useGcpMiddlewares = true;
// const gcpNamespace = 'default';
//
// var targetGcpCluster = true;
// var gcpEnvName = 'dev';
//
// var allowDefaultConfFallbackOnFetchConfFailure = false;

/************************************
 * Require Libs
 ************************************/

const exec             = require('child_process').execSync;
const fs               = require('fs');
const path             = require('path');
const argv             = require('yargs').argv;

const gulp             = require('gulp');
// const connect          = require('gulp-connect');
// const handlebars       = require('gulp-compile-handlebars');
const rename           = require("gulp-rename");
const rev              = require('gulp-rev');
const sass             = require('gulp-sass');
// const proxyMiddleware  = require('http-proxy-middleware');
// const sassJspm         = require('sass-jspm-importer');

const Builder          = require('systemjs-builder');
const babel            = require('gulp-babel');
// const KarmaServer      = require('karma').Server;

//const kubernetesConf   = require('./conf/kubernetes.js');
const localConf        = require('./local.js');
// const karmaConfig      = require('./test/karma.conf.js');
const moduleBuildTools = require('./qs-build-module/build-tools.js');
// const kubernetesUtil   = require('./src/server/util/kubernetes.js');

const readdirSync        = fs.readdirSync;

/************************************
 * Require pages/services
 ************************************/

// const realmIndexPage   = require('./src/server/app/realm/index.js');
// const healthService    = require('./src/server/management/health.js');

/************************************
 * Build Tasks
 ************************************/

// let isProdBuild = false;
// let disableLiveReload = false;

gulp.task('default', ['logTasks']);
gulp.task('logTasks', () => {
  process.nextTick(() => {
    console.log();
    console.log('gulp serve              serves your app locally, targeting "dev" cluster APIs');
    console.log('gulp serve --local      serves your app locally, targeting local services APIs');
    console.log('gulp serve --fullyLocal serves your app locally, targeting local services APIs + local Keycloak');
    console.log('gulp serve --qa         serves your app locally, targeting "qa" cluster APIs');
    console.log('gulp serve --prod       serves the production build of your app locally');
    console.log('gulp build              bundles your app for production');
    console.log('gulp build-assets       build styles, images and fonts resources');
    console.log('gulp build-modules      build JSPM modules for page push');
    console.log('gulp test               runs your tests using Chrome');
    console.log('gulp test --debug       runs your tests using Chrome in debug mode');
    console.log('gulp test --firefox     runs your tests using Firefox');
    console.log();
  });
});

// gulp.task('serve', () => {
//
//   isProdBuild = argv.prod;
//
//   if (argv.local || argv.fullyLocal) {
//     targetGcpCluster = false;
//   }
//
//   if (argv.fullyLocal) {
//     useGcpMiddlewares = false;
//     allowDefaultConfFallbackOnFetchConfFailure = true;
//   }
//
//   if (argv.qa) {
//     gcpEnvName = 'qa';
//   }
//
//   if (targetGcpCluster) {
//     console.log("Targeting '"+ gcpEnvName +"' GCP environment APIs");
//   }
//   else {
//     console.log("Targeting local service APIs");
//   }
//
//   if (useGcpMiddlewares) {
//     console.log("Using '"+ gcpEnvName +"' GCP middlewares (Keycloak, config server, ...)");
//   }
//   else {
//     console.log("Using local Keycloak");
//   }
//
//   if (isProdBuild || argv.disableLiveReload == 'true') {
//     disableLiveReload = true;
//   }
//   var flow;
//
//   if (isProdBuild) {
//     flow = buildApp();
//   }
//   else {
//     flow = buildModules();
//     flow = flow.then(buildApp);
//   }
//
//   flow = flow
//     .then(render)
//     .then(startServer);
//
//   const flowBeforeWatch = flow;
//
//   if (!disableLiveReload) {
//     flow = flow.then(watch);
//   }
//   return flowBeforeWatch;
// });

// gulp.task('build', () => {
//
//   isProdBuild = true;
//
//   return clean()
//     .then(buildModules)
//     .then(prepareAppBuildPromise(true, true));
// });

// gulp.task('build-assets', () => {
//
//   return compileAssets();
// });

gulp.task('build-modules', () => {

  return buildModules();
});

gulp.task('clean', () => {

  return new Promise(resolve => {
    exec(`rm -rf ${buildDir}`);
    resolve();
  });
});

// gulp.task('test', () => {
//   new KarmaServer(karmaConfig(argv.debug, argv.firefox)).start();
// });

/*gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});*/

/************************************
 * Build Functions
 ************************************/

// function clean() {
//   return new Promise(resolve => {
//     exec(`rm -rf ${buildDir}`);
//     resolve();
//   });
// }

// function buildApp( forceJsPreloadsRebuild, forceJsAppRebuild ) {
//   return prepareAppBuildPromise(forceJsPreloadsRebuild, forceJsAppRebuild)();
// }

// function prepareAppBuildPromise( forceJsPreloadsRebuild, forceJsAppRebuild ) {
//   return function() {
//
//     const promises = [];
//
//     promises.push(compileAssets());
//     promises.push(buildEnvConfigJs());
//     promises.push(new Promise((resolve, reject) => {
//
//       buildJsPreloadsBundle(forceJsPreloadsRebuild)
//         .then(() => {
//           if (isProdBuild || forceJsAppRebuild) {
//             buildJsAppBundle(forceJsAppRebuild)
//               .then(resolve)
//               .catch(reject);
//           }
//           else {
//             resolve();
//           }
//         })
//         .catch(reject);
//     }));
//     return Promise.all(promises);
//   }
// }

// function compileAssets() {
//   return prepareAssetsCompilePromise()();
// }

// function prepareAssetsCompilePromise() {
//   return function() {
//
//     const promises = [];
//
//     promises.push(compileSass());
//     promises.push(copyFonts());
//     promises.push(copyLocales());
//
//     // if (isProdBuild) {
//     //   promises.push(buildJsBundle()
//     //       .then(copyImages)
//     //       .then(copyFonts));
//     // }
//     return Promise.all(promises);
//   }
// }

function buildModules() {

  return new Promise((resolve, reject) => {

      moduleBuildTools
        .buildModule(moduleName)
        .buildComponent()
        .buildAvscIdl()

        // Always using local conf here, since this build is only used for local CKSR tasks declaration
        // (Kubernetes build is done from script 'standalone-module-build.js')
        .buildCksrTaskYaml(localConf);

    console.log("Finished building modules");

    resolve();
  });
}

// function compileSass() {
//   return new Promise(resolve => {
//     const stream = gulp.src('src/styles/index.scss')
//       .pipe(sass({
//         errLogToConsole: true,
//         outputStyle: 'compressed',
//         // functions: sassJspm.resolve_function("./jspm_packages/"),
//         importer: sassJspm.importer
//       }));
//
//     // if (isProdBuild) {
//     //   stream.pipe(rev());
//     // }
//
//     stream.pipe(gulp.dest(cssDir))
//       .on('end', resolve);
//   });
// }

// function copyImages() {
//   return new Promise(resolve => {
//     gulp.src('./img/**/*')
//       .pipe(gulp.dest(imgDir))
//       .on('end', resolve);
//   });
// }

// function copyLocales() {
//   return new Promise(resolve => {
//     gulp.src('./src/conf/i18n/**/*.json')
//       .pipe(gulp.dest(localeDir))
//       .on('end', resolve);
//   });
// }

// function copyFonts() {
//   return new Promise(resolve => {
//     gulp.src([
//       './fonts/**/*',
//       './jspm_packages/npm/slick-carousel@1.8.1/slick/fonts/**/*', // copy specific fonts from slick-carousel
//     ])
//       .pipe(gulp.dest(fontsDir))
//       .on('end', resolve);
//   });
// }

/**
 * Create an 'env.js' file which can be imported by this project ES6 modules
 * to use environment variables (such as URLs).
 */
// function buildEnvConfigJs() {
//   return new Promise(resolve => {
//
//     var fileName = 'env.json';
//     var fileOutputPath = confOutputDir +"/"+ fileName;
//
//     if (fs.existsSync(fileOutputPath)) {
//
//       var isReadOnly = false;
//       try {
//         fs.accessSync(fileOutputPath, fs.constants.W_OK);
//       }
//       catch (err) {
//         isReadOnly = true;
//       }
//
//       if (isReadOnly) {
//         console.log("JSON environment configuration is read-only: skipping file generation");
//         resolve();
//         return;
//       }
//     }
//
//     var caseApiUrl = 'http://localhost:8205/api';
//     var keycloakUrl = 'http://localhost:8180/auth';
//     var pagePushFeedUrl = 'http://localhost:8230/api';
//     var searchApiUrl = 'http://localhost:8210/apisearch';
//     var configServerApiUrl = 'http://localhost:8265/config';
//     var iamApiUrl = 'http://localhost:8295/api';
//
//     if (kubernetesUtil.isInsideKubernetes()) {
//
//       caseApiUrl = getCloudServiceUrlForCaseApi(kubernetesUtil.getNamespace());
//       pagePushFeedUrl = getCloudServiceUrlForPagePush(kubernetesUtil.getNamespace());
//       searchApiUrl = getCloudServiceUrlForSearchApi(kubernetesUtil.getNamespace());
//       configServerApiUrl = getCloudServiceUrlForConfigServerApiUrl(kubernetesUtil.getNamespace());
//       iamApiUrl = getCloudServiceUrlForIamApi(kubernetesUtil.getNamespace());
//     }
//     else if (targetGcpCluster) { // Use of distant APIs
//
//       caseApiUrl = getCloudServiceUrlForCaseApi(gcpNamespace);
//       pagePushFeedUrl = getCloudServiceUrlForPagePush(gcpNamespace);
//       searchApiUrl = getCloudServiceUrlForSearchApi(gcpNamespace);
//       configServerApiUrl = getCloudServiceUrlForConfigServerApiUrl(gcpNamespace);
//       iamApiUrl = getCloudServiceUrlForIamApi(gcpNamespace);
//     }
//
//     if (useGcpMiddlewares) {
//       keycloakUrl = 'https://keycloak.'+ gcpEnvName +'.quicksign.io/auth';
//       configServerApiUrl = 'https://'+ gcpEnvName +'.quicksign.io/api/config/v1';
//     }
//
//     var templateData = {
//       caseApiUrl: caseApiUrl,
//       keycloakUrl: keycloakUrl,
//       pagePushFeedUrl: pagePushFeedUrl,
//       searchApiUrl: searchApiUrl,
//       configServerApiUrl: configServerApiUrl,
//       iamApiUrl: iamApiUrl,
//       allowDefaultConfFallbackOnFetchConfFailure: allowDefaultConfFallbackOnFetchConfFailure
//     };
//
//     gulp.src('src/templates/'+ fileName)
//       .pipe(handlebars(templateData))
//       .pipe(gulp.dest(confOutputDir))
//       .on('end', resolve);
//   });
// }

// function buildJsPreloadsBundle( forceRebuild ) {
//
//   console.log("Building Preloads JS bundle...");
//
//   return buildJsBundle({
//     src: './bundle/preloads.js', // only libraries (imported before the end of page loading)
//     dest: `${jsDir}/preloads.js`,
//     forceRebuild
//   })
//   .then(() => buildJsBundle({
//
//     // use app to load every dependencies (cannot be imported)
//     src: './bundle/app-deps.js',
//
//     // exclude app modules to keep only project dependencies
//     srcExcludes: [
//       '[./modules/**/*]',
//       '[./src/**/*]',
//       `${jsDir}/preloads.js`,
//       './jspm_packages/npm/@f5io/jsonpath@1.0.9/**/*' // not minifiable
//     ],
//     dest: `${jsDir}/app-deps.js`,
//     forceRebuild
//   }))
//   .then(() => console.log("Finished build of Preloads JS bundle"));
// }

// function buildJsAppBundle( forceRebuild ) {
//
//   console.log("Building App JS bundle...");
//
//   return buildJsBundle({
//     src: './src/bootstrap.js',
//     srcExcludes: [ `${jsDir}/preloads.js`, `${jsDir}/app-deps.js` ],
//     dest: `${jsDir}/bootstrap.js`,
//     forceRebuild
//   })
//   .then(() => buildJsBundle({
//     src: './src/app.js',
//     srcExcludes: [
//       `${jsDir}/preloads.js`,
//       `${jsDir}/app-deps.js`,
//       `${jsDir}/bootstrap.js`,
//       './jspm_packages/npm/@f5io/jsonpath@1.0.9/**/*' // not minifiable
//     ],
//     dest: `${jsDir}/app.js`,
//     forceRebuild
//   }))
//   .then(() => console.log("Finished build of App JS bundle"));
// }

// function buildJsBundle({ src, dest, srcExcludes, forceRebuild }) {
//
//   return new Promise((resolve, reject) => {
//
//     if (!forceRebuild && fs.existsSync(dest)) {
//       console.log(" >> using pre-built bundle "+ dest +" (skipping build)");
//       resolve();
//       return;
//     }
//
//     if (forceRebuild) {
//       console.log(" >> forced rebuild of "+ dest);
//     }
//     else {
//       console.log(" >> build of "+ dest +" which doesn't exist yet");
//     }
//
//     var builder = new Builder({
//       baseURL: './'
//     });
//     var bundleCmd = src;
//
//     for (var iExclude in srcExcludes) {
//       bundleCmd += ' - '+ srcExcludes[iExclude];
//     }
//
//     return builder
//       .loadConfig('jspm.config.js')
//       .then(() => {
//         return builder.bundle(bundleCmd, dest, {
//           minify: true,
//           sourceMaps: false,
//           runtime: false
//         });
//       })
//       .then(() => {
//         console.log("Build finished: "+ dest);
//         resolve();
//       })
//       .catch(function(err) {
//         console.log("############################");
//         console.log("# ERROR BUILDING JS BUNDLE #");
//         console.log("############################");
//         console.log("")
//         console.log(err);
//         console.log("")
//         reject(err);
//       });
//       // .then(() => {
//       //   gulp.src(`${jsDir}/app.js`)
//       //     .pipe(rev())
//       //     .pipe(gulp.dest(jsDir))
//       //     .on('end', () => {
//       //       exec(`rm ${jsDir}/app.js`);
//       //       resolve();
//       //     });
//       // });
//   });
// }

// const realmTemplateData = {}

// function render() {
//   return new Promise(resolve => {
//
//     Object.assign(realmTemplateData, {
//       bootstrapJs: bootstrapJsPublicPath,
//       appCss: readdirSync(cssDir)[0],
//       appJs: appJsPublicPath,
//       preloadsJsPath: preloadsJsPublicPath,
//       appDepsJsPath: appDepsJsPublicPath,
//       isProdBuild
//     });
//
//     gulp.src('src/index.html')
//       .pipe(handlebars(realmTemplateData))
//       .pipe(rename('index.html'))
//       .pipe(gulp.dest(buildDir))
//       .on('end', resolve);
//   });
// }

// function getKubernetesKafkaUrl() {
//   return 'kafka.middleware:9092';
// }
//
// function getCloudServiceUrlForCaseApi( namespace ) {
//
//   if (namespace == 'default') {
//     return 'https://'+ gcpEnvName +'.quicksign.io/api/case/v3';
//   }
//   return 'http://qs-service-rest-api-fo.'+ namespace +'.qs-soa4.zyns.com';
// }
//
// function getCloudServiceUrlForPagePush( namespace ) {
//
//   if (namespace == 'default') {
//     return 'https://'+ gcpEnvName +'.quicksign.io/api/sse/v1';
//   }
//   return 'http://qs-service-rest-api-fo-sse.'+ namespace +'.qs-soa4.zyns.com';
// }
//
// function getCloudServiceUrlForSearchApi( namespace ) {
//
//   if (namespace == 'default') {
//     return 'https://'+ gcpEnvName +'.quicksign.io/api/search/v1';
//   }
//   return 'http://qs-service-rest-search.'+ namespace +'.qs-soa4.zyns.com';
// }
//
// function getCloudServiceUrlForConfigServerApiUrl( namespace ) {
//
//   if (namespace == 'default') {
//     return 'https://'+ gcpEnvName +'.quicksign.io/api/config/v1';
//   }
//   return 'http://qs-service-configuration-server.'+ namespace +'.qs-soa4.zyns.com';
// }
//
// function getCloudServiceUrlForIamApi( namespace ) {
//
//   if (namespace == 'default') {
//     return 'https://'+ gcpEnvName +'.quicksign.io/api/iam/v1';
//   }
//   return 'http://qs-service-rest-iam.'+ namespace +'.qs-soa4.zyns.com';
// }
//
// function startServer() {
//
//   const opts = {
//     name: 'Application server',
//     root: `./${buildDir}`,
//     //fallback: `./${buildDir}/index.html`,
//     host: '0.0.0.0',
//     port: appServerPort,
//     middleware(connect) {
//       const middlewares = [
//         connect().use('/conf',           connect.static('./conf')),
//         connect().use('/locales',        connect.static('./locales')),
//         connect().use('/jspm.config.js', connect.static('./jspm.config.js')),
//         connect().use('/jspm_packages',  connect.static('./jspm_packages')),
//         connect().use('/node_modules',   connect.static('./node_modules')),
//         connect().use('/modules',        connect.static('./modules')),
//         connect().use('/static/img',     connect.static('./img')),
//         connect().use('/static/fonts',   connect.static(`./${buildDir}/static/fonts`)),
//         connect().use('/static/css',     connect.static(`./${buildDir}/static/css`)),
//         connect().use('/static/js',      connect.static(`./${buildDir}/static/js`)),
//         connect().use('/static/lib',     connect.static(`./lib`)),
//       ];
//
//       if (!isProdBuild) {
//         middlewares.push(connect().use('/dist', connect.static('./dist')));
//         middlewares.push(connect().use('/src',  connect.static('./src')));
//       }
//       middlewares.push(connect().use('/', realmIndexPage(targetGcpCluster, gcpNamespace, realmTemplateData)));
//
//       return middlewares;
//     }
//   };
//
//   if (!isProdBuild && !disableLiveReload) {
//     Object.assign(opts, { livereload: true });
//   }
//
//   const connectApp = connect.server(opts);
//
//   connect.server({
//     name: 'Management server',
//     root: `./${buildDir}/management`, // its a non-existant directory, on purpose
//     host: '0.0.0.0',
//     port: managementServerPort,
//     livereload: false,
//     middleware(connect) {
//       return [
//         connect().use('/health', healthService(connectApp))
//       ];
//     }
//   });
// }

// function watch() {
//
//   const cssBuildPath = `${buildDir}/**/*.css`;
//   gulp.watch('./src/styles/**/*.scss', compileSass);
//   gulp.watch(cssBuildPath, () => {
//     gulp.src(cssBuildPath).pipe(connect.reload());
//   });
//
//   gulp.watch(
//     [
//       'bundle/preloads.js',
//       'bundle/app-deps.js'
//     ],
//     () => {
//       buildApp(true).then(() => {
//         gulp
//           .src('./src/app.js')
//           .pipe(connect.reload());
//       });
//   });
//
//   gulp.watch(
//     [
//       './src/**/*',
//       './src/**/*.jsx',
//       './img/**/*',
//       './fonts/**/*'
//     ],
//     () => {
//       compileAssets().then(() => {
//         gulp
//           .src('./src/app.js')
//           .pipe(connect.reload());
//       });
//   });
//
//   gulp.watch(
//     [
//       './modules/*.json',
//       './modules/*/lib/**/*',
//       './modules/*/*.avdl',
//       './modules/*/*.yml'
//     ],
//     () => {
//       buildModules().then(() => {
//         gulp
//           .src('./src/app.js')
//           .pipe(connect.reload());
//     });
//   });
// }
