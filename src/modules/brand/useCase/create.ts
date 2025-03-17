import { v7 } from "uuid"
import { ICommandHandler } from "../../../share/interfaces"
import { CreateCommand, IBrandRepository } from "../interfaces"
import { ModelStatus } from "../../../share/models/base-model"
import { BrandCreateDTOSchema } from "../model/dto"

export class CreateNewBrandCmdHandler implements ICommandHandler<CreateCommand, string> {
    constructor(private readonly repository: IBrandRepository) {}

    async execute(cmd: CreateCommand): Promise<string> {
        const { success, data: parsedData , error } = BrandCreateDTOSchema.safeParse(cmd.dto)

        if (!success) {
            throw new Error('Invalid data')
        }

        const newId = v7()

        const brand = {
            ...parsedData,
            id: newId,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.repository.insert(brand)
        return newId
    }
}
