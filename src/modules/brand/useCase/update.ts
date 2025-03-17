import { ICommandHandler } from "../../../share/interfaces";
import { ModelStatus } from "../../../share/models/base-model";
import { IBrandRepository, UpdateCommand } from "../interfaces";
import { BrandUpdateDTOSchema } from "../model/dto";
import { ErrBrandNotFound } from "../model/errors";


export class UpdateBrandCmdHandler implements ICommandHandler<UpdateCommand, boolean> {
    constructor(private readonly repository: IBrandRepository) { }

    async execute(cmd: UpdateCommand): Promise<boolean> {
        const { success, data: parsedData, error } = BrandUpdateDTOSchema.safeParse(cmd.dto);

        if (!success) {
            throw new Error('Invalid data');
        }

        const brand = await this.repository.get(cmd.id);
        if (!brand || brand.status === ModelStatus.DELETED) {
            throw ErrBrandNotFound
        }        
        
        const updated = await this.repository.update(cmd.id, parsedData);
        return updated;
    }
}