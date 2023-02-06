import { Human } from '../human/human.model';

/**
 * Debt base class
 */
export interface Debt {
    id?: string,
    amount?: number,
    type?: DebtType,
    human_id?: string,
    human?: Human | Human[] | null,
    is_paid?: boolean,
    notes?: string,
    due_at?: string | null,
    paid_at?: string | null,
    created_at?: string,
    updated_at?: string,
    created_by_id?: string,
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