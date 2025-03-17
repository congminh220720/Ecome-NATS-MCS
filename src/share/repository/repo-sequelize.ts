import { IRepository } from "../interfaces";
import { PagingDTO } from "../models/paging";
import { ModelStatus } from "../models/base-model";
import { Op, Sequelize } from "sequelize";

export abstract class BaseRepositorySequelize <Entity, UpdateDTO, Cond > implements IRepository <Entity, UpdateDTO, Cond> {
    constructor(private readonly sequelize: Sequelize, private readonly modelName) {}

    async get(id: string): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id)

        if (!data) {
            return null
        }

        const persistenceData = data.get({ plain: true })

        const { created_at, updated_at, ...props} = persistenceData

        return { ...props, createdAt: created_at, updatedAt: updated_at } as Entity
    }

    async list(cond: Cond, paging: PagingDTO): Promise<Entity[]> {
        const { page, limit } = paging;
        const offset = (page - 1) * limit

        const condSql = {...cond, status: { [Op.ne]: ModelStatus.DELETED}}

        const total = await this.sequelize.models[this.modelName].count({ where: condSql })

        paging.total = total 

        const rows = await this.sequelize.models[this.modelName].findAll({ where: condSql, limit: paging.limit, offset, order: [['id', 'DESC']] })

        return rows.map(row => row.get({ plain: true }));
    }

    async findCond(cond: Cond): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findOne({ where: cond as any })

        if (!data) {
            return null;
        }
         
       const persistenceData = data.get({ plain: true })
       return persistenceData as Entity
    }

    async insert(data: Entity): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data as any)
        return true
    }

    async update(id: string, data: UpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data, { where: { id } })
        return true
    }

    async delete(id: string): Promise<boolean> {
        await this.sequelize.models[this.modelName].destroy({ where: { id } })
        return true
    }

    async softDelete(id: string): Promise<boolean> {
        await this.sequelize.models[this.modelName].update({ status: ModelStatus.DELETED }, { where: { id } })
        return true
    }
}