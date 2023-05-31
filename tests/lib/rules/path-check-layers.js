/**
 * @fileoverview Prevent importing modules from upper layers
 * @author Roman Adamchik
 */
"use strict";

const { parserOptions } = require("../config/options");

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-check-layers"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions
});
ruleTester.run("path-check-layers", rule, {
  valid: [
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article",
      code: "import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [],
    },
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article",
      code: "import { React } from 'React';",
      errors: [],
    },
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article",
      code: "import { Button } from 'shared/ui/Button/Button';",
      errors: [],
    },
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/features/ArticleCommentList/ui/ArticleCommentList/ArticleCommentList.tsx",
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ]
    },
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/index.tsx",
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: [
        {
          alias: '@',
        }
      ]
    },
  ],

  invalid: [
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/entities/Profile",
      code: "import { App } from 'app/ui/App';",
      errors: [{ messageId: "errorMessage" }],
    },
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/features/ArticleCommentList/ui/ArticleCommentList/ArticleCommentList.tsx",
      code: "import { Summary } from '@/widgets/Summary/ui/Summary';",
      errors: [{ messageId: "errorMessage" }],
      options: [
        {
          alias: '@'
        }
      ]
    },
  ],
});
