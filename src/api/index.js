import { api } from './config';

export function getPosts() {
  return api.get('r/all/top.json?limit=50');
}
