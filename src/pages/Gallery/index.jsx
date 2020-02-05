import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { APP_BAR_HEIGHT } from '../../utils/constants';
import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flex: 1,
  },
  selectedItem: {
    flex: 1,
    marginTop: APP_BAR_HEIGHT,
  },
  image: {
    height: 170,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
}));

export default function Gallery() {
  const classes = useStyles();
  const [savedImages] = useLocalStorage('savedImages', {});

  return (
    <div className={classes.root}>
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
