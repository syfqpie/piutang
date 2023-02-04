import { Injectable } from '@angular/core';

import { Debt, isDebt } from './debt.model';
import { AuthService } from '../auth/auth.service';

const DEBTS = 'debts'

@Injectable({
	providedIn: 'root'
})
export class DebtService {

	// Data
	public debt: Debt | null = null
	public debts: Debt[] = []

	constructor(
		private authSvc: AuthService
	) { }

	/**
	 * List all debt records
	 * 
	 * @returns latest debts list
	 */
	async readAll() {
		return await this.authSvc.supabase
			.from(DEBTS)
			.select('*')
			.then(({ data, error }) => {
				if (data) {
					this.debts = data
				} else {
					this.debts = []
				}

				if (error) throw error
			})
	}

	/**
	 * Create new debt for user profile
	 * 
	 * @returns supabase insert debt
	 */
	async create(payload: any) {
		return await this.authSvc.supabase
			.from(DEBTS)
			.insert(payload)
			.select()
			.then(({ data, error }) => {
				if (data && data.length === 1) {
					this.debt = data[0]
				}

				if (error || !this.debt) {
					throw error
				}
			})
	}

}
