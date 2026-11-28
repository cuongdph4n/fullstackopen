const _ = require("lodash");

const dummy = (_blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return blogs[0].likes;

  return blogs.reduce((totalLikes, item) => totalLikes + item.likes, 0);
};

const likesfavoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  if (blogs.length === 1) return blogs[0];

  const likeList = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...likeList);

  return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 };

  const authors = _.countBy(blogs, "author");

  const topAuthor = _.maxBy(_.toPairs(authors), ([_author, count]) => count);

  return { author: topAuthor[0], blogs: topAuthor[1] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  if (blogs.length === 1) return { author: blogs[0].author, likes: 1 };

  const authors = _.groupBy(blogs, "author");

  const authorLikes = Object.entries(authors).map(([author, blogs]) => ({
    author,
    likes: _.sumBy(blogs, "likes"),
  }));

  return _.maxBy(authorLikes, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  likesfavoriteBlog,
  mostBlogs,
  mostLikes,
};
