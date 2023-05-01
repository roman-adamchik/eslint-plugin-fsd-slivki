# Check for using only public API paths for importing modules (`fsd-slivki/path-check-public-api`)

<!-- end auto-generated rule header -->

This rule checks if you use public API (index.ts) or testing public api (testing.ts) for importing modules

## Rule Details

According to FSD you should use only public API to import modules from different slices. You can only import modules from index.ts file or from testing.ts file for testing purposes (testing public API).

Examples of **incorrect** code for this rule:

```js

import { getSomeData } from 'entities/yourEntity/model/selectors/getSomeData/getSomeData';

```

Examples of **correct** code for this rule:

```js

import { getSomeData } from 'entities/yourEntity';

```

### Options

```js

"fsd-slivki/path-check-public-api": [
  "error",
  {
    alias: '@', // if you use alias for your root src folder, you can pass it here as an option
    testFiles: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'] // Array of testing files patterns
  }
],

```

## When Not To Use It

Only if you don't use Feature Sliced Design architecture patterns.

## Further Reading

Read about FSD here
https://feature-sliced.design/