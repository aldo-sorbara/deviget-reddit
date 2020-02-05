import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Drawer, List } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { fetchPosts, dismissAll } from '../../actions';
import { DRAWER_WIDTH, APP_BAR_HEIGHT } from '../../utils/constants';
import Post from '../../components/Post';
import PostDetail from '../../components/PostDetail';
import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  selectedItem: {
    flex: 1,
    marginTop: APP_BAR_HEIGHT,
  },
  list: {
    maxWidth: DRAWER_WIDTH,
    flex: 1,
    height: '100vh',
    overflow: 'auto',
    background: 'black',
    color: 'white',
    padding: 0,
    cursor: 'pointer',
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
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}));

export default function Home() {
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
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open
        classes={{
          paper: classes.drawerPaper,
        }}>
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
      </Drawer>
      <div className={classes.selectedItem}>{selectedPost.id && <PostDetail post={selectedPost} />}</div>
    </div>
  );
}