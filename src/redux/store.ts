import { composeWithDevTools } from '@redux-devtools/extension';
import {
  applyMiddleware,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);
