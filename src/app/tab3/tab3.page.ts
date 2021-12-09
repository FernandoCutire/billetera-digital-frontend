import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../shared/transaction.service';
import {Transaction} from '../shared/Transaction';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Transactions = [];

  constructor(private tranService: TransactionService) {
  }

  ngOnInit() {
    this.fetchTransactions();
    const transRes = this.tranService.getTransactionList();
    transRes.snapshotChanges().subscribe(res => {
      this.Transactions = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        a['$key'] = item.key;
        this.Transactions.push(a as Transaction);
      });
    });
  }

  fetchTransactions() {
    this.tranService.getTransactionList().valueChanges().subscribe(res => {
      console.log(res);
    });
  }
}
