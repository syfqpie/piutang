import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DebtService } from 'src/app/shared/services/debt/debt.service';

@Component({
	selector: 'app-add-new-debt',
	templateUrl: './add-new-debt.component.html',
	styleUrls: ['./add-new-debt.component.css']
})
export class AddNewDebtComponent implements OnInit {

	// Checker
	isLoading: boolean = false

	constructor(
		private router: Router,
		private debtSvc: DebtService
	) { }

	ngOnInit(): void { }

	onAdd(form: object | null) {
		if (form) this.doAdd(form)
	}

	async doAdd(form: object) {
		this.isLoading = true
		let isError = false

		try {
			await this.debtSvc.create(form)
		} catch (err) {
			// handler error
			isError = true
		} finally {
			this.isLoading = false
			if (!isError) {
				this.router.navigate(['/home'])
			}
		}
	}

}
