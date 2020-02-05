import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core/';

import { MOBILE_BREAKPOINT } from '../../utils/constants';
import AppBar from '../../components/AppBar';

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '../../pages/Home'));
const Gallery = React.lazy(() => import(/* webpackChunkName: "gallery" */ '../../pages/Gallery'));

export default function App() {
  const isGallery = window.location.pathname === '/gallery';
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  const [open, setOpen] = useState(!isGallery && !isMobile);

  return (
    <div>
      <React.Suspense fallback={<CircularProgress />}>
        <Router>
          <AppBar open={open} setOpen={setOpen} />
          <Switch>
            <Route exact path="/gallery">
              <Gallery />
            </Route>
            <Route path="/">
              <Home open={open} setOpen={setOpen} />
            </Route>
          </Switch>
        </Router>
      </React.Suspense>
    </div>
  );
}
