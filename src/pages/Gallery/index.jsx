import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import useLocalStorage from '../../hooks/useLocalStorage';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  title: {
    flex: 1,
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
