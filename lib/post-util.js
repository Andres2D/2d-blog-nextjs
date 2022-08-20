import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const postDirectory = path.join(process.cwd(), 'content/posts');

const getPostData = (fileName) => {
  const filePath = path.join(postDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  const postSlug = fileName.replace(/\.md$/, ''); // removes the file extension
  const postData = {
    slug: postSlug,
    ...data,
    content
  };
  return postData;
};

export const getAllPosts = () => {
  const postsFiles = fs.readdirSync(postDirectory);
  const allPosts = postsFiles.map(postFile => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(post => post.isFeatured);
  return featuredPosts;
};
