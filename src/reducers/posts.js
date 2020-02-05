import { FETCH_POSTS, DISMISS_POST, DISMISS_ALL, SELECTED_POST } from '../utils/constants';

const defaultPosts = { loading: false, data: [], selected: {} };

export default (state = defaultPosts, action) => {
  switch (action.type) {
    case `${FETCH_POSTS}_PENDING`: {
      return { ...state, loading: true };
    }

    case `${FETCH_POSTS}_FULFILLED`: {
      const { data } = action.payload.data;
      return {
        ...state,
        loading: false,
        data: [...state.data, ...data.children],
        after: data.after,
      };
    }

    case DISMISS_POST: {
      return {
        ...state,
        data: state.data.filter(post => post.data.id !== action.payload.id),
      };
    }

    case DISMISS_ALL: {
      return { ...state, ...defaultPosts };
    }

    case SELECTED_POST: {
      const { post } = action.payload;
      return {
        ...state,
        selected: state.selected.id === post.id ? {} : post,
      };
    }

    default:
      return state;
  }
};
