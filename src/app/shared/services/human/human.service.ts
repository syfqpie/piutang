import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Human } from './human.model';

const HUMANS = 'humans'

@Injectable({
  providedIn: 'root'
})
export class HumanService {

  // Data
  public human: Human | null = null
  public humans: Human[] = []

  constructor(
    private authSvc: AuthService
  ) { }

  /**
   * List all human records
   * 
   * @returns latest humans list
   */
  async query(name: string) {
    return await this.authSvc.supabase
      .from(HUMANS)
      .select('*')
      .ilike('name', `%${name}%`)
      .then(({ data, error }) => {
				if (data) {
				  this.humans = data
				} else {
          this.humans = []
        }

				if (error) throw error
			})
  }

  /**
   * Retrieve a human by id
   * 
   * @param id Human id
   * @returns a human record
   */
  retrieve(id: string): Human | null {
    return this.humans.find((human) => human && human.id === id) ?? null
  }

  /**
	 * Create new human for user profile
	 * 
	 * @returns supabase insert human
	 */
	async create(payload: any) {
		return await this.authSvc.supabase
			.from(HUMANS)
			.insert(payload)
      .select()
			.then(({ data, error }) => {
				if (data && data.length === 1) {
				  this.human = data[0]
				}

				if (error || !this.human) {
					throw error
				}
			})
	}

}
