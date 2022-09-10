---
title: 'Angular infinite scroll'
date: '2022-09-09'
image: angular-infinite-scroll.png
excerpt: Create a infinite scroll to load your content.
technologies: 'angular'
isFeatured: true
---

When you are working on a page with a lot of content to show, such as a list of news or a list of books or posts, you probably don't want to load all your content at the same time. Thus, you may want to load the content by sections. However, a pagination system could be great here.

However, pagination is a complex feature to implement in the backend and frontend, and having a page selector adds  more work for the user when they are trying to navigate through the content.

On the other hand, we could implement something called `infinite scroll`. This feature, allow the user to go through your page loading the content when is scrolling down. Facebook, Twitter & Instagram use infinite scroll in order to show the content in the application.

Now, let's implement this feature in Angular.

# The base code

The application is very simple; we only have a list of cards displaying a sequence of numbers:

```ts
export class AppComponent implements OnInit {
  title = 'Infinite scroll';

  content: number[] = [];

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    Array.from({length: 10}).forEach(() => {
      this.content.push(this.content.length + 1);
    });
  }
}
```

```markup
<div class="container">
  <div class="card" *ngFor="let number of content">
    {{number}}
  </div>
</div>
```

![Without infinite scroll](sample-app.gif=560x732)

So far, it finished at number 10. However, the idea is to load new content when the user scrolls down. 

Let's do it.

# The HostListener

Firstly, let's add a decorator [@HostListener](https://angular.io/api/core/HostListener#description) function in the `app.component.ts` file in order to listen to a DOM event, the `window:scroll` event.
Then, inside of the function, let's print the following values:

```ts
@HostListener('window:scroll')
onWindowsScroll() {
  console.log(window.innerHeight);
  console.log(window.scrollY);
  console.log(document.body.scrollHeight);
}
```

We have access to the values because they are part of the global object of JavaScript, which is called window in the browser.

And we got:

![Global object consoles](consoles.gif=600x603)

# The calculation

As you can see, the last 3 values are: `innerHeight: 696`, `scrollY: 370` & `scrollHeight: 1050`.
Then, if we sum `innerHeight` and `scrollY` we get: `1060` when the scroll is at the bottom of the page.

With these numbers, we could know that if `innerHeight + scrollY > scrollHeight` we need to request more data.
So let's add this condition.

```ts
import { Component, HostListener, OnInit } from '@angular/core';
...
@HostListener('window:scroll')
onWindowsScroll() {
  if(window.innerHeight + window.scrollY >= document.body.scrollHeight){
    console.log('Send request');
    this.loadContent();
  }
}
```

Let us demonstrate: 

![Infinite scroll](infinite-scroll.gif=600x603)

You can notice that the scroll resizes due to the change in the `scrollHeight` because we are loading more content to the page.

# Summary

We just implemented an infinite scroll using just a decorator from `@angular/core`. This feature is a good alternative to the 
old pagination approach.

Give it a shot.

You can see the full code in this [repository](https://github.com/Andres2D/berserk-angular/tree/infinite-scroll).
