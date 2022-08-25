---
title: 'Async Input with Angular & RXJS'
date: '2022-08-27'
image: angular-async-input.png
excerpt: Creating an async input with Angular and RXJS Observables.
isFeatured: true
---

Let's create an async input using Angular and RXJS

## First let's see whats is the problem to solve
Imagine that you have an input in your we page to consult against a large database of names. Now, when the user types in the input we should show an autocomplete list according with the text provided by the user.

![Big input preview](big-input-preview.png)

The question is. When we should send the request to the API to get the autocomplete data?

Well, one option is to send the request in every keystroke of the user. But, as frontend developer we need to minimize the request to the backend in order to keep the application optimized. So, what we can do?



