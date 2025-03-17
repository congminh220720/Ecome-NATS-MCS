import { IQueryHandler } from "../../../share/interfaces";
import { GetCommand, IBrandRepository } from "../interfaces";
import { Brand } from "../model/brand";

export class GetQueryHandler implements IQueryHandler<GetCommand, Brand | null> {
    constructor(private repository: IBrandRepository) {}

    async query(cmd: GetCommand): Promise<Brand | null> {
        return this.repository.get(cmd.id);
    }
}