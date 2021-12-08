import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from '../shared/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Account} from '../shared/Account';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Accounts = [];
  updateAccountForm: FormGroup;
  id: any;

  constructor(
    private aptService: AccountService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController
    ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.aptService.getAccount(this.id).valueChanges().subscribe(res => {
      this.updateAccountForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateAccountForm = this.fb.group({
      numCuenta: [''],
      saldoDisponible: ['']
    });
    console.log(this.updateAccountForm.value);
    this.fetching();
  }

  fetching() {
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
  };


  fetchAccounts() {
    this.aptService.getAccountList().valueChanges().subscribe(res => {
      console.log(res);
    });
  };

  updateForm() {
    this.aptService.updateSaldo(this.id, this.updateAccountForm.value)
      .then(() => {
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(error => console.log(error));
  };

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espera',
      duration: 2000,
    });
    await loading.present();
    setTimeout(() => {  this.presentToast(); }, 2000);
    console.log('Termino la espera');
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La transacción se ha completado',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
