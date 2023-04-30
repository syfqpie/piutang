import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CaseUtil {

    toCamel(s: string): string {
        return s.replace(/([-_][a-z])/ig, ($1) => {
            return $1.toUpperCase()
                .replace('-', '')
                .replace('_', '')
        })
    }

    toSnake(s: string): string {
        return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    }

    keysToCamel(o: any): object {
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

    keysToSnake(o: any): object {
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