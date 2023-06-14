/* eslint-disable @typescript-eslint/no-unused-vars */
declare interface GenericRepository<TEntity, TKey> {
	create(data: TEntity): Promise<TEntity>
	get(id?: TKey): Promise<TEntity[] | null>
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
