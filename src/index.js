import React from 'react';
import ReactDOM from 'react-dom';
import './styles/master/index.css';
import Routes from './components/router/Routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();