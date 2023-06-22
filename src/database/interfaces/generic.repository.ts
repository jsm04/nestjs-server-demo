export interface GenericRepository<TModel, TKey> {
	list(): Promise<TModel[] | null>
	create<TEntity>(data: TEntity): Promise<TModel>
	getById(id: TKey): Promise<TModel | null>
	update(id: TKey, data: TModel): Promise<TModel | null>
	delete(id: TKey): Promise<TModel | null>
}
