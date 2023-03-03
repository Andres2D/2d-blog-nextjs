---
title: 'Using skeletons in Angular'
date: '2022-08-27'
image: angular-skeleton.png
excerpt: Using skeleton for async content. Second approach.
technologies: 'angular'
isFeatured: false
---

In the last [post](https://2d-blog-nextjs.vercel.app/posts/angular-resolvers), we learned how to use resolvers to load asynchronous content in a simple application.
Now, let's use the same example. But, working with skeletons.

## Wait a second. Skeletons?
Yeah, skeletons, it's just a feature that we can implement to show a preview of content before the real content loads.
This content is commonly a grey section, which simulates the shape of the real content on the page. Let's see an example.

![Youtube skeleton](youtube-skeleton.jpeg=744x640)

As you can tell, YouTube uses a skeleton when the real video data is loading.

Now, let's implement this feature in our articles project. Firstly, let's review the current behavior
when we go to the `localhost:4200/fake-page` route.

![Without skeleton](without-skeleton.gif=560x732)

As you can see, there is a moment while the data is being resolved from the API (in this case I just use a `setTimeout` to simulate the backend delay)
where the page doesn't show anything. Consequently, we are creating a bad experience for the user.

## Implementing skeletons
To implement the skeletons in an application, we should be aware of what the real content looks like.
Next, we create a structure of `div` or other HTML tags that fits with the real content.

Let's do it.

In the `fake-page.component.html` let's add the skeleton section after the real content:
```markup
<!-- Real content -->
<section class="container">
  <h1>{{articleContent.title}}</h1>
  <article class="article">
    {{articleContent.content}}
  </article>
  <p class="author">- by {{articleContent.author}}</p>
</section>

<!-- Skeleton content -->
<section class="container skeleton">
  <div class="title-skeleton"></div>
  <div class="content">
    <div class="text-skeleton"></div>
    <div class="author-skeleton"></div>
  </div>
</section>
```
In this code, we just replace the `<h1>`,`<article>` & `<p>` tags for `<div>` tags.
Meanwhile, in the `fake-page.component.scss` code:
```scss
.skeleton {
  .title-skeleton {
    width: 214px;
    height: 25px;
    margin-bottom: 30px;
    margin-top: 30px;
    border-radius: 4px;
    background-color: #EEEEF0;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
    .text-skeleton {
      width: 500px;
      height: 15px;
      background-color: #EEEEF0;
      border-radius: 4px;
      margin: 4px 0 4px 0;
    }
    
    .author-skeleton {
      border-radius: 4px;
      width: 130px;
      height: 15px;
      margin-top: 20px;
      background-color: #EEEEF0;
    }
  }
}
```

In this example, we are just converting `div` boxes into skeleton boxes using static `width` & `height` properties.
But, feel free to add your own values in `%`, `rem`.

With this code, the skeleton should look something like this:

![Basic skeleton](skeleton-base.png=560x290)

And, let's create an array in the `fake-page.component.ts` component to simulate multiple lines in the content.

```ts
skeletonContent: Array<any> = Array.from({length: 21});
```

And in the skeleton HTML let's update the `class='text-skeleton'` div
```markup
<div class="text-skeleton" *ngFor="let item of skeletonContent">
</div>
```


Now, if we compare the real content with the skeleton, we get:

![Comparison skeleton](skeleton-comparison.png=1075x373)

Finally, let's add some logic to decide if we load the real content or the skeleton.
Remember that we show the skeleton when we don't have the backend response yet.
Then, when we got the data, we should hide the skeleton and show the real content.

In the `fake-page.component.ts` let's add a getter:
```ts
get hasContent() {
  const { 
    title,
    content,
    author
  } = this.articleContent;
  return (title === '' || content === '' || author === '') ? false : true;
}
```
This method reviews if the backend data is loaded or not yet.

Now, in the `fake-page.component.html` file:
```markup
<section class="container" *ngIf="hasContent; else skeleton">
  <h1>{{articleContent.title}}</h1>
  <article class="article">
    {{articleContent.content}}
  </article>
  <p class="author">- by {{articleContent.author}}</p>
</section>

<ng-template #skeleton>
  <section class="container skeleton">
    <div class="title-skeleton"></div>
    <div class="content">
      <div class="text-skeleton" *ngFor="let item of skeletonContent"></div>
      <div class="author-skeleton"></div>
    </div>
  </section>
</ng-template>

```
In line 1, we add `*ngIf="hasContent; else skeleton"` an if-else condition.
If there is content, show the real content section, else show the skeleton section.

The final feature should look like this:

![With skeleton](with-skeleton.gif=560x732)

## Summary
We learned how to implement skeletons in a simple application, using div as a display block.
You can find the full code [here](https://github.com/Andres2D/berserk-angular/tree/skeletons).
