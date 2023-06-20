declare type BaseRecord<TEntity, TKey> = TEntity & {
	id: TKey
	createdAt: Date
	updatedAt: Date
}

declare interface GenericRepository<TEntity, TKey> {
	list(): Promise<TEntity[] | null>
	create(data: TEntity): Promise<TEntity>
	getById(id: TKey): Promise<TEntity | null>
	update(id: TKey, data: TEntity): Promise<TEntity>
	delete(id: TKey): Promise<TEntity>
}

declare interface UsersRepository<TEntity, TKey> extends GenericRepository<TEntity, TKey> {
	getByEmail(email: string): Promise<TEntity | null>
	getByUsername(email: string): Promise<TEntity | null>
}

declare type MongoDbError = Error & {
	index: number
	code: number
	keyPattern: Record<string, number>
	keyValue: Record<string, string>
}
