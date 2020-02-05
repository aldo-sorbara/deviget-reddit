import { getPosts } from '../api';

export const fetchPosts = () => ({
  type: 'FETCH_POSTS',
  payload: getPosts(),
});

export const selectPost = post => ({
  type: 'SELECTED_POST',
  payload: { post },
});
