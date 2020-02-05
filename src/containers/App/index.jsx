import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core/';

import AppBar from '../../components/AppBar';

const Home = React.lazy(() => import(/* webpackChunkName: "home" */ '../../pages/Home'));
const Gallery = React.lazy(() => import(/* webpackChunkName: "gallery" */ '../../pages/Gallery'));

export default function App() {
  const isGallery = window.location.pathname === '/gallery';
  const [open, setOpen] = useState(!isGallery);
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
