import { POSTS_LIMIT_PER_PAGE } from '../utils/constants';
import { api } from './config';

export function getPosts(params = {}) {
  return api.get('r/all/top.json', { params: { ...params, limit: POSTS_LIMIT_PER_PAGE } });
}
