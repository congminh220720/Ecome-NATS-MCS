import { ICommandHandler } from "../../../share/interfaces";
import { ModelStatus } from "../../../share/models/base-model";
import { DeleteCommand, IBrandRepository } from "../interfaces";

export class DeleteBrandCmdHandler implements ICommandHandler<DeleteCommand, boolean> {
    constructor(private repository: IBrandRepository) {}

    async execute(cmd: DeleteCommand): Promise<boolean> {

        const data = await this.repository.get(cmd.id)

        console.log(ModelStatus.DELETED)
        console.log(data.status == ModelStatus.DELETED)

        if (!data || data.status == ModelStatus.DELETED) {
            throw new Error('Brand not found')
        }

        if (cmd.isHardDelete) {
            await this.repository.delete(cmd.id);
            return true;
        } else {
            await this.repository.softDelete(cmd.id);
            return true;
        }
    }
}