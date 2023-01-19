import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css'],
})
export class AddresslistComponent implements OnInit {
  addressUser: FormGroup;
  addressInfo: any;
  editAddressId: any;

  constructor(
    private apiobject: ShoppingapiService,
    private routeObject: Router
  ) {
    this.getAddress();
  }

  ngOnInit(): void {
    this.addressUser = new FormGroup({
      addressLine2: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pin: new FormControl(),
    });
  }

  sendAddressData(addressData: any) {
    console.log(addressData);

    this.apiobject.post(`/customers/address`, addressData).subscribe(
      (data) => {
        console.log(data);
        this.getAddress();

        var add = [];
        add.push(data);

        localStorage.setItem('address',JSON.stringify(add));
        if (this.apiobject.addressCart) {
          this.apiobject.addressCart = false;
          this.routeObject.navigateByUrl('/cartlist');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetData() {
    this.addressUser.reset();
  }

  getAddress() {
    this.apiobject.get(`/customers/address`).subscribe(
      (data: any) => {

          localStorage.setItem('address',JSON.stringify(data));
      
        this.addressInfo = data;
        // console.log("run");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteAddress(addressId: any) {
    console.log(addressId);

    this.apiobject.delete(`/customers/address/${addressId}`).subscribe(
      (data) => {
        console.log(data);
        this.getAddress();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editAddressData(idAddress: any, iData: any) {
    this.editAddressId = idAddress;
    console.log(idAddress);
    console.log(this.addressInfo[iData]);
    this.addressUser.setValue(this.addressInfo[iData]);
  }

  clearAddress() {
    this.addressUser.reset();
  }

  sendUpdateAddressData(editInfo: any) {
    // console.log(editInfo);
    // this.apiobject.p
    this.apiobject
      .put(`/customers/address/${this.editAddressId}`, editInfo)
      .subscribe(
        (data) => {
          console.log(data);
          this.getAddress();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
