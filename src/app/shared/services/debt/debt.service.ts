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
	 * Read
	 * 
	 * @returns latest debts list
	 */
	async readLatest() {
		return await this.authSvc.supabase
			.from(DEBTS)
			.select(`
				id,
				amount,
				type,
				human:human_id ( name ),
				notes,
				is_paid,
				created_by_id,
				due_at,
				paid_at,
				created_at,
				updated_at
			`)
			.order('is_paid', { ascending: true })
			.order('created_at', { ascending: false })
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
	 * Retrieve user debt
	 * 
	 * @returns supabase select debt
	 */
	async retrieve(id: string) {
		return await this.authSvc.supabase
			.from(DEBTS)
			.select(`
				id,
				amount,
				type,
				human:human_id ( id, name ),
				notes,
				is_paid,
				created_by_id,
				due_at,
				paid_at,
				created_at,
				updated_at
			`)
			.eq('id', id)
			.then(({ data, error}) => {
				if (data) {
					this.debt = data[0]
				} else {
					this.debt = null
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

	/**
	 * Patch user debt
	 * 
	 * @returns supabase update and select debt
	 */
	async patch(id: string, payload: Debt) {
		return await this.authSvc.supabase
			.from(DEBTS)
			.update(payload)
			.eq('id', id)
			.select()
			.then(({ data, error }) => {
				if (data && data.length === 1) {
					this.debt = data[0]
				}
  
				if (error) {
					throw error
				}
			})
	}

}
