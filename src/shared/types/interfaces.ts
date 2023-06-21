export interface GenericRepository<TEntity, TKey> {
	list(): Promise<TEntity[] | null>
	create(data: TEntity): Promise<TEntity>
	getById(id: TKey): Promise<TEntity | null>
	update(id: TKey, data: TEntity): Promise<TEntity>
	delete(id: TKey): Promise<TEntity>
}

export interface UsersRepository<TEntity, TKey> extends GenericRepository<TEntity, TKey> {
	getByEmail(email: string): Promise<TEntity | null>
	getByUsername(email: string): Promise<TEntity | null>
}
