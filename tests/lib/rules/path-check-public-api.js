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
  ],

  invalid: [
    {
      code: "import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [{message: "According to FSD you should use only public API for importing modules"}],
    },
    {
      code: "import { getProfileForm } from '@/entities/Profile/model/selectors/getProfileForm/getProfileForm';",
      errors: [{message: "According to FSD you should use only public API for importing modules"}],
      options: [
        {
          alias: '@'
        }
      ]
    },
  ],
});
