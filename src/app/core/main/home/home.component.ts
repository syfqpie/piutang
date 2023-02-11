import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { constants } from 'src/app/shared/handlers/utils/constants';
import { Debt, DebtType } from 'src/app/shared/services/debt/debt.model';
import { DebtService } from 'src/app/shared/services/debt/debt.service';

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
	readonly curCode = constants.CURRENCY.code
	readonly curDisplay = constants.CURRENCY.display
	readonly curDigitsInfo = constants.CURRENCY.digitsInfo

	// Subscription
	subscription: Subscription = new Subscription()

	constructor(
		private router: Router,
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
			this.debts = []
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

	async onToggleDebt(id: string) {
		const isPaid = !this.debts.filter(item => item.id === id)[0].is_paid
		let isError = false
		
		try {
			await this.debtSvc.patch(id, { is_paid: isPaid })
		} catch (err) {
			isError = true
		} finally {
			if (!isError) this.getData()
		}
	}

	onViewDebt(id: string) {
		this.router.navigate(['/entry', id])
	}

	async onDeleteDebt(id: string) {
		let isError = false

		try {
			await this.debtSvc.delete(id)
		} catch (err) {
			isError = true
		} finally {
			if (!isError) this.getData()
		}
	}

}
