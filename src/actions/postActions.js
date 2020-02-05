import { FETCH_POSTS, DISMISS_POST, DISMISS_ALL, SELECTED_POST } from '../utils/constants';
import { getPosts } from '../api';

export const fetchPosts = params => ({
  type: FETCH_POSTS,
  payload: getPosts(params),
});

export const dismiss = id => ({
  type: DISMISS_POST,
  payload: { id },
});

export const dismissAll = () => ({
  type: DISMISS_ALL,
});

export const selectPost = post => ({
  type: SELECTED_POST,
  payload: { post },
});
