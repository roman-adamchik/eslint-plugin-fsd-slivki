/**
 * @fileoverview Check import paths to be relative inside one slice
 * @author Roman Adamchik &lt;roman.adamchik@gmail.com&gt;
 */
"use strict";

const { parserOptions } = require("../config/options");

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-check-relative"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions
});
ruleTester.run("path-check-relative", rule, {
  valid: [
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article",
      code: "import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [],
    },
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article",
      code: "import { getProfileForm } from '@/entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [],
    }
  ],

  invalid: [
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/entities/Profile",
      code: "import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [{ messageId: "errorMessage" }],
    },
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/features/ArticleCommentList/ui/ArticleCommentList/ArticleCommentList.tsx",
      code: "import { articleDetailsCommentsReducer, getArticleComments } from '@/features/ArticleCommentList/model/slice/articleDetailsCommentsSlice';",
      errors: [{ messageId: "errorMessage" }],
      options: [
        {
          alias: '@'
        }
      ]
    },
  ],
});
