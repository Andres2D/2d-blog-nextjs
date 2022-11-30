---
title: 'Using resolvers in Angular'
date: '2022-08-27'
image: angular-resolvers.png
excerpt: Using resolvers in angular. Loading content first approach.
technologies: 'angular'
isFeatured: false
---

Let's explain how to use a resolver with a basic Angular application.

## What's the matter?
Well, frequently our pages get the content from an API, and the API response takes some time.
Therefore, we are forced to use a loading page or spinner while the data is completely resolved.

However, there is another way to handle this behavior.

## Using resolvers
Angular has this amazing feature called `resolver` which helps us to handle the time between the redirection to a page
and the resolution of the necessary data to render the page.

Angular prevents the load of the page until the data is completely resolved. Thus, our component is always first rendered with
all the data.

## Let's see it in action.
In this example, I'll be using a main page with a button that redirects to another page with fake content.

![Basic redirect](gif-initial.gif)

First, we need to create a new resolver in our Angular application.
Run the following command:
```bash
$ ng n resolver article
```

Then, the new resolver should look like this

```ts
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverResolver implements Resolve<boolean> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}

```
As you can see, it's just a service class which implements a `Resolve` class with the resolve `method`.
By default, the resolve is of type `Observable`. But, you could return a `Promise` too.
In addition, the resolve method has the `route` and `state` parameters in case you need to use them.
For example, to get a param id or get the current state.

However, we don't need to use them. So, replace the code with:

```ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { article } from './constants/article-mock';
import { Article } from './interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<Article> {
  resolve(): Observable<Article> {
    return of(article).pipe(
      delay(2000)
    );
  }
}
```
In this example, it's quite simple. We get rid of all the useless imports.
And, we are returning and `Observable` with the `of` operator with a mock data set 
that contains an object with `{title: string; content: string; author: string}`.
But, in a real application, you should return the API request.

Also, we are using the `pipe` and the `delay` operators to simulate a slow request to the backend
in order to show you how the new page wouldn't be rendered until this resolve is finished.


Now, let's utilize this new resolver.
In the `app-routing.module.ts` file, let's add a configuration in our component `Route`

```ts
import { ArticleResolver } from './article.resolver';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'fake-page',
    component: FakePageComponent,
    resolve: { article: ArticleResolver }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/main'
  }
];
```
In short, we are only adding a `resolve` property in the `fake-page` configuration, which it's just
with our resolve class in and object with any name, in this case article

Now, if we try to navigate to `localhost:4200/fake-page`, this redirection should take 2 seconds. Due to the `delay(2000)`.

![Basic redirect](gif-second.gif)

Next, let's get the data from the `fake-page.component.ts` file:

```ts
export class FakePageComponent implements OnInit {

  article?: Article;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const { article } = this.activatedRoute.snapshot.data;
    this.article = article;
  }
}
```
To achieve this, we need to inject `ActivatedRoute` because it is in this class where our resolved data lives.

And, in order to get the resolved data, we can destructure it from `const { article } = this.activatedRoute.snapshot.data;` 
because we name it article in the routing configuration.

Finally, we only need to render the content of our page in the `fake-page.component.html` file:

```markup
<section class="container">
  <h1>{{article?.title}}</h1>
  <article class="article">
    {{article?.content}}
  </article>
  <p class="author">- by {{article?.author}}</p>
</section>
```

And this should be the final behavior.

![Basic redirect](gif-final.gif=560x732)

## Summary
We just learned how to implement the resolve Class in a simple Angular application.
We learn, that we only prevent the new page from being redirected until the asynchronous data is resolved.
You can find the repository of this example in [here](https://github.com/Andres2D/berserk-angular/tree/resolver).

References:
* [resolver](https://angular.io/api/router/Resolve)
* [delay](https://rxjs.dev/api/operators/delay)
