import { Document, FilterQuery, Model, ObjectId, UpdateQuery } from 'mongoose'
import { GenericRepository } from '../interfaces/generic.repository'

export abstract class MongodbRepository<TDocument extends Document> implements GenericRepository<TDocument, ObjectId> {
    constructor(protected readonly entityModel: Model<TDocument>) {}

    public async list(): Promise<TDocument[]> {
        return await this.entityModel.find({})
    }

    public async getOne(
        entityFilterQuery: FilterQuery<TDocument>,
        projection?: Record<string, unknown>,
    ): Promise<TDocument | null> {
        return this.entityModel
            .findOne(entityFilterQuery, {
                ...projection,
            })
            .exec()
    }

    public async getMany(
        entityFilterQuery: FilterQuery<TDocument>,
        projection?: Record<string, unknown>,
    ): Promise<TDocument | null> {
        return this.entityModel
            .findOne(entityFilterQuery, {
                ...projection,
            })
            .exec()
    }

    public async getById(id: ObjectId): Promise<TDocument> {
        return await this.entityModel.findById(id)
    }

    public async create<TEntity>(createEntityData: TEntity): Promise<TDocument> {
        const entity = new this.entityModel(createEntityData)
        return await entity.save()
    }

    public async update(
        entityFilterQuery: FilterQuery<TDocument>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<TDocument | null> {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
            new: true,
        })
    }

    public async deleteMany(entityFilterQuery: FilterQuery<TDocument>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(entityFilterQuery)
        return deleteResult.deletedCount >= 1
    }

    public async delete(id: ObjectId): Promise<TDocument> {
        return await this.entityModel.findByIdAndDelete(id)
    }
}
