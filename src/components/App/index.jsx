import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, List } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { fetchPosts, dismissAll } from '../../actions';
import Post from '../Post';
import PostDetail from '../PostDetail';
import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  selectedItem: {
    flex: 1,
  },
  list: {
    width: 400,
    background: 'black',
    color: 'white',
    height: '100vh',
    overflow: 'auto',
  },
  listContainer: {
    position: 'relative',
  },
  dismissAllButton: {
    padding: '16px 0',
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'absolute',
    bottom: 16,
    left: 0,
    background: 'white',
    width: '100%',
  },
}));

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.posts.loading);
  const posts = useSelector(state => state.posts.data);
  const selectedPost = useSelector(state => state.posts.selected);
  const [readPosts, setRead] = useLocalStorage('readPosts', {});

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <CircularProgress />;

  return (
    <div className={classes.root}>
      <div className={classes.listContainer}>
        <List className={classes.list}>
          {posts.map(post => (
            <Post
              key={post.data.id}
              post={post.data}
              read={!!readPosts[post.data.id]}
              setRead={newPost => setRead({ ...readPosts, ...newPost })}
              selected={selectedPost.id === post.data.id}
            />
          ))}
        </List>
        <div className={classes.dismissAllButton} onClick={() => dispatch(dismissAll())}>
          Dismiss All
        </div>
      </div>
      <div className={classes.selectedItem}>{selectedPost.id && <PostDetail post={selectedPost} />}</div>
    </div>
  );
}
