import { Request, Response } from "express";
import { ICommandHandler, IQueryHandler } from "../../../../share/interfaces";
import { CreateCommand, DeleteCommand, GetCommand, ListCommand, UpdateCommand } from "../../interfaces";
import { Brand } from "../../model/brand";
import { PagingDTO, PagingDTOSchema } from "../../../../share/models/paging";


export class BrandHttpService {
    constructor (
        private readonly createNewBrandCmdHandler: ICommandHandler<CreateCommand , string>,
        private readonly updateBrandCmdHandler: ICommandHandler<UpdateCommand , boolean>,
        private readonly deleteBrandCmdHandler: ICommandHandler<DeleteCommand , boolean>,
        private readonly getBrandQueryHandler: IQueryHandler<GetCommand , Brand | null>,
        private readonly listBrandQueryHandler: IQueryHandler<ListCommand , Brand[]>
    ) {

    }

    async createAPI (req: Request, res: Response) { 
        try {
            const cmd: CreateCommand = { dto: req.body };
            const result = await this.createNewBrandCmdHandler.execute(cmd)
            res.status(201).json({ data: result });
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message,
              });
        }
    }

    async updateAPI (req: Request, res: Response) { 
        try {
            const cmd: UpdateCommand = { id: req.params.id, dto: req.body };
            await this.updateBrandCmdHandler.execute(cmd)
            res.status(200).json({data: true});
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message,
            })
        }
    }

    async deleteAPI (req: Request, res: Response) { 
        try {
            const cmd: DeleteCommand = { id: req.params.id, isHardDelete: req.query.hard === 'false' };
            await this.deleteBrandCmdHandler.execute(cmd)
            res.status(200).json({data: true});
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message,
            });
        }
    }

    async getAPI (req: Request, res: Response) { 
        try {
            const cmd: GetCommand = { id: req.params.id };
            const result = await this.getBrandQueryHandler.query(cmd)
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message,
            });
        }
    }

    async listAPI (req: Request, res: Response) { 
        try {
            const { success, data, error } = PagingDTOSchema.safeParse(req.query)

            if (!success) {
                throw new Error('Invalid data')
            }

            const cmd: ListCommand = { cond: req.query as any, paging: data };
            const result = await this.listBrandQueryHandler.query(cmd)
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(400).json({
                message: (error as Error).message,
              });
        }
    }
}


