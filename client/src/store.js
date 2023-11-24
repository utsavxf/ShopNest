import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"  //Overall, composeWithDevTools makes it easier to integrate Redux with the Redux DevTools extension and add additional features to your Redux store.


import rootreducers from "./components/redux/reducer/main";


const middleware=[thunk];

const store=createStore(
    rootreducers,
    composeWithDevTools(applyMiddleware(...middleware))
);



export default store;
