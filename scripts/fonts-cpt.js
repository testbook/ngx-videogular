'use strict';

const fs = require('fs');
const sass = require('node-sass');
const CleanCss = require('clean-css');
const cpx = require('cpx');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const { version } = require('../libs/tb-videogular/package.json');

const copyDir = () =>
  new Promise((resolve, reject) => {
    console.log(`Copying fonts...`);
    console.log();

    cpx.copy(`libs/tb-videogular/fonts/*`, `dist/libs/tb-videogular/fonts`, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

const compileCss = () =>
  new Promise((resolve, reject) => {
    console.log('Prefixing and minifying index.css...');
    console.log();
    console.log(`Letting the days go by`);
    console.log(`Let the water hold me down`);
    console.log(`Letting the days go by`);
    console.log(`Water flowing underground`);
    console.log(`Into the blue again`);
    console.log(`After the money's gone`);
    console.log(`Once in a lifetime`);
    console.log(`Let the water hold me down`);
    console.log();

    fs.readFile('dist/libs/tb-videogular/fonts/videogular.css', (err, data) => {
      if (err) {
        return reject(err);
      }

      sass.render(
        {
          data: `$pkgVersion:'${version}';${data}`,
          includePaths: ['dist/libs/tb-videogular/fonts']
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }

          postcss()
            .use(autoprefixer())
            .process(result.css, { from: undefined })
            .then(({ css }) => {
              const cssMinifier = new CleanCss();
              const minifiedCss = cssMinifier.minify(css).styles;
              fs.writeFile('dist/libs/tb-videogular/fonts/videogular.css', minifiedCss, err => {
                if (err) {
                  return reject(err);
                }
                resolve();
              });
            });
        }
      );
    });
  });

Promise.all(['assets', 'styles']
  .map(dir => copyDir(dir)))
  .then(() => compileCss())
  .then(() => {
    console.log('Done! Have a great day!');
    console.log();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
