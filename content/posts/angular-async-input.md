---
title: 'Async Input with Angular & RXJS'
date: '2022-08-27'
image: angular-async-input.png
excerpt: Creating an async input with Angular and RXJS Observables.
isFeatured: true
---

Let's create an async input using Angular and `rxjs`

## First, let's see what the problem is 
Imagine that you have an input in your web page to consult against a large database of names. When the user types in the input, we should show an autocomplete list according to the text provided by the user.

The question is, When should we send the request to the API to get the autocomplete data?

Well, one option is to send the request with every keystroke of the user. But, as frontend developers, we need to minimize the requests to the backend in order to keep the application optimized. So, what can we do?


Follow this article to find out the solution:

## Creating the input

In the `app.module.ts` let's add the ReactiveFormsModule
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
Now, we can use the ReactiveForms features in our `AppComponent`


Next step, create the form control in `app.component.ts` and 
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

As you can see, we are using the `formControl` attribute to reference the input with the 
control created in the `app.component.ts` file.

And when we type in the input, we can see the result on the console, something like this

```console
a
an
and
andr
andre
andres
```
Perfect, you just created a functional two-way bound data input.


## Using rxjs operators
As we can see in the last picture, the user types "Andres". Then, we want to send the request to the backend when the user stops typing.
So, how do we know that the user has stopped typing? Well, it is here where `rxjs` helps.


First, let's import two methods into our `app.component.ts` file:
```ts
import { debounceTime, distinctUntilChanged } from 'rxjs';
```

* debounceTime:
This operator only emits the most recent emission after a delay time. We define the delay time.
This operator is very useful because we only need the word 'andres'. We don't need 'a' or 'an' or 'and'.


* distinctUntilChanged:
This operator avoids getting repeated values between emissions. Hence, if we already requested data from 'andres' and the user deleted the 's' and immediately added the 's' again, we don't want to create the request again, right?.

## Applying the operators
Now, these operators are going to be applied to the `valueChanges` subscription. Like this:

```ts
 this.bigInput.valueChanges
    .pipe(
      debounceTime(2000),
      distinctUntilChanged()
    )
    .subscribe((value: string) => {
      console.log(value);
    });
```
As you can see, we are adding the `pipe` method before the subscription to apply the rxjs operators.
Also, we are setting the `debounceTime` with a time of `2000`, which means 2 seconds.

Eventually, if we try to fill the input again with the word 'andres' after 2 seconds, we will see in the console:

```console
andres
```
a single log.

That's perfect. We just created an async input and now we can send the request to the backend.

Finally, in the subscribe, let's add some basic validation: 

```ts
ngOnInit(): void {
  this.bigInput.valueChanges
  .pipe(
    debounceTime(2000),
    distinctUntilChanged()
  )
  .subscribe((value: string) => {
    if(!value || value.trim() === ''){
      return;
    }
    // create fetch to backend in here
  });
}
```

## Summary
Well, that's all folks.
We learn how to create an async input in Angular using subscription operators.
You can find the [repository](https://github.com/Andres2D/async-input-angular) with all this code implemented.

Please go to the 'contact' section if you have any input about this article.
Happy Coding.


References:
* [debounceTime](https://rxjs.dev/api/operators/debounceTime)
* [distinctUntilChanged](https://rxjs.dev/api/operators/distinctUntilChanged)
