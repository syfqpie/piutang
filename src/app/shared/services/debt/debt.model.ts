export class Debt {
    constructor(
        public id: number,
        public amount: number,
        public notes: string,
        public type: DebtType,
        public human: number,
        public dueAt: Date | null,
        public createdAt: Date,
        public modifiedAt: Date
    ) {}
}

export enum DebtType {
    LEND = 'Lend',
    BORROW = 'Borrow'
}