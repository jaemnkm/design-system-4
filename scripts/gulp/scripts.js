const gulp = require( 'gulp' );
const gulpRename = require( 'gulp-rename' );
const vinylNamed = require( 'vinyl-named' );
const webpack = require( 'webpack' );
const webpackConfig = require( '../../config/webpack-config.js' );
const webpackStream = require( 'webpack-stream' );

/* TODO: Add a production and dev flag via NODE_ENV to generate
   a minified and un-minified version of the assets. */

/**
 * Compile all the individual component files so that users can `npm install`
 * a single component if they desire.
 * @returns {Object} An output stream from gulp.
 */
function scriptsComponents() {
  return gulp.src( 'packages/cfpb-design-system/src/cfpb-design-system.js' )
    .pipe( vinylNamed() )
    /*.pipe( gulpRename( path => {
      tmp[key] = path;
    } ) )*/
    .pipe( webpackStream( webpackConfig.commonConf, webpack ) )
    /*.pipe( gulpRename( path => {
      path.dirname = tmp[key].dirname.replace( '/src', '' );
      path.extname = '.min.js';
    } ) )*/
    .pipe( gulp.dest( 'packages/cfpb-design-system/temp' ) );
    //.on( 'error', handleErrors.bind( this, { exitProcess: true } ) )
    //.pipe( gulp.dest( paths.processed + dest ) );
}

gulp.task( 'scripts:components', scriptsComponents );

gulp.task( 'scripts', gulp.parallel(
  'scripts:components'
) );
