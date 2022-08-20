import AllPosts from '../../components/posts/all-posts';

const DUMMY_POSTS = [
  {
    title: 'Getting Started with NextJS',
    slug: 'getting-started-with-next-js',
    image: 'getting-started-with-next-js.png',
    date: '2022-08-19',
    excerpt: `Next JS is the react framework for production - 
    it makes building fullstack React apps and sites a breeze and ships with built-in SSR.`
  },
  {
    title: 'Getting Started with NextJS',
    slug: 'getting-started-with-next-js2',
    image: 'getting-started-with-next-js.png',
    date: '2022-08-19',
    excerpt: `Next JS is the react framework for production - 
    it makes building fullstack React apps and sites a breeze and ships with built-in SSR.`
  },
  {
    title: 'Getting Started with NextJS',
    slug: 'getting-started-with-next-js3',
    image: 'getting-started-with-next-js.png',
    date: '2022-08-19',
    excerpt: `Next JS is the react framework for production - 
    it makes building fullstack React apps and sites a breeze and ships with built-in SSR.`
  },
  {
    title: 'Getting Started with NextJS',
    slug: 'getting-started-with-next-js4',
    image: 'getting-started-with-next-js.png',
    date: '2022-08-19',
    excerpt: `Next JS is the react framework for production - 
    it makes building fullstack React apps and sites a breeze and ships with built-in SSR.`
  }
];

const AllPostsPage = () => {
  return (
    <AllPosts posts={DUMMY_POSTS} />
  );
};

export default AllPostsPage;
