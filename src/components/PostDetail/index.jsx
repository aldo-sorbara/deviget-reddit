import React, { useState } from 'react';
import clsx from 'clsx';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Link, Typography } from '@material-ui/core/';
import { Favorite } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { API_BASE_URL, DRAWER_WIDTH, APP_BAR_HEIGHT } from '../../utils/constants';
import { selectPost } from '../../actions';
import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  image: {
    height: 170,
    paddingLeft: theme.spacing(2),
  },
  imageNotLoaded: {
    visibility: 'hidden',
  },
  avatar: {
    backgroundColor: 'black',
  },
  cardActions: {
    padding: 16,
  },
  hide: {
    display: 'none',
  },
  saved: {
    color: 'red',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  selectedItem: {
    flex: 1,
    marginTop: APP_BAR_HEIGHT,
  },
}));

export default function PostDetail({ post, open }) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState({});
  const [savedImages, setSaved] = useLocalStorage('savedImages', {});

  return (
    <div
      className={clsx(classes.selectedItem, classes.content, {
        [classes.contentShift]: open,
      })}>
      {post.id ? (
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {post.author.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton
                aria-label="Add to favorites"
                onClick={() => {
                  if (!loaded[post.id]) return;
                  const newImages = {
                    ...savedImages,
                    [post.id]: !savedImages[post.id] && {
                      src: post.thumbnail,
                      url: `${API_BASE_URL}${post.permalink}`,
                    },
                  };
                  setSaved(newImages);
                }}>
                <Favorite className={clsx(savedImages[post.id] && classes.saved)} />
              </IconButton>
            }
            title={
              <Typography variant="body2" color="textSecondary" component="p">
                Posted by {post.author}
              </Typography>
            }
          />
          <img src="/noPhoto.png" alt="no-thumbnail" className={clsx(classes.image, loaded[post.id] && classes.hide)} />
          <a
            href={post.thumbnail}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(!loaded[post.id] && classes.imageNotLoaded)}>
            <img
              src={post.thumbnail}
              alt={post.thumbnail}
              className={classes.image}
              onLoad={() => {
                setLoaded({ ...loaded, [post.id]: true });
              }}
            />
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
      ) : (
        <Typography variant="h5" component="h2">
          No content
        </Typography>
      )}
    </div>
  );
}
