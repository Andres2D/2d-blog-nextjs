---
title: 'Angular custom paginator'
date: '2023-03-02'
image: angular-custom-paginator.png
excerpt: Creating a custom paginator in Angular.
technologies: 'angular'
isFeatured: true
---

In this article, we'll create a custom paginator using just Angular components. Before starting, please read the **drawbacks** in case this is not the best approach for your project.


## Drawbacks:
* This is a custom approach, which means that you are responsible for making the necessary modifications in order to make it fit into your project.
* This approach is decoupled from the same implementation, which means that you need to create the logic to manage the pages content. However, I'll be adding an example about it. 

Let's start with the paginator implementation.

1. First, let's create a new project:

  ```bash
  > ng new my-app
  ```

2. Now let's create two components:

  ```bash
  > ng g c components/paginator
  > ng g c components/paginator/page-button
  ```
The ```page-button``` component will be just for the layout of a single page button component, while the ```paginator``` component will be responsible for controlling the pagination logic.

3. Creating the button component:

This component will be responsible for managing all the possible states of a page button, like selected, disabled, or even if it is an arrow or a dots button and not a number. Let's see how to create it:

```page-button.component.html```
```html
<button 
  type="button"
  class="pageButton"
  [ngClass]="{
    'current': current,
    'dots': dots,
    'right': rightArrow,
    'left': leftArrow,
    'disabled': disabled
  }"
  [disabled]="disabled"
  (click)="onClick()"> 
  {{ number }}
</button>
```

```page-button.component.ts```
```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-button',
  templateUrl: './page-button.component.html',
  styleUrls: ['./page-button.component.scss']
})
export class PageButtonComponent {
  @Input() current?: boolean = false;
  @Input() dots?: boolean = false;
  @Input() number?: number;
  @Input() disabled?: boolean = false;
  @Input() rightArrow?: boolean = false;
  @Input() leftArrow?: boolean = false;

  @Output() clickEvent = new EventEmitter<number>();

  onClick(): void {
    this.clickEvent.emit(this.number);
  }
}
```

This component is a presentational component, which means it won't have any kind of logic, It will just display information based on the input data.

You could find all the code for this component, including the ```scss```, in [here.](https://github.com/Andres2D/berserk-angular/tree/paginator/src/app/paginator/page-button)

At the end, we could test all the possible states of the buttons, and it should look like this:

![page-button-preview](page-button-preview.gif=600x352)

4. Creating the paginator component

Now, let's create the paginator component, in which we'll be using the ```page-button``` component.
This graph shows how the paginator component will work:

![page-button-preview](paginator-arch.png=318x307)

Now, let's translate this to code:

```paginator.component.html```
```html
<app-page-button 
  [leftArrow]="true"
  [disabled]="currentPage === 1"
  (clickEvent)="goToPageFromArrow('left')"
></app-page-button>
<ng-container *ngFor="let page of pagesToShow">
  <app-page-button 
    [number]="page !== -1 ? page : undefined"
    [dots]="page === -1"
    [current]="page === currentPage"
    (clickEvent)="goToPage($event)"
  ></app-page-button>
</ng-container>
<app-page-button 
  [rightArrow]="true"
  [disabled]="currentPage === pages"
  (clickEvent)="goToPageFromArrow('right')"
></app-page-button>
```

Here, I'm also creating a little bit of logic, like controlling the disabled status for the arrows
when the currentPage reaches the minimum limit for the left arrow and the maximum limit for the right arrow.

Moreover, I'm using ```-1``` in order to know if I want to show dots. Let's review all this logic on the ```paginator.component.ts``` component.

Let's start with the ```@Input``` and ```@Output``` data:

```paginator.component.ts```
```ts
  @Input() pages: number = 0;
  @Input() currentPage: number = 0;
  @Input() visiblePages: number = 0;
  
  @Output() gotToPageEvent = new EventEmitter<number>();
```
We'll receive the following data:

* ***pages:*** An integer number of pages that represents the number of pages of your content.
* ***currentPage:*** Remember that the logic of the pagination will depend on the component that implements the paginator. Thus, we'll be getting the current page.
* ***visiblePages:*** The visible pages will be a number that indicates the maximum number of pages to show. If the number of pages is greater than the number of visible pages, we'll be using the dots feature.

Now, we need to define the initial data:

```ts
fullPagesList: number[] = [];
pagesToShow: number[] = [];
pagesDifferential = 0;

ngOnInit(): void {
  this.pagesDifferential = Math.floor(this.visiblePages / 2);
  this.fullPagesList = Array.from({length: this.pages}).map((_, i) => i+1);
  this.definePagesButtons(this.currentPage);
}
```

I'm defining some global variables in order to manage the state of the paginator.
Then, on the ```OnInit``` I'm calculating the differential pages in order to know into how many parts I should split the pages.

Also, I'm creating an array using the ```Array.from``` function in order to generate an array based on a number.

```ts
Array.from({length: 3}).map((_, i) => i+1); // ===> [1,2,3]
```

Finally, I'm calling the ```definePageButtons``` function with the current page:

```ts
definePagesButtons(page: number): void {
  if(this.pages > this.visiblePages) {
    let pagesArray = [...this.fullPagesList];

    pagesArray = [...pagesArray.slice(page - 1, pagesArray.length)];

    if(pagesArray.length > this.visiblePages) {
      pagesArray = [
        ...pagesArray.splice(0, this.pagesDifferential), 
        -1, 
        ...pagesArray.splice(pagesArray.length - this.pagesDifferential, pagesArray.length)
      ];
      this.pagesToShow = pagesArray;
    } else if(pagesArray.length === this.visiblePages) {
      pagesArray = [
        -1, 
        ...pagesArray.splice(0, this.pagesDifferential), 
        ...pagesArray.splice(pagesArray.length - this.pagesDifferential, pagesArray.length)
      ];
      this.pagesToShow = pagesArray;
    }
  } else {
    this.pagesToShow = [...this.fullPagesList];
  }
}
```

This function will be responsible for defining how the data will look to the ```*ngFor```.

There´s an example of a possible output:

```ts
// pages: 10,
// visiblePages: 4,
this.definePagesButtons(1);
// output: [1,2,-1,9,10]
```

As I mentioned before, the ```-1``` will render the dots variation on the ```page-button``` component.

Last, but not least, we need to define a couple of public functions in order to call the necessary process after clicking on a page button.

```ts
goToPage(page: number): void {
  if(!page) return;
  this.gotToPageEvent.emit(page);
  this.definePagesButtons(page);
}

goToPageFromArrow(arrow: 'left' | 'right'): void {
  if(arrow === 'left') {
    this.gotToPageEvent.emit(this.currentPage - 1);
    this.definePagesButtons(this.currentPage - 1);
  } else {
    this.gotToPageEvent.emit(this.currentPage + 1);
    this.definePagesButtons(this.currentPage + 1);
  }    
}
```

These functions are too basic; ```goToPage``` will be called after clicking on a specific page number.
And ```goToPageFromArrow``` will be called after clicking on an arrow button. And the process is just controlling the current page variable.

You can see the entire code for this component, including the ```scss``` in [here.](https://github.com/Andres2D/berserk-angular/tree/paginator/src/app/paginator).

1. Implementing the paginator

Now, we could implement the paginator from another component. I'l be using the ```app.component``` to call it.

```app.component.html```
```html
<app-paginator 
  [pages]="10"
  [currentPage]="1"
  [visiblePages]="4">
</app-paginator>
```

Then, the component should look like this:

![paginator-bad-preview](paginator-bad-preview.gif=600x287)

As you can tell, the layout looks good. However, it is not working properly. That's because we haven't added the pagination logic to ```app.component```.

```ts
export class AppComponent implements OnInit {
  title = 'paginator';
  pages: number = 0;
  currentPage: number = 1;

  ngOnInit(): void {
    this.pages = 10;
  }

  changePage(page: number): void {
    if(page === this.currentPage) {
      return;
    }
    this.currentPage = page;
  }
}
```

```html
<app-paginator 
  [pages]="pages"
  [currentPage]="currentPage"
  [visiblePages]="4"
  (gotToPageEvent)="changePage($event)">
</app-paginator>
```

Now, it should work just fine:

![paginator-good-preview](paginator-good-preview.gif=600x287)

1. Finally, let's implement the paginator with real content management:

I'm going to test this feature using just a collection of boxes. Like this:

```html
<div class="container">
  <section class="content">
    <ng-container *ngFor="let box of contentToShow">
      <div class="box">Box {{box}}</div>
    </ng-container>
  </section>
  <app-paginator 
    [pages]="pages"
    [currentPage]="currentPage"
    [visiblePages]="2"
    (gotToPageEvent)="changePage($event)">
  </app-paginator>
</div>
```

I'm just iterating over a list and displaying ```divs``` with a simple design:

```ts
export class AppComponent implements OnInit {
  title = 'paginator';
  pages: number = 0;
  contentPerPage = 4;
  currentPage: number = 1;
  content = Array.from({length: 20}).map((_, i) => i+1);
  contentToShow: number[] = [];

  ngOnInit(): void {
    this.pages = Math.floor(this.content.length / this.contentPerPage);
    this.contentToShow = [...this.content].splice(0, this.contentPerPage);
  }

  changePage(page: number): void {
    if(page === this.currentPage) {
      return;
    }
    this.contentToShow = [...this.content].splice((this.contentPerPage * page) -  this.contentPerPage, this.contentPerPage);
    this.currentPage = page;
  }
}

```

Also, I'm using simple logic to choose which part of the entire content should be displayed.
With this simple code:
```ts
this.contentToShow = [...this.content].splice((this.contentPerPage * page) -  this.contentPerPage, this.contentPerPage);
```

Then, the final app should look something like this:

![paginator-implementation](paginator-implementation.gif=600x553)

## Summary
* We just created a nice paginator component using just angular components.
* This approach can be adapted for any kind of implementation, due to the fact that the main logic can be adapted for any kind of source content. Like:
  * Static content.
  * Content from APIs that uses pagination systems from backend.
  * Implementations with observables to manage data persistence.

## Final thoughts

This code is an initial purpose for a pagination system, which means the source code could change in the future in order to improve the implementation. Please, clone the repository and try to improve this code. All the information about this implementation can be found [here.](https://github.com/Andres2D/berserk-angular/tree/paginator)
