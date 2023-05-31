# Importing modules from upper layers is forbidden in FSD (`fsd-slivki/path-check-layers`)

<!-- end auto-generated rule header -->

This rule checks if you are importing modules only from lower layers. According to FSD you are not allowed to import modules from upper layers.

## Rule Details

According to FSD you should import modules only from lower layers. You will be notified if you are trying to import module from upper layer. 
Order of the layers in FSD (from high to low):
1. app
2. pages
3. widgets
4. features
5. entities
6. shared

Examples of **incorrect** code for this rule:

```js

// Assuming your file path is /Users/FSDUser/Documents/Projects/FSDProject/src/entities/YourEntity/ui/Component/Component.tsx
import { getSomeData } from 'features/SomeFeature/model/selectors/getSomeData/getSomeData';

```

Examples of **correct** code for this rule:

```js

// Assuming your file path is /Users/FSDUser/Documents/Projects/FSDProject/src/entities/YourEntity/ui/Component/Component.tsx
import { button } from 'shared/ui/Button/Button';

```

### Options

```js

"fsd-slivki/path-check-layers": [
  "error",
  {
    alias: '@', // if you use alias for your root src folder, you can pass it here as an option
    ignoreImportPatterns: ['**/SomePattern', 'AnotherPattern'], // You can exclude some patterns from this rule
  }
],

```

## When Not To Use It

Only if you don't use Feature Sliced Design architecture patterns.

## Further Reading

Read about FSD here
https://feature-sliced.design/