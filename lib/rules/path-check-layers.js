/**
 * @fileoverview Prevent importing modules from upper layers
 * @author Roman Adamchik
 */
"use strict";

const { layers, layersMap } = require('../consts/consts');
const { getLayerFromFile, getLayerFromImport, isPathRelative } = require('../utils/paths');
const mm = require('micromatch');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Importing modules from upper layers is forbidden in FSD",
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
          },
          ignoreImportPatterns: {
            type: 'array'
          }
        }
      }
    ],
    messages: {
      errorMessage: 'According to FSD you should import modules only from upper layers',
    },
  },

  create(context) {
    const {alias = '', ignoreImportPatterns = []} = context.options[0] || {};

    return {
      'ImportDeclaration': (node) => {
        const {source: {value: importPath} = {}} = node;
        const filePath = context.getFilename();
        const currentFileLayer = getLayerFromFile(filePath);
        const importLayer = getLayerFromImport(importPath, alias);

        if (isPathRelative(importPath)) return;

        if (!layers[currentFileLayer] || !layers[importLayer]) return;

        const isIgnored = ignoreImportPatterns.some(pattern => mm.isMatch(importPath, pattern));

        if (isIgnored) return;

        if (!layersMap[currentFileLayer].has(importLayer)) {
          context.report({
            node,
            messageId: "errorMessage",
          })
        }
      }
    };
  },
};
