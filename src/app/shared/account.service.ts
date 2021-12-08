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

  getAccount(id: string) {
   this.accountRef = this.db.object('/account/' + id);
   return this.accountRef;
  }

  updateSaldo(id, apt: Account['saldoDisponible']) {
    return this.accountRef.update({
      saldoDisponible: apt
    });
  }

  transaccion(cuentaOrigen: Account, cuentaDestino: Account, monto) {
    this.updateSaldo(cuentaOrigen,cuentaOrigen.saldoDisponible + monto);
    this.updateSaldo(cuentaDestino,cuentaDestino.saldoDisponible + monto);
  };


}
