import { IQueryHandler } from "../../../share/interfaces";
import { IBrandRepository, ListCommand } from "../interfaces";
import { Brand } from "../model/brand";


export class ListBrandQuery implements IQueryHandler<ListCommand, Brand[]> {
    constructor(private repository: IBrandRepository) {}

    async query(cmd: ListCommand): Promise<Brand[]> {
        return this.repository.list(cmd.cond, cmd.paging);
    }
}