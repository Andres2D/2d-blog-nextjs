---
title: 'Javascript Better Code'
date: '2022-09-12'
image: javascript-better-code.png
excerpt: 5 javascript concepts to improve your code.
technologies: 'javascript'
author: 'Andres Alcaraz'
profile: 'https://contrib.rocks/image?repo=andres2d/andres2d'
gitHubRepository: 'https://github.com/Andres2D/berserk-javascript/blob/main/general/clean-code.js'
isFeatured: true
---

Programming is not just about writing complex code in a text editor; it's about creating something special in order
to solve a problem or fulfill a need. As well as writing code that works, we also be aware of how to write code that is easy
to understand and easy to escalate.

Let's review five key concepts to help you write better code.

## 1] Don't compress your code, webpack will do that for you

Let's see the following code:
```js
// * Please don't do this *
// This is the object to store a office reservation state
let ofcSts = { ena: true, resBy: '' };

// This function is used to reserve the office sending an user
const resOfc = (u) => { if(ofcSts.ena) { ofcSts = { ena: false, resBy: u } } else { return; } };

resOfc('Mike');
console.log(ofcSts);
```
First, they are defining an object using abbreviations in the name and the property names.
In order to 'reduce' code. Then, we can see a function with a condition and an object operation
all in the same line.

This code works, but we are using useless var names. When I see this kind of code, I just think
it was generated automatically by some kind of complex script. Is completely incomprehensible.

You may be thinking that the comments should clarify the code proposal. But, we just get more annoying words in the code. 
**Remember that our code should be clear enough to avoid writing comments.**  

Let's improve this code:
```js
// Do this instead
let officeStatus = { 
  enabled: true, 
  reservedByUser: '' 
};

const reserveOffice = (user) => { 
  if(officeStatus.enabled) { 
    officeStatus = { 
      enabled: false, 
      reservedByUser: user 
    } 
  } else {
    return;
  }
};

reserveOffice('Mike');
console.log(officeStatus);
```
The code looks longer, but don't worry about that. `webpack` will compress it for you in build time.

## 2] Make it easier to return

Let's check the following piece of code:
```js
// * Please don't *
const findBook = (bookId) => {
  if(bookId !== undefined || bookId !== null) {
    const book = {
      id: bookId,
      name: 'Book title'
    };
    return book;
  } else {
    return null;
  }
};
```

You may think that there's nothing wrong with this code, and you're right. The code is easy
to understand and works. Nevertheless, this code could be improved by inverting the condition logic.

First, let's check if the input data is wrong. Then let's work with the certainty that the data is correct.
Like this:

```js
// * Do this instead *
const findBook = (bookId) => {
  if(!book) {
    return null;
  }

  const book = {
    id: bookId,
    name: 'Book title'
  };
  return book;
};
```

Writing code is like writing a book. You could say that ```If the book is not undefined or if the book is not null, return the book's information otherwise return null```,
or you could say ``` If there isn't a book, return null, otherwise return the book```. Both cases do the trick, but which is more easier to read?

## 3] Please don't repeat yourself

The DRY principle is applicable to all kinds of code. Nevertheless, let's see the following case:
```js
// * Please don't *
const invitationList = ['Kevin', 'Sara', 'Steve', 'Karen'];
const capacity = 10;

const getPartyAccess = (person) => {
  if(invitationList.length < capacity && invitationList.includes(person.name)) {
    return 'Access granted';
  }

  if(invitationList.length < capacity && person.hasMoney()) {
    return 'Access granted';
  }

  return 'Access denied';
};

const verificationBad = getPartyAccess(
  { 
    name: 'Andres', 
    hasMoney: () => { return false } 
  }
);
console.log(verificationBad);
```
In `getPartyAccess` we can see two things that are repeated: `invitationList.length < capacity` and `return 'Access granted';`.
Therefore, this code could be improved.

Let's refactor the code to:
```js
// Do this instead
const getPartyAccess = (person) => {
  if(invitationList.length < capacity 
    && (invitationList.includes(person.name) || person.hasMoney())) {
    return 'Access granted';
  }

  return 'Access denied';
};

const verification = getPartyAccess({ name: 'Andres', hasMoney: () => { return false } });
console.log(verification);
```
We are reducing the two `if` conditions to just one single condition. Also, we are integrating
the positive return value once.

Remember, if you see duplications in your code, you are doing something wrong.

## 4] Get used to destructuring
Destructuring is one of the most popular features of ES. This is just syntactic sugar
that helps us write better code. Let's see:

```js
// * Please don't *
const client = {
  name: 'Andres',
  budget: 1000,
  references: ['Nicolas', 'Ellen']
}

const verifyCreditBad = (client) => {
  if(client.budget > 500 && client.references.length === 2) {
    return {
      name: client.name,
      approved: true,
      mainContact: client.references[0],
      optionalContact: client.references[1]
    }
  } else {
    return {
      approved: false
    }
  }
};

console.log(verifyCreditBad(client));
```
Just as the DRY principle explained in the last example, we can see that we are repeating the word  `client` a lot.
Let's use destructuring to fix it.

```js
// Do this instead
const verifyCredit = (client) => {

  const { budget, references, name } = client;
  const [ mainReference, optionalReference ] = references;

  if(budget > 500 && references.length === 2) {
    return {
      name,
      approved: true,
      mainContact: mainReference,
      optionalContact: optionalReference
    }
  } else {
    return {
      approved: false
    }
  }
};

console.log(verifyCredit(client));
```
In line `4`, we are using object destructuring to get all the values of the object in order
to get rid of the word `client` in the assignment of the values.

Also, we are using array destructuring based on positions to get the two only values
of the references array.

And with a single destructuring process, we improve the code readability.

## 5] The fewer the switches, the better

This final concept is more of an alternative to the  `switch` than a code improvement.
Let's see what this is about:

```js
const executeAction = (action) => {
  switch(action) {
    case 'create':
      return {
        created: true,
        message: 'Item created successfully'
      };
    case 'delete': {
      return {
        deleted: true,
        message: 'Item deleted successfully'
      }
    }
    case 'update': {
      return {
        updated: true,
        message: 'Item updated successfully'
      }
    }
    default: {
      return {
        error: true,
        message: 'Invalid action'
      };
    }
  }
};

console.log(executeAction('sd'));
```
Like I just said, there is nothing wrong with this piece of code. Lastly, I'm trying to avoid
this kind of code. Instead, we could create an object map. Like this:

```js
const actionMap = {
  create: () => {
    return {
      created: true,
      message: 'Item created successfully'
    }
  },
  delete: () => {
    return {
      deleted: true,
      message: 'Item deleted successfully'
    }
  },
  update: () => {
    return {
      updated: true,
      message: 'Item updated successfully'
    }
  }
}

const executeActionMap = (action) => {
  if(!Object.keys(actionMap).includes(action)) {
    return {
      error: true,
      message: 'Invalid action'
    };
  }

  return actionMap[action]();
}

console.log(executeActionMap('create'));
```
In this code, we are just creating an object with the different options
as keys. Then, we can just select the action searching in the object by key.

## Summary
This was just a couple of concepts to improve our code, but there is more.
Always remember:
 - Don't use abbreviations.
 - Reduce the complexity of your conditions.
 - Don't repeat yourself
 - Use more destructuring

Thanks. You can see the full code in this [repository](https://github.com/Andres2D/berserk-javascript/blob/main/general/clean-code.js).
