# Check import paths to be relative inside one slice (`fsd-slivki/path-check-relative`)

<!-- end auto-generated rule header -->

Check relative imports inside a slice according to the FSD. With autofix.

## Rule Details

This rule aims to prevent using absolute imports of modules located inside one Slice. This mean your module will be more isolated and don't have useless external relations. Autofix available.

Examples of **incorrect** code for this rule:

```js

// Assuming your file path is /Users/FSDUser/Documents/Projects/FSDProject/src/entities/YourEntity/ui/Component/Component.tsx
import { getSomeData } from 'entities/YourEntity/model/selectors/getSomeData/getSomeData';

```

Examples of **correct** code for this rule:

```js

// Assuming your file path is /Users/FSDUser/Documents/Projects/FSDProject/src/entities/YourEntity/ui/Component/Component.tsx
import { getSomeData } from '../../model/selectors/getSomeData/getSomeData';

```

### Options

```js

"fsd-slivki/path-check-relative": [
  "error",
  {
    alias: '@', // if you use alias for your root src folder, you can pass it here as an option
  }
],

```

## When Not To Use It

Only if you don't use Feature Sliced Design architecture patterns.

## Further Reading

Read about FSD here
https://feature-sliced.design/