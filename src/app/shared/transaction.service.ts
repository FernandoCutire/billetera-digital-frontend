import { Injectable } from '@angular/core';
import { Transaction } from './Transaction';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export  class TransactionService {
  transactionListRef: AngularFireList<any>;
  transactionRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
  }

  getTransactionList() {
    this.transactionListRef = this.db.list('/transactions');
    return this.transactionListRef;
  }

}
