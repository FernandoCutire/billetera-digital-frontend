import { Injectable } from '@angular/core';
import { Account } from './Account';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
 accountListRef: AngularFireList<any>;
 accountRef: AngularFireObject<any>;
 constructor(private db: AngularFireDatabase) { }

  // Get List
  getAccountList() {
    this.accountListRef = this.db.list('/accounts');
    return this.accountListRef;
  }

  updateAccount(id, apt: Account) {
    return this.accountRef.update({
      nomCuenta: apt.nomCuenta,
      numCuenta: apt.numCuenta,
      saldoDisponible: apt.saldoDisponible
    });
  }
}
