import { v7 } from "uuid";
import { ModelStatus } from "../../../share/models/base-model";
import { IRepository, ICategoryUseCase } from "../interfaces";
import { CategoryCondDTO, CategoryCreateDTO, CategoryUpdateDTO } from "../model/dto";
import { ErrCategoryIdNotFound } from "../model/error";
import { Category } from "../model/model";
import { PagingDTO } from "../../../share/models/paging";

export class CategoryUseCase implements ICategoryUseCase {
    constructor (private readonly repository: IRepository ) {}

    async createANewCategory(data: CategoryCreateDTO): Promise<string> {
        const newId = v7()

        const category = {
            id: newId,
            name: data.name,
            position: 0,
            description: data.description,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        
        await this.repository.insert(category)
        return newId
    }

    async updateCategory(id: string, data: CategoryUpdateDTO): Promise<boolean> {
       const category = await this.repository.get(id)
       console.log(id)

        if (!category || category.status === ModelStatus.DELETED) throw ErrCategoryIdNotFound

        await this.repository.update(id, data)
        return true
    }

    async deleteCategory(id: string): Promise<boolean> {
        const category = await this.repository.get(id)

        if (!category || category.status === ModelStatus.DELETED) throw ErrCategoryIdNotFound

        await this.repository.delete(id)
        return true
    }

    async getCategory(id: string): Promise<Category | null> {
        const category = await this.repository.get(id)
        return category || null
    }

    async listCategory(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>> {
        return this.repository.list(cond, paging)
    }
}