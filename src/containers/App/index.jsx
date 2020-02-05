import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppBar from '../../components/AppBar';
import Home from '../../pages/Home';
import Gallery from '../../pages/Gallery';

export default function App() {
  const isGallery = window.location.pathname === '/gallery';
  const [open, setOpen] = useState(!isGallery);
  return (
    <div>
      <Router>
        <AppBar open={open} setOpen={setOpen} />
        <Switch>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
