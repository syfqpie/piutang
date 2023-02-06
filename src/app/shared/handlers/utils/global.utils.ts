import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalUtil {

    /**
	 * CurrencyPipe stuff's here.
	 * Angular's reference: https://angular.io/api/common/CurrencyPipe
	 * 
	 * currency:'MYR':'symbol-narrow':'1.2-2'
	 * 
	 * digitsInfo format:
	 * - {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
	 * 
	 * ISO 4217 currency code list https://en.wikipedia.org/wiki/ISO_4217
	 */
    readonly currencyCode = 'MYR'
	readonly currencyDisplay = 'symbol-narrow'
	readonly currencyDigitsInfo = '1.2-2' 

    public toCamel(s: string): string {
        return s.replace(/([-_][a-z])/ig, ($1) => {
            return $1.toUpperCase()
                .replace('-', '')
                .replace('_', '')
        })
    }

    public toSnake(s: string): string {
        return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    }

    public keysToCamel(o: any): object {
        if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
            const n: any = {}
            Object.keys(o)
                .forEach((k) => {
                    n[this.toCamel(k) as keyof typeof n] = this.keysToCamel(o[k])
                })
            return n
        } else if (Array.isArray(o)) {
            return o.map((i) => {
                return this.keysToCamel(i)
            })
        }
        return o
    }

    public keysToSnake(o: any): object {
        if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
            const n: any = {}
            Object.keys(o).forEach((k) => {
                n[this.toSnake(k)] = this.keysToSnake(o[k])
            })
            return n
        } else if (Array.isArray(o)) {
            return o.map((i) => {
                return this.keysToSnake(i)
            })
        }
        return o
    }

}