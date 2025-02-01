export interface CRUD<T> {
    addItem(details: T): void,
    editItem(index: number, newDetails: T): void,
    deleteItem(index: number): void
}