import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import Contact from './components/Contact';
import Chat from './components/Chat';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/chat' component={Chat} />
        </div>
    </Router>,
    document.getElementById('root')
);
