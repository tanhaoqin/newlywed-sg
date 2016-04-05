import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {data} from './data';
// import {weight} from './weights';

ReactDOM.render( <App data={data}/>, document.getElementById('app'));