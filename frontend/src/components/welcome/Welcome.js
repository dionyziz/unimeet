import React, { Component } from 'react';
import {Topbar, Footer} from '../common';
import Intro from './body/Intro';
import './styles.css';

class Welcome extends Component {
    render() {
        return (
            <div className="Welcome">
                <Topbar page={'welcome'} />
                <Intro />
                <Footer />
            </div>
        );
    }
}

export default Welcome;