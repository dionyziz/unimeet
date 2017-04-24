import React from 'react';
import ReactDOM from 'react-dom';
import {Welcome} from './components/welcome';
import {Contact} from './components/contact';
import {Chat} from './components/chat';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './styles.css';

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