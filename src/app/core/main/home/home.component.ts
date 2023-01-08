import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Debt, DebtType } from 'src/app/shared/services/debt/debt.model';
import { DebtService } from 'src/app/shared/services/debt/debt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Data
  latestDebts: Debt[] = []

  // Predfined
  DebtType = DebtType

  // Subscription
  subscription: Subscription = new Subscription()

  constructor(
    private debtSvc: DebtService
  ) { }
                                     
  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.latestDebts = this.debtSvc.debts.slice(0, 5)
  }

}
