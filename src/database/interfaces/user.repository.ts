import { GenericRepository } from './generic.repository'

export interface UsersRepository<TModel, TKey> extends GenericRepository<TModel, TKey> {
    getByEmail(email: string): Promise<TModel | null>
    getByUsername(email: string): Promise<TModel | null>
}
