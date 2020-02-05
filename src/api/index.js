import { api } from './config';
import { POSTS_LIMIT_PER_PAGE } from '../utils/constants';

export function getPosts(params = {}) {
  return api.get('r/all/top.json', { params: { ...params, limit: POSTS_LIMIT_PER_PAGE } });
}
