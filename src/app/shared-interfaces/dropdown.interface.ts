export interface Dropdown {
    title: string,
    code?: string,
    alreadyUsed?: boolean,
    prefix?: string,
    fn?: (...a:any) => any
}