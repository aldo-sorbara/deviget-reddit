import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { IconButton, Typography, AppBar, Toolbar } from '@material-ui/core/';
import { Menu, PhotoLibraryOutlined, DescriptionOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flex: 1,
  },
  appBar: {
    background: 'black',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  selectedItem: {
    flex: 1,
    marginTop: 64,
  },
  image: {
    height: 170,
    padding: 16,
    margin: 16,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
}));

export default function Gallery() {
  const classes = useStyles();
  const history = useHistory();
  const [savedImages] = useLocalStorage('savedImages', {});

  return (
    <div className={classes.root}>
      {/* <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" className={clsx(classes.menuButton)}>
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Reddit - Image gallery
          </Typography>
          <IconButton onClick={() => history.push('/')} color="inherit">
            <DescriptionOutlined />
          </IconButton>
          <IconButton onClick={() => history.push('/gallery')} color="inherit">
            <PhotoLibraryOutlined />
          </IconButton>
        </Toolbar>
      </AppBar> */}

      <div className={clsx(classes.selectedItem)}>
        {Object.values(savedImages).map(
          image =>
            image.url && (
              <a key={`${image.url}_${image.src}`} href={image.url} target="_blank" rel="noopener noreferrer">
                <img src={image.src} className={clsx(classes.image)} alt={image.src} />
              </a>
            ),
        )}
      </div>
    </div>
  );
}
