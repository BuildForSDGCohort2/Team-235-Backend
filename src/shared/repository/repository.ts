export interface Repository<T> {
    find(id: string): Promise<T>
    findAll(): Promise<T[]>
    save(data: T): Promise<T>
    remove(data: T): Promise<void>
}