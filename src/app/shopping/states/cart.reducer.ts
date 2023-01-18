import { createReducer, on } from '@ngrx/store';
import { addCart, decrementQuantity, incrementQuantity } from './cart.action';

export interface ProdutInfo {
  _id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  subTotal: number;
  qty: number;
  images: { public_id: string; url: string }[];
  totalPrice: number;
}

export interface cart {
  productCartList: ProdutInfo[];
  totalAmount: number;
  buyNow: ProdutInfo[];
}

export const initialState: cart = {
  productCartList: [],
  totalAmount: 0,
  buyNow: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addCart, (state, { productData }) => {
    console.log(state.productCartList);

    let index = state.productCartList.find(
      (data) => data['_id'] == productData['_id']
    );

    let temp = structuredClone(state.productCartList);

    console.log(index);

    if (index === undefined) {
      temp.push(productData);
    }

    return {
      ...state,
      productCartList: temp,
    };
  }),

  on(incrementQuantity, (state, { dataInfo }) => {
    let temp = structuredClone(state.productCartList);
    // var totalPriceValue = temp[dataInfo]['totalPrice'];

    temp[dataInfo]['qty'] += 1;
    temp[dataInfo]['totalPrice'] =
      temp[dataInfo]['qty'] * temp[dataInfo]['price'];

    return {
      ...state,
      productCartList: temp,
    };
  }),

  on(decrementQuantity, (state, { dataInfo1 }) => {
    let temp = structuredClone(state.productCartList);

    if (temp[dataInfo1]['qty'] > 1) {
      temp[dataInfo1]['qty'] -= 1;
      temp[dataInfo1]['totalPrice'] =
        temp[dataInfo1]['qty'] * temp[dataInfo1]['price'];
    } else {
      temp[dataInfo1]['qty'] = 1;
    }
    //nishu
    return {
      ...state,
      productCartList: temp,
    };
  })
);
