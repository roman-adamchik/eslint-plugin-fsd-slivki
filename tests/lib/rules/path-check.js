/**
 * @fileoverview Check import paths to be relative inside one slice
 * @author Roman Adamchik &lt;roman.adamchik@gmail.com&gt;
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-check-relative"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  }
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
      errors: [{ message: "According to FSD you should use related imports inside one slice" }],
    },
    {
      filename: "/Users/romanadamchik/Documents/Projects/project_007/src/entities/Profile",
      code: "import { getProfileForm } from '@/entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [{ message: "According to FSD you should use related imports inside one slice" }],
      options: [
        {
          alias: '@'
        }
      ]
    },
  ],
});
