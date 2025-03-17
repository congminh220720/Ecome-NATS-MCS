import { Category } from '../model/model'
import { CategoryUpdateDTO, CategoryCondDTO, CategoryCreateDTO } from '../model/dto'
import { PagingDTO } from '../../../share/models/paging'

export interface ICategoryUseCase {
    createANewCategory: (data: CategoryCreateDTO) => Promise<string>
    updateCategory: (id: string ,data: CategoryUpdateDTO) => Promise<Boolean>
    deleteCategory: (id: string) => Promise<Boolean>
    getCategory: (id: string) => Promise<Category | null>
    listCategory: (cond: CategoryCondDTO, paging: PagingDTO) => Promise<Array<Category>>
}

export interface IRepository extends IQueryRepository, ICommandRepository {}

export  interface IQueryRepository {
    list(cond: CategoryCondDTO,  paging: PagingDTO ): Promise<Array<Category>>
    get(id: string): Promise<Category | null>
}

export interface ICommandRepository {
    insert(data: Category): Promise<Boolean>
    update(id:string, data: CategoryUpdateDTO): Promise<Boolean>
    delete(id: string): Promise<Boolean>
}