import { Injectable } from '@angular/core';
import { Human } from './human.model';

@Injectable({
  providedIn: 'root'
})
export class HumanService {

  // Data
  public human: Human | null = null
  public humans: Human[] = [
		{ id: 1, name: 'Abu Yow' },
		{ id: 2, name: 'Mikky Chan' },
		{ id: 3, name: 'Ahmad Johcena' },
		{ id: 4, name: 'Cynthia labu' },
		{ id: 5, name: 'Ben mamat' }
	]

  constructor() { }

  /**
   * List all human records
   * 
   * @returns latest humans list
   */
  list(): Human[] {
    return this.humans
  }

  /**
   * Retrieve a human by id
   * 
   * @param id Human id
   * @returns a human record
   */
  retrieve(id: number): Human | null {
    return this.humans.find((human) => human && human.id === id) ?? null
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  add(name: string): Human {
    const ordered: Human[] = this.humans.sort((one, two) => (one.id > two.id ? -1 : 1))
    const indexTail: number = ordered.length > 0 ? ordered[0].id : 0
    const humanToAppend: Human = {
      id: indexTail + 1,
      name: name
    }

    this.humans.push(humanToAppend)

    return humanToAppend
  }

}
