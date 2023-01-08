/**
 * Debt base class
 */
export class Debt {
    constructor(
        public id: number,
        public amount: number,
        public notes: string,
        public type: DebtType,
        public human: string,
        public dueAt: string | null,
        public createdAt: string,
        public modifiedAt: string
    ) {}
}

/**
 * Enum for debt types
 */
export enum DebtType {
    LEND = 'Lend',
    BORROW = 'Borrow'
}