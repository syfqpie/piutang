import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Debt } from 'src/app/shared/services/debt/debt.model';
import { DebtService } from 'src/app/shared/services/debt/debt.service';

@Component({
	selector: 'app-debt',
	templateUrl: './debt.component.html',
	styleUrls: ['./debt.component.css']
})
export class DebtComponent implements OnInit {

	// Data
	currentDebt: Debt

	// Checker
	isLoading: boolean = false

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private debtSvc: DebtService
	) {
		this.currentDebt = this.route.snapshot.data['DebtResolver']
	}

	ngOnInit(): void { }

	onSave(form: object | null) {
		if (form) this.doSave(form)
	}

	async doSave(form: object) {
		this.isLoading = true
		let isError = false
		try {
			await this.debtSvc.patch(form, this.currentDebt.id!)
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
