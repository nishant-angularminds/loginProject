import { createReducer, on } from '@ngrx/store';
import { count } from 'rxjs';
import {
  addCart,
  addOneCart,
  addTotal,
  decrementQuantity,
  incrementQuantity,
  subTotal,
  subTotal1,
  totalPrice,
} from './cart.action';

export interface ProdutInfo {
  _id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  subTotal: number;
  qty: number;
  images: { public_id: string; url: string }[];
}

export interface cart {
  items: ProdutInfo[];
  total: number;
  deliveryFee: number;
}

export interface oneCart {

  items: ProdutInfo[];
  total: number;
  deliveryFee: number;

}

export const initialState: cart = {
  items: [],
  total: 0,
  deliveryFee: 50,
};

export const initialState1: oneCart = {
  items: [],
  total: 0,
  deliveryFee: 50,
};

export const cartReducer = createReducer(
  initialState,
  on(addCart, (state, { productData }) => {
    console.log(state.items);

    let index = state.items.find((data) => data['_id'] == productData['_id']);

    let temp = structuredClone(state.items);

    console.log(index);

    if (index === undefined) {
      temp.push(productData);
    }

    return {
      ...state,
      items: temp,
    };
  }),

  on(incrementQuantity, (state, { dataInfo }) => {
    let temp = structuredClone(state.items);
    // var totalPriceValue = temp[dataInfo]['totalPrice'];

    console.log(state);

    temp[dataInfo]['qty'] += 1;
    temp[dataInfo]['subTotal'] =
      temp[dataInfo]['qty'] * temp[dataInfo]['price'];

    return {
      ...state,
      items: temp,
    };
  }),

  on(decrementQuantity, (state, { dataInfo1 }) => {
    let temp = structuredClone(state.items);

    if (temp[dataInfo1]['qty'] > 1) {
      temp[dataInfo1]['qty'] -= 1;
      temp[dataInfo1]['subTotal'] =
        temp[dataInfo1]['qty'] * temp[dataInfo1]['price'];
    } else {
      temp[dataInfo1]['qty'] = 1;

      temp.splice(dataInfo1, 1);
    }
    return {
      ...state,
      items: temp,
    };
  }),

  on(addTotal, (state) => {
    let temp = structuredClone(state.items);
    var cartTotal = structuredClone(state.total);
    var count = 0;

    temp.map((data) => {
      count = count + data['subTotal'];
    });

    console.log(cartTotal);

    return {
      ...state,
      total: count,
    };
  }),

  on(subTotal, (state) => {
    let temp = structuredClone(state.items);
    var cartTotal = structuredClone(state.total);
    var count = 0;

    temp.map((data) => {
      count = count - data['subTotal'];
    });

    count = Math.abs(count);

    return {
      ...state,
      total: count,
    };
  }),

);

export const oneCartReducer = createReducer(initialState1,
  
  on(addOneCart,(state1,{dataInfo11})=>{

    var temp = structuredClone(state1.items);
    temp[0] = dataInfo11;

    return {

      ...state1,
      items:temp
    }
  }),
  
  on(subTotal1, (state) => {
    let temp = structuredClone(state.items);
    var cartTotal = structuredClone(state.total);
    var count = 0;

    temp.map((data) => {
      count = count - data['subTotal'];
    });

    count = Math.abs(count);

    return {
      ...state,
      total: count,
    };
  }),)
