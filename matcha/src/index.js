
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__())}>
<Routes />
</Provider>
,document.querySelector('.container'));













