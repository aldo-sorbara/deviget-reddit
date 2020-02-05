import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, ListItem, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { selectPost, dismiss } from '../../actions';

const useStyles = makeStyles(() => ({
  listItem: {
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  delete: {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    cursor: 'pointer',
  },
}));

export default function Post({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <ListItem
        key={post.data.id}
        className={classes.listItem}
        onClick={() => {
          dispatch(selectPost(post.data));
        }}>
        <div>
          <Typography component="p">{post.data.title}</Typography>
          <Typography variant="caption" component="p">
            Posted by {post.data.author}
          </Typography>
        </div>
        <div>
          <Avatar aria-label="recipe" variant="square" src={post.data.thumbnail}>
            T
          </Avatar>
        </div>
      </ListItem>
      <div className={classes.delete} onClick={() => dispatch(dismiss(post.data.id))}>
        Dismiss post
      </div>
    </div>
  );
}
