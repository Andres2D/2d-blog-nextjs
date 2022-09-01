---
title: 'Customizing an avatar with React'
date: '2022-08-31'
image: react-custom-avatar.png
excerpt: Customize your own avatar with React.
isFeatured: true
---

We'll create a react project to customize a profile avatar image. This avatar will be rendered as a card, and we will be able to customize some graphical aspects such as the pose and expressions with a basic form.We are going to use the [avatar-generator](https://getavataaars.com/) API. This API receives query parameters to return a specific character. You can see the final result [here](https://github.com/Andres2D/berserk-react/tree/custom-avatar).

Let's begin.


First, let's analyze the requirements to render an avatar.
To request an avatar, we just need to get from this base url `https://avataaars.io/?avatarStyle=Transparent` then we send query parameters
to set the avatar properties. For example:

* To set the hair style: `topType=value`
* To set the hair color: `hairColor=value`
* To set the clothing type: `clotheType=value`
* To set the eye type: `eyeType=value`
* To set the mouth type: `mouthType=value`

Now, let's build our setting card.

First, we build our `form.js` component:

```js
import { useEffect, useState } from 'react';

const Form = (props) => {

  const [form, setForm] = useState({
    topType: 'ShortHairShortFlat',
    hairColor: 'Black',
    eyeType: 'Default',
    mouthType: 'Default',
    clotheType: 'Hoodie',
  });

  return <p>form</p>;
}

export default Form;

```
As you can see in the code above, we define a state to manage the form values, but you could use
`useRef` or a hook to manage them.

Every state key should correspond to the queryParams specifications for the avatar in order to match the values
in advance.

Now, let's return the JSX code:

```jsx
  return (
    <form className={styles.form}>
      <div className={styles.group}>
        <label>Hair</label>
        <select 
          className={styles.selector}
          onChange={changeHandler} 
          name='topType'
          value={form.topType}
        >
          <option value='ShortHairTheCaesar'>Short</option>
          <option value='ShortHairDreads01'>Medium</option>
          <option value='LongHairBigHair'>Long</option>
        </select>
      </div>
      <div className={styles.group}>
        <label>Hair color</label>
        <select 
          className={styles.selector}
          onChange={changeHandler} 
          name='hairColor'
          value={form.hairColor}
          >
          <option value='Black'>Black</option>
          <option value='Blonde'>Blonde</option>
          <option value='Red'>Red</option>
        </select>
      </div>
      <div className={styles.group}>
        <label>Eyes</label>
        <select 
          className={styles.selector}
          onChange={changeHandler} 
          name='eyeType'
          value={form.eyeType}
        >
          <option value='Default'>Neutral</option>
          <option value='Close'>Close</option>
          <option value='Wink'>Wink</option>
        </select>
      </div>
      <div className={styles.group}>
        <label>Mouth</label>
        <select 
          className={styles.selector}
          onChange={changeHandler} 
          name='mouthType'
          value={form.mouthType}
        >
          <option value='Smile'>Smile</option>
          <option value='Serious'>Serious</option>
          <option value='Default'>Neutral</option>
        </select>
      </div>
      <div className={styles.group}>
        <label>Clothes</label>
        <select 
          className={styles.selector}
          onChange={changeHandler} 
          name='clotheType'
          value={form.clotheType}
        >
          <option value='Hoodie'>Hoodie</option>
          <option value='ShirtCrewNeck'>Shirt</option>
          <option value='BlazerSweater'>Blazer</option>
        </select>
      </div>
    </form>
  );
```

As you see, I'm repeating the select inputs and matching the values with the state keys.
It's better to use an isolated component to manage the select functionality, but in this
basic example it's OK.

Now, let's create the `changeHandler` method

```jsx
const changeHandler = (evt) => {
  setForm(current => {
    return {
      ...current,
      [evt.target.name]: evt.target.value
    }
  });
};
```
The spread operator is used to update the specific key state but without deleting the other keys.
This is an approach to managing forms in React

Finally, let's communicate these state changes to the parent component through props:

```jsx
useEffect(() => {
  props.onUpdate(form);
}, [form, props]);
```

We need to use `useEffect` hook to emit every state change.

Now let´s work on the main `avatar.js` component:

```jsx
import { useState } from 'react';
import styles from './avatar.module.css';
import Form from './form';

const Avatar = () => {

  const updateAvatarHandler = (queries) => {
    // set avatar
  }

  return (
    <div className={styles.card}>
      <img 
        className={styles.image}
        alt='avatar'
        src=''
      />
      <Form 
        onUpdate={updateAvatarHandler}
      />
    </div>
  );
};

export default Avatar;
```

This component is pretty simple. We just rendered a card with an image tag and the `form.js` component.
So far, it looks like this:

![Avatar card](avatar-card-1.png=534x656)

Finally, let's add the logic to render the avatar.

First, let's add an initial avatar, creating a default url:

```jsx
const defaultAvatar = `https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&hairColor=Black&clotheType=Hoodie&eyeType=Default&mouthType=Default`;

```

And, we should create a state to manage the image src:

```jsx
  const [avatar, setAvatar] = useState(defaultAvatar);
```

Then, in the `<img />` tag:

```jsx
<img 
  className={styles.image}
  alt='avatar'
  src={avatar}
/>
```

Now, the card should look like this:

![Avatar card](avatar-card-2.png=534x656)

To finish, let's add some logic in the `updateAvatarHandler` method:

```jsx
const updateAvatarHandler = (queries) => {
  const newQueryArr = Object.entries(queries).map((query) => {
    return `${query[0]}=${query[1]}`;
  });
  setAvatar(`https://avataaars.io/?avatarStyle=Transparent&clotheColor=Blue03&${newQueryArr.join('&')}`);
}
```

In this method, we are receiving an object with the keys and values needed to set the avatar through queryParams: So we just need to use `Object.entries` to get an array and the `.map()` method to evaluate the values and create a new array for each queryParam.

To finish, we call `setAvatar` method to update the src element in the image, and, using the .join method in the new array, we convert the array to a string separated by the `&` symbol in order to separate the different queryParams.

That's all. The final app should work like this:

![Avatar card](final-result.gif=534x656)

## Summary
In this project, we learned how to create a basic application
to customize an avatar using React and [avatar-generator](https://getavataaars.com/)

You can find the code [here](https://github.com/Andres2D/berserk-react/tree/custom-avatar)
