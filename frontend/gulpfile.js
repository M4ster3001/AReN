import { src, dest, parallel } from 'gulp'
import autoPrefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import minifyJS from 'gulp-uglify'
import minifyCSS from 'gulp-uglifycss'
import ofuscateJS from 'gulp-obfuscate'
import otmIMG from 'gulp-image'
import babel from 'gulp-babel'
import minifyHTML from 'gulp-htmlmin'
import watch from 'gulp-watch'

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

function javascript () {
  return src('D:/Dropbox/Projetos/ProjetosGit/assets/admin/poker/scripts/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(minifyJS())
    .pipe(rename({ extname: '.js' }))
    .pipe(dest('dist/assets/js/'))
}

function ofuscateJs () {
  return src('dist/js/*.js')
    .pipe(ofuscateJS())
    .pipe(dest('dist/assets/js/ofuscate/'))
}

function css () {
  return src('D:/Dropbox/Projetos/ProjetosGit/assets/admin/poker/css/*.css')
    /* .pipe( autoPrefixer( {
        browsers: AUTOPREFIXER_BROWSERS,
        cascade: false
    } ) ) */
    .pipe(minifyCSS())
    .pipe(rename({ extname: '.css' }))
    .pipe(dest('dist/assets/css/'))
}

function html () {
  return src('D:/Dropbox/Projetos/ProjetosGit/sistema/**/*.html')
    .pipe(minifyHTML({
      collapseWhiteSpace: true,
      removeComments: true
    }))
    .pipe(dest('dist/assets/html'))
}

function otimizeImg () {
  return src('D:/Dropbox/Projetos/ProjetosGit/sistema/img/**')
    .pipe(otmIMG())
    .pipe(dest('dist/assets/images/'))
}

const _default = parallel(javascript, css, html)
export { _default as default }
