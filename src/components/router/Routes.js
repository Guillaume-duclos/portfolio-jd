import React    from 'react';
import Home     from '../../screens/Home';
import Contact  from '../../screens/Contact';
import Content  from '../../screens/Content';
import NotFound from '../../screens/NotFound';
import { HashRouter, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Home" exact name="home" component={Home} />
        <Route path="/Contact" exact name="contact" component={Contact} />
        <Route path="/Content/:index" name="content" component={Content} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </HashRouter>
  )
};

export default Routes;