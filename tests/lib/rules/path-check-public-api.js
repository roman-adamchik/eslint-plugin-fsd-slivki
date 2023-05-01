/**
 * @fileoverview Check for using only public API paths for importing modules
 * @author Roman
 */
"use strict";

const { parserOptions } = require("../config/options");

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-check-public-api"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions
});
ruleTester.run("path-check-public-api", rule, {
  valid: [
    {
      code: "import { getProfileForm } from 'entities/Profile'",
      errors: [],
    },
    {
      code: "import { Button } from '../Button/Button'",
      errors: [],
    },
    {
      code: "import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'",
      errors: [],
    },
    {
      code: "import { getProfileForm } from '@/entities/Profile'",
      errors: [],
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: '/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article/file.test.ts',
      code: "import { getProfileForm } from '@/entities/Profile/testing'",
      errors: [],
      options: [
        {
          alias: '@',
          testFiles: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
        }
      ]
    },
    {
      filename: '/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article/StoreDecorator.tsx',
      code: "import { getProfileForm } from '@/entities/Profile/testing'",
      errors: [],
      options: [
        {
          alias: '@',
          testFiles: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
        }
      ]
    },
  ],

  invalid: [
    {
      code: "import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [{messageId: "errorMessage"}],
    },
    {
      code: "import { getProfileForm } from '@/entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [{messageId: "errorMessage"}],
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: '/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article/StoreDecorator.tsx',
      code: "import { getProfileForm } from '@/entities/Profile/ui/Component/test.tsx'",
      errors: [{messageId: "errorMessage"}],
      options: [
        {
          alias: '@',
          testFiles: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
        }
      ]
    },
    {
      filename: '/Users/romanadamchik/Documents/Projects/project_007/src/entities/Article/SomeComponent.tsx',
      code: "import { getProfileForm } from '@/entities/Profile/testing'",
      errors: [{messageId: "errorTestingMessage"}],
      options: [
        {
          alias: '@',
          testFiles: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx']
        }
      ]
    },
  ],
});
