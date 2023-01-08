import { Injectable } from '@angular/core';
import { Debt, DebtType } from './debt.model';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  // Data
  public debt: Debt | null = null
  public debts: Debt[] = []

  constructor() { }

}
