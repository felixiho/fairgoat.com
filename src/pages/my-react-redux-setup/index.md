---
title: My Redux Setup
date: '2019-11-14' 
spoiler: White Socks. Gold Chain.
---

## Introduction
I recently had to start a new react project that needed redux. At first, I searched for redux integration boilerplates that would fit my needs. Unfortunately, most of the boilerplates were too robust or not sufficient for me. 

I eventually had to set the project up myself to meet my needs.

The setup mainly consists of the following:
1. [Redux](https://redux.js.org/)
2. [Redux Saga](https://redux-saga.js.org/)
3. [Redux Persist](https://github.com/rt2zz/redux-persist)


Note that this post assumes you have a fair understanding of Redux.

`configureStore.js`

```javascript
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/es/storage';


import rootReducer from '../reducers';
import rootSaga from '../sagas';

const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, rootReducer);


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
  
    
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(  
        applyMiddleware(sagaMiddleware)
    );
  return {
    ...createStore(persistedReducer, enhancer),
    runSaga: sagaMiddleware.run(rootSaga)
  }
};
 
export default () => {
  let store = configureStore();
  let persistor = persistStore(store)
  return { store, persistor }
};
```

`../reducers`

```javascript
import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';  

const rootReducer = combineReducers({
  register,
  login
});


export default rootReducer;
```

`../sagas`
```javascript
import { fork } from 'redux-saga/effects';
import watchUserAuthentication from './watchers';

export default function* startForman() {
  yield fork(watchUserAuthentication);
}
```

`App.js`

```javascript
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import Login from './Components/Auth/Login'; 
import { PersistGate } from 'redux-persist/integration/react'; 
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

const {store, persistor} = configureStore();

function App() {
  return (
    <div className="App">
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch> 
            <Route path="/login">
              <Login />
            </Route> 
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
    </div>
  );
}

export default App;

```

### Extra
If you need to implement logout and also want to clear the persisted state, this is how I do it.

`../reducers`


```javascript
import { combineReducers } from 'redux';
import register from './registerReducer';
import login from './loginReducer';
import storage from 'redux-persist/es/storage';
import * as types from '../actions'; 

const appReducer = combineReducers({
  register,
  login
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT_USER) { 
      storage.removeItem('persist:root')   
      state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
```

Godspeed.