import { PagingDTOSchema } from "../../../../share/models/paging";
import { ICategoryUseCase } from "../../interfaces"
import { CategoryCreateSchema, CategoryCondSchema } from "../../model/dto"
import { Request, Response } from 'express'


export class CategoryHttpService {
    constructor (private readonly useCase: ICategoryUseCase) {}

    async createANewCategoryApi(req: Request, res: Response) {
        const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

        if (!success) {
            res.status(400).json({
              message: error.message,
            });
            return;
        }
    
        const result = await this.useCase.createANewCategory(data)
        res.status(200).json({data: result})
    }

    async updateCategoryApi(req: Request, res: Response) {
        const { id } = req.params;

        const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

        if (!success) {
            res.status(400).json({
              message: error.message,
            });
            return;
        }
    
        const result = await this.useCase.updateCategory(id, data)
        res.status(200).json({data: result})
    }

    async deleteCategoryApi(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.useCase.deleteCategory(id)
        res.status(200).json({data: result})
    }

    async getCategoryApi(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.useCase.getCategory(id)
        res.status(200).json({data: result})
    }

    async listCategoryApi(req: Request, res: Response) {
        const { success, data: paging, error } = PagingDTOSchema.safeParse(req.query);

        if (!success) {
            res.status(400).json({
              message: 'Invalid paging',
              error: error.message,
            });
      
            return;
          }

        const cond = CategoryCondSchema.parse(req.query)

        const result = await this.useCase.listCategory(cond, paging)
        res.status(200).json({ data: result, paging, filter: cond });
    }
}