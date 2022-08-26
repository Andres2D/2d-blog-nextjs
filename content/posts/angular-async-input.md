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

<!-- ![Big input preview](big-input-preview.png) -->

The question is. When we should send the request to the API to get the autocomplete data?

Well, one option is to send the request in every keystroke of the user. But, as frontend developer we need to minimize the request to the backend in order to keep the application optimized. So, what we can do?

Follow this article to find out the solution:

## Creating the input

In the [app.module.ts] let's add the ReactiveFormsModule
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
Now, we can use the ReactiveForms features in our AppComponent


Next step, create the form control in the [app.component.ts] and 
subscribe to valueChanges Observable
```ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bigInput: FormControl = new FormControl('');

  ngOnInit(): void {
    this.bigInput.valueChanges.subscribe((value: string) => {
      console.log('Value: ', value);
    });  
  }
}

```

Finally, let's render the component

```ts
<div class="container">
  <input 
    class="big-input"
    placeholder="Type a text"
    [formControl]="bigInput"
  />
</div>
```

As you can see, we are using the [formControl] attribute to reference the input with the 
control created in the app.component.ts file.

And when we type in the input, we can se the result on the console, something like this

```console
a
an
and
andr
andre
andres
```

Perfect, you just created a functional two way bind data input


