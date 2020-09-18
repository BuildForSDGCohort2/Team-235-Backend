export interface Repository<I, T> {
    find(id: I): Promise<T>
    findAll(): Promise<T[]>
    save(data: T): Promise<T>
    remove(data: T): Promise<void>
}