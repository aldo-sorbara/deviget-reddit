import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { Avatar, ListItem, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { selectPost, dismiss } from '../../actions';

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px 0',
    borderBottom: '1px solid white',
  },
  listItem: {
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  delete: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    cursor: 'pointer',
  },
  read: {
    opacity: 0.6,
  },
  selected: {
    background: '#292929',
  },
}));

export default function Post({ post, read, setRead, selected }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={clsx(classes.root, selected && classes.selected)}>
      <ListItem
        className={clsx(classes.listItem, read && classes.read)}
        onClick={() => {
          setRead({ [post.id]: true });
          dispatch(selectPost(post));
        }}>
        <div>
          <Typography component="p">{post.title}</Typography>
          <Typography variant="caption" component="p">
            Posted by {post.author}
          </Typography>
        </div>
        <div>
          <Avatar aria-label="recipe" variant="square" src={post.thumbnail}>
            T
          </Avatar>
        </div>
      </ListItem>
      <div className={classes.delete} onClick={() => dispatch(dismiss(post.id))}>
        Dismiss post
      </div>
    </div>
  );
}
