import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { init } from './init';
import whereToBto from './reducers';
import App from './components/App';

const store = createStore(whereToBto);

render(	 
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('app')
	);