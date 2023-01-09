import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiInfoService } from 'src/app/services/api-info.service';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css'],
})
export class AddresslistComponent implements OnInit {
  addressUser: FormGroup;
  addressInfo: any;
  editAddressId: any;

  constructor(private apiobject: ApiInfoService) {
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAddress() {
    this.apiobject.get(`/customers/address`).subscribe(
      (data) => {
        console.log(data);
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

  editAddressData(idAddress: any) {
    this.editAddressId = idAddress;
    console.log(idAddress);
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
