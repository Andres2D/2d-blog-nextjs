---
title: 'Migrating Jest into an Angular Project'
date: '2022-11-30'
image: jest-migration.png
excerpt: Migrate from Karma & Jasmine to Jest.
technologies: 'angular,jest'
isFeatured: true
---

Jest is the best option to test your old and new projects. Compared to the graphic web interface that Karma & Jasmine offer, 
Jest implements a completely command-line interface, making it the quickest way to test your components.

On the other hand, Karma & Jasmine are completely joined to the Angular framework, and to some extent, the documentation and the community
It's pretty good. However, Jest is used by multiple JavaScript frameworks, and the community and documentation are so extensive.

Your projects will use Karma and Jasmine by default if you use the [Angular schematics](https://angular.io/guide/schematics). However, the migration is pretty simple. Let's check what we need to do:

For this example, I'm going to use a basic Angular project created with the `ng new` schematics:

Then, if I run the command:
```bash
npm run test
```
I'll get:

![Karma preview](karma-preview.png=996x429)

As you can see, all my test cases are running and passing without any problems. The idea at the end
of the migration is to get the same result but using Jest.


1] Let's install jest as a dev dependency:

```bash
npm install jest jest-preset-angular --save-dev
```

2] Let's create the Jest config file

In your root folder, create a file called: `jest.config.js` and add the following configuration:

```javascript
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  coverageReporters: ['text'],
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageReporters: ['html', 'text']
};
```

This configuration will show all the relevant information on the command line when you run the test command.

3] In your `package.json` let's update the test script:
```json
{
  ...
  "scripts": {
    ...
    "test": "jest"
    ...
  },
  ...
}
```

4] Update the global test file. Go to `src/test.ts` and replace all the content with:
```ts
import 'jest-preset-angular/setup-jest';

Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
```

This file will refer to Jest and not to Karma.

5] Uninstall Karma & Jasmine
In order to get rid of all the Karma & Jasmine dependencies let's run:
```bash
npm uninstall karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter
```

6] Finally, you could delete the `karma.conf.js` file.

Now, let's run:
```bash
npm run test
```

And you should get something like this:

![Jest tests](jest-tests.gif=600x406)

That's it, we just migrate Jest into an existing Angular project. All the code can be found in this
[Repository](https://github.com/Andres2D/angular-jest-migration). Go to the branch `jest-migration` to see the final result.

:)
