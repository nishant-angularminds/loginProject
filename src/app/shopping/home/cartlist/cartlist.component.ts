import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrementQuantity, incrementQuantity } from '../../states/cart.action';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css'],
})
export class CartlistComponent implements OnInit {
  state: any;
  count = 1;

  constructor(private store: Store<{ state: any }>) {
    this.store.select('state').subscribe((data) => {
      console.log(data);

      this.state = data.productCartList;
      console.log(this.state);
    });
  }

  ngOnInit(): void {}

  incrementCount(dataInfo: any) {
    this.store.dispatch(incrementQuantity({ dataInfo: dataInfo }));
  }

  decrementCount(dataInfo1: any) {

    this.store.dispatch(decrementQuantity({dataInfo1:dataInfo1}));
  }
}
