const path = require('path');
const config = {};

config.rootDir = __dirname;

config.webappDir = path.resolve(config.rootDir, 'webapp');
config.srcDir = path.resolve(config.webappDir, 'src');
config.distDir = path.resolve(config.webappDir, 'dist');

config.jsDir = path.resolve(config.srcDir, 'js');
config.imgDir = path.resolve(config.srcDir, 'images');
config.lessDir = path.resolve(config.srcDir, 'less');
config.tplDir = path.resolve(config.srcDir, 'tpl');


module.exports = config;