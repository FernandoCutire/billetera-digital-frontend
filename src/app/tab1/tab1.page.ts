import { Component, OnInit, ViewChild } from '@angular/core';
import { Account } from  '../shared/Account';
import {AccountService} from '../shared/account.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Accounts = [];

  constructor(
    private aptService: AccountService
  ) {}

  ngOnInit() {
    this.fetchAccounts();
    const accountRes = this.aptService.getAccountList();
    accountRes.snapshotChanges().subscribe(res => {
      this.Accounts = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        a['$key'] = item.key;
        this.Accounts.push(a as Account);
      });
    });
  }
  fetchAccounts() {
    this.aptService.getAccountList().valueChanges().subscribe(res => {
      console.log(res);
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
