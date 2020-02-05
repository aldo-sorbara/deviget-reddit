import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { Avatar, Badge, ListItem, Typography } from '@material-ui/core/';
import { DeleteOutlineOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { selectPost, dismiss } from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'black',
    paddingTop: theme.spacing(2),
    borderTop: '1px solid white',
  },
  listItem: {
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  delete: {
    'textAlign': 'center',
    'padding': theme.spacing(1, 0),
    '&:hover': {
      opacity: 0.7,
    },
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
          <Badge color="secondary" variant="dot" invisible={read}>
            <Avatar aria-label="recipe" variant="square" src={post.thumbnail}>
              {post.author.charAt(0).toUpperCase()}
            </Avatar>
          </Badge>
        </div>
      </ListItem>
      <div className={classes.delete} onClick={() => dispatch(dismiss(post.id))}>
        <DeleteOutlineOutlined />
      </div>
    </div>
  );
}
