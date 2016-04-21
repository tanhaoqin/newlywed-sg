'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {data} from '../data';
import { init } from '../init';
import { createStore } from 'redux'
import NavContainer from '../containers/NavContainer';
import ContentContainer from '../containers/ContentContainer';

export default class App extends React.Component {
    
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <NavContainer />
                <ContentContainer />
            </div>
        );
    }
}