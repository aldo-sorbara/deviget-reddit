import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, List } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { fetchPosts } from '../../actions';
import Post from '../Post';
import PostDetail from '../PostDetail';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  selectedItem: {
    flex: 1,
  },
  list: {
    maxWidth: 400,
    background: 'black',
    color: 'white',
  },
}));

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.posts.loading);
  const posts = useSelector(state => state.posts.data);
  const selectedPost = useSelector(state => state.posts.selected);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <CircularProgress />;

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </List>
      <div className={classes.selectedItem}>{selectedPost.id && <PostDetail post={selectedPost} />}</div>
    </div>
  );
}
