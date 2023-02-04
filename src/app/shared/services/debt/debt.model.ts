/**
 * Debt base class
 */
export interface Debt {
    id: string,
    amount: number,
    type: DebtType,
    human_id: string,
    notes: string,
    is_paid: boolean,
    created_by: string,
    due_at: string | null,
    paid_at: string | null,
    created_at: string,
    modified_at: string
}

/**
 * Check if object is Debt
 * 
 * @param item object to check
 * 
 * @returns true or false
 */
export function isDebt(item: Debt): item is Debt {
    return 'id' in item;
}

/**
 * Enum for debt types
 */
export enum DebtType {
    LEND = 'lend',
    BORROW = 'borrow'
}