/**
 * @fileoverview Check for using only public API paths for importing modules
 * @author Roman Adamchik <roman.adamchik@gmail.com>
 */
"use strict";

const { layersWithPublicApi } = require('../consts/consts');
const { isPathRelative } = require('../utils/paths');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "Check for using only public API paths for importing modules",
      recommended: false,
      url: null, 
    },
    fixable: null, 
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ], 
    messages: {
      errorMessage: 'According to FSD you should use only public API for importing modules',
    },
  },

  create(context) {
    const {alias = ''} = context.options[0] || {};

    return {
      'ImportDeclaration': (node) => {
        // example entities/Article
        const {source: {value} = {}} = node;
        const pathImport = alias ? value.replace(`${alias}/`, '') : value;


        if (shouldUsePublicApi(pathImport)) {
          context.report({
            node,
            messageId: "errorMessage",
          })
        }
      }
    };
  },
};

function shouldUsePublicApi(pathImport) {
  if (isPathRelative(pathImport)) return false;

  const [importLayer, importSlice, next] = pathImport.split('/');

  if (!importLayer || !importSlice || !layersWithPublicApi[importLayer]) return false;

  if (next) return true

  return false;
}