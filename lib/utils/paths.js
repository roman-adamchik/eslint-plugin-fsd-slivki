const path = require('path');

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

function getSegmentsFromFile(filePath) {
  const filePathArray = filePath.split(path.sep);
  const cutIndex = filePathArray.findIndex((elem) => elem === 'src');
  return filePathArray.slice(cutIndex + 1);
}

function getLayerFromFile(filePath) {
  const filePathArray = filePath.split(path.sep);
  const srcIndex = filePathArray.findIndex((elem) => elem === 'src');
  return filePathArray[srcIndex + 1]
}

function getNormalizedFilePath(filePath) {
  const projectPath = filePath.split('src')[1];
  return projectPath.split(path.sep).join('/')
}

function getLayerFromImport(value = '', alias) {
  const importPath = alias ? value.replace(`${alias}/`, '') : value;
  const segments = importPath.split('/');

  return segments[0];
}

module.exports = {
  isPathRelative,
  getSegmentsFromFile,
  getLayerFromFile,
  getLayerFromImport,
  getNormalizedFilePath
}