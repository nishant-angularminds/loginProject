import { createAction, props } from "@ngrx/store";
import { ProdutInfo } from "./cart.reducer";


export const addCart = createAction('addCart',props<{productData:ProdutInfo}>());
export const incrementQuantity = createAction('incrementQuantity',props<{dataInfo:any}>());
export const decrementQuantity = createAction('decrementQuantity',props<{dataInfo1:any}>());
export const totalPrice = createAction('totalPrice')
export const addTotal = createAction('addTotal');
export const subTotal = createAction('subTotal');
export const subTotal1 = createAction('subTotal1');
export const addOneCart = createAction('addOneCart',props<{dataInfo11:any}>());
