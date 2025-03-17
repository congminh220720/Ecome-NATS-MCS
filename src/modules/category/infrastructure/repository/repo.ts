import { Op, Sequelize } from "sequelize";
import { IRepository } from "../../interfaces";
import { ModelStatus } from "../../../../share/models/base-model";
import { PagingDTO } from "../../../../share/models/paging";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";
import { Category } from "../../model/model";


export class MySQLCategoryRepository implements IRepository {
    constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}
    async list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>>{
        const { page, limit } = paging

        const condSQL = {  ...cond  ,status: { [Op.ne]: ModelStatus.DELETED } }

        const total = await this.sequelize.models[this.modelName].count()
        paging.total = total

        const rows = await this.sequelize.models[this.modelName].findAll({ where: condSQL, limit, offset: (page - 1) * limit, order: [['id', 'DESC']] })

        return rows.map(row => row.get({ plain: true }))
    }

    async get(id: string): Promise<Category> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);

        if (!data) {
          return null;
        }
    
        return data.get({ plain: true }) as Category;
    }

    async insert(data: any): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data)
        return true
    }

    async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data, { where: { id } });
        return true;
    }

    async delete(id: string): Promise<boolean> {
        await this.sequelize.models[this.modelName].update({
            status: ModelStatus.DELETED
        }, {
            where: {
                id
            }
        })
        return true
    }
}