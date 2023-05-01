const path = require('path');

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

function getSegmentsFromFile(filePath) {
  const filePathArray = filePath.split(path.sep);
  const cutIndex = filePathArray.findIndex((elem) => elem === 'src');
  return filePathArray.slice(cutIndex + 1);
}

module.exports = {
  isPathRelative,
  getSegmentsFromFile
}