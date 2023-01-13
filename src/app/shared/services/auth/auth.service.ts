import { Injectable } from '@angular/core';
import {
	AuthSession,
	createClient,
	SignInWithPasswordCredentials,
	SignUpWithPasswordCredentials,
	SupabaseClient,
} from '@supabase/supabase-js';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// Supabase
	private supabase: SupabaseClient
	public _session?: AuthSession | null

	constructor() {
		this.supabase = createClient(environment.supabaseUrl,
									 environment.supabaseKey)
	}

	/**
	 * Get current session.
	 * 
	 * @returns supabase getSession()
	 */
	async getSession() {
		return await this.supabase.auth.getSession()
			.then(({ data }) => {
				this._session = data.session
				console.log('>>', this._session)
			})
			.catch(({ err }) => {
				console.log('err', err)
			})
	}

	/**
	 * Register new user.
	 * 
	 * @returns supabase signUp()
	 */
	async register(payload: SignUpWithPasswordCredentials) {
		return await this.supabase.auth.signUp(payload)
			.then(({ data, error }) => {
				this._session = data.session

				if (error) {
					throw error
				}
			})
	}

	/**
	 * Signin user.
	 * 
	 * @returns supabase signInWithPassword()
	 */
	async login(payload: SignInWithPasswordCredentials) {
		return await this.supabase.auth.signInWithPassword(payload)
			.then(({ data, error }) => {
				this._session = data.session

				if (error) {
					throw error
				}
			})
	}

	/**
	 * Signout user.
	 * 
	 * @returns supabase signOut()
	 */
	async logout() {
		return await this.supabase.auth.signOut()
			.finally(() => {
				this._session = undefined
			})
	}

	/**
	 * Refresh current session.
	 * 
	 * @param payload.refresh_token current session refresh token
	 * 
	 * @returns supabase refreshSession()
	 */
	async refreshSession(payload?: { refresh_token: string }) {
		return await this.supabase.auth.refreshSession(payload)
			.then(({ data, error }) => {
				this._session = data.session

				if (error) {
					throw error
				}
			})
	}

}
