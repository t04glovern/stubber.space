import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "./../saga/rootSaga";
import createSagaMiddleware from "redux-saga";
import firebase from "../config/firebase";
import { generateContractsInitialState } from "drizzle";
import drizzleOptions from '../../drizzleOptions'

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

export const configureStore = () => {

  const sagaMiddleware = createSagaMiddleware();
  const initialState = {
    contracts: generateContractsInitialState(drizzleOptions)
  }

  const middlewares = [
    sagaMiddleware,
    thunk.withExtraArgument({
      getFirebase,
      getFirestore
    }),
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer];
  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancer,
  );

  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers/rootReducer", () => {
        const newRootReducer = require("../reducers/rootReducer").default;
        store.replaceReducer(newRootReducer);
      });
    }
  }

  return store;
};
