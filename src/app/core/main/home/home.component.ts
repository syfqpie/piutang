import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Debt, DebtType } from 'src/app/shared/services/debt/debt.model';
import { DebtService } from 'src/app/shared/services/debt/debt.service';
import { GlobalUtil } from 'src/app/shared/handlers/utils/global.utils';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	// Data
	totalLended: number = 0
	totalBorrowed: number = 0
	debts: Debt[] = []

	// Predfined
	readonly DebtType = DebtType
	readonly currCode = this.util.currencyCode
	readonly currDisplay = this.util.currencyDisplay
	readonly currDigitsInfo = this.util.currencyDigitsInfo

	// Subscription
	subscription: Subscription = new Subscription()

	constructor(
		private router: Router,
		private util: GlobalUtil,
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

	async getData() {
		try {
			await this.debtSvc.readLatest()
			this.debts = this.debtSvc.debts
		} catch (err) {
			// handle error
			console.error(err)
		} finally {
			this.calculateTotal()
		}
	}

	calculateTotal() {
		this.totalLended = this.debts.filter(item => item.type === DebtType.LEND && !item.is_paid)
									 .reduce((sum, item) => sum + item.amount!, 0)
		this.totalBorrowed = this.debts.filter(item => item.type === DebtType.BORROW && !item.is_paid)
									 .reduce((sum, item) => sum + item.amount!, 0)
	}

	async onTogglePaidDebt(id: string) {
		const debtIsPaid = !this.debts.filter(item => item.id === id)[0].is_paid
		let isError = false
		try {
			await this.debtSvc.patch(id, { is_paid: debtIsPaid })
		} catch (err) {
			isError = true
			console.error(err)
		} finally {
			if (!isError) {
				this.getData()
			}
		}
	}

	onViewDebt(id: string) {
		this.router.navigate(['/entry', id])
	}

}
