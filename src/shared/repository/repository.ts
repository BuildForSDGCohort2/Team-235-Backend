export interface Repository<T> {
    existsById(id: string): Promise<boolean>
    find(id: string): Promise<T>
    findAll(): Promise<T[]>
    save(data: T): Promise<T>
    remove(data: T): Promise<void>
}