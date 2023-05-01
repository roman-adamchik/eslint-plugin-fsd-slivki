/**
 * @fileoverview Check import paths to be relative inside one slice
 * @author Roman Adamchik <roman.adamchik@gmail.com>
 */
"use strict";
const { layers } = require('../consts/consts');
const { isPathRelative, getSegmentsFromFile } = require('../utils/paths');

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Check import paths to be relative inside one slice",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
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
