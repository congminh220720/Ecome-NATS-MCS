import { Sequelize } from "sequelize";
import { modelName } from "./dto";
import { BaseRepositorySequelize } from "../../../../../share/repository/repo-sequelize";
import { Brand } from "../../../model/brand";
import { BrandUpdateDTO, BrandCondDTO } from "../../../model/dto";

export class MySQLBrandRepository extends BaseRepositorySequelize<Brand, BrandUpdateDTO, BrandCondDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelName)
    }
}