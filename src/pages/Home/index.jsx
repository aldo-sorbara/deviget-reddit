import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Drawer, IconButton, List, Typography } from '@material-ui/core/';
import { ChevronLeft } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { DRAWER_WIDTH, POSTS_LIMIT } from '../../utils/constants';
import { fetchPosts, dismissAll } from '../../actions';
import Post from '../../components/Post';
import PostDetail from '../../components/PostDetail';
import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
    padding: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  loading: {
    display: 'block',
    margin: '8px auto',
    color: 'white',
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  sectionTitle: {
    flex: 1,
    marginLeft: 8,
  },
}));

export default function Home({ open, setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.posts.loading);
  const posts = useSelector(state => state.posts.data);
  const selectedPost = useSelector(state => state.posts.selected);
  const after = useSelector(state => state.posts.after);
  const [readPosts, setRead] = useLocalStorage('readPosts', {});

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap className={classes.sectionTitle}>
            Top Posts
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </div>
        <List
          className={classes.list}
          onScroll={e => {
            if (
              !isLoading &&
              posts.length < POSTS_LIMIT &&
              e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight
            ) {
              dispatch(fetchPosts({ after }));
            }
          }}>
          {posts.map(post => (
            <Post
              key={post.data.id}
              post={post.data}
              read={!!readPosts[post.data.id]}
              setRead={newPost => setRead({ ...readPosts, ...newPost })}
              selected={selectedPost.id === post.data.id}
            />
          ))}
          {isLoading && <CircularProgress className={classes.loading} />}
        </List>
        <div className={classes.dismissAllButton} onClick={() => dispatch(dismissAll())}>
          Dismiss All
        </div>
      </Drawer>
      <PostDetail post={selectedPost} open={open} />
    </div>
  );
}
