import { createAction, props } from "@ngrx/store";
import { ProdutInfo } from "./cart.reducer";


export const addCart = createAction('addCart',props<{productData:ProdutInfo}>());
export const incrementQuantity = createAction('incrementQuantity',props<{dataInfo:any}>());
export const decrementQuantity = createAction('decrementQuantity',props<{dataInfo1:any}>())
