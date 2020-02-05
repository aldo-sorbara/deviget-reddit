import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { IconButton, Typography, AppBar as MUIAppBar, Toolbar } from '@material-ui/core/';
import { Menu, PhotoLibraryOutlined, DescriptionOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH, APP_BAR_HEIGHT } from '../../utils/constants';

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
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
    height: APP_BAR_HEIGHT,
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function AppBar({ open, setOpen }) {
  const { pathname } = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const isGallery = pathname === '/gallery';

  return (
    <MUIAppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: !isGallery && open,
      })}>
      <Toolbar>
        {!isGallery && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(true)}
            className={clsx(classes.menuButton, open && classes.hide)}>
            <Menu />
          </IconButton>
        )}

        <Typography variant="h6" className={classes.title}>
          Reddit
        </Typography>
        <IconButton onClick={() => history.push('/')} color="inherit">
          <DescriptionOutlined />
        </IconButton>
        <IconButton onClick={() => history.push('/gallery')} color="inherit">
          <PhotoLibraryOutlined />
        </IconButton>
      </Toolbar>
    </MUIAppBar>
  );
}
