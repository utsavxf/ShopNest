//we have created main.js basically so that if in case we have more than two reducers
//than we can have a combined file to have them all at one  place and then store them together in store.js file

import {combineReducers} from "redux";
import { getProductsReducers } from "./Productsreducers";

const rootreducers=combineReducers({
       getproductsdata:getProductsReducers   //so we will acess the action getProductsreducer by the key getproductsdata
});

export default rootreducers;