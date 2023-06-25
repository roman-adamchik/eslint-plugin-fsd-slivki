/**
 * @fileoverview Check import paths to be relative inside one slice
 * @author Roman Adamchik <roman.adamchik@gmail.com>
 */
"use strict";
const { layers } = require('../consts/consts');
const { isPathRelative, getSegmentsFromFile, getNormalizedFilePath } = require('../utils/paths');
const path = require('path');

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Check import paths to be relative inside one slice",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ], // Add a schema if the rule has options
    messages: {
      errorMessage: 'According to FSD you should use related imports inside one slice',
    },
  },

  create(context) {
    const {alias = ''} = context.options[0] || {};

    return {
      'ImportDeclaration': (node) => {
        // example entities/Article
        const {source: {value} = {}} = node;
        const pathImport = alias ? value.replace(`${alias}/`, '') : value;
        // example /Users/romanadamchik/Documents/Projects/project_007/src/entities/Article
        const fileName = context.getFilename();

        if (shouldBeRelative(pathImport, fileName)) {
          context.report({
            node,
            messageId: "errorMessage",
            fix: (fixer) => {
              const normalizedFilePath = getNormalizedFilePath(fileName)
                .split('/')
                .slice(0, -1)
                .join('/');
              const normalizedImportPath = `/${pathImport}`;
              let relativePath = path.relative(normalizedFilePath, normalizedImportPath);
              
              if (!relativePath.startsWith('.')) {
                relativePath = './' + relativePath;
              }

              return fixer.replaceText(
                node.source, 
                `'${relativePath}'`
              )
            }
          })
        }
      }
    };
  },
};


function shouldBeRelative(pathImport, pathCurrentFile) {
  if (isPathRelative(pathImport)) return false;

  const [importLayer, importSlice] = pathImport.split('/');

  if (!importLayer || !importSlice || !layers[importLayer]) return false;

  const [pathCurrentFileLayer, pathCurrentFileSlice] = getSegmentsFromFile(pathCurrentFile)

  if (!pathCurrentFileLayer || !pathCurrentFileSlice || !layers[pathCurrentFileLayer]) return false;

  return importLayer === pathCurrentFileLayer && importSlice === pathCurrentFileSlice
}
