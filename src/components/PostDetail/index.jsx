import React from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, Link, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { API_BASE_URL } from '../../utils/constants';
import { selectPost } from '../../actions';

const useStyles = makeStyles(() => ({
  listItem: {
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
}));

export default function PostDetail({ post }) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.author.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="body2" color="textSecondary" component="p">
            Posted by {post.author}
          </Typography>
        }
      />
      <a href={post.thumbnail} target="_blank" rel="noopener noreferrer">
        <img src={post.thumbnail} alt={post.thumbnail} />
      </a>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          3 hours ago - {selectPost.num_comments} comments
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link color="primary" target="_blank" href={`${API_BASE_URL}${post.permalink}`}>
          SEE ORIGINAL POST
        </Link>
      </CardActions>
    </Card>
  );
}
