import { getPosts } from '../api';

export const fetchPosts = () => ({
  type: 'FETCH_POSTS',
  payload: getPosts(),
});

export const dismiss = id => ({
  type: 'DISMISS_POST',
  payload: { id },
});

export const dismissAll = () => ({
  type: 'DISMISS_ALL',
});

export const selectPost = post => ({
  type: 'SELECTED_POST',
  payload: { post },
});
