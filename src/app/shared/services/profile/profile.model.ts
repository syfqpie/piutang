/** Profile base interface */
export interface Profile {
    /** Profile uuid */
    id?: string,
    /** Profile name */
    name?: string | null,
    /** Last updated at */
    updated_at?: string | null
}