import { Router } from "express"
import { init, modelName } from "./infrastructure/repository/dto"
import { Sequelize } from "sequelize"
import { CategoryHttpService } from "./infrastructure/transport/http-service"
import { CategoryUseCase } from "./usercase"
import { MySQLCategoryRepository } from "./infrastructure/repository/repo"
// import { CategoryUseCase } from "./usercase"

export const setupCategoryHexagon = (sequelize: Sequelize) => {
    init(sequelize)
    const router = Router()

    const repository = new MySQLCategoryRepository(sequelize, modelName)
    const useCase = new CategoryUseCase(repository)
    const httpServices = new CategoryHttpService(useCase)

    router.get('/categories',httpServices.listCategoryApi.bind(httpServices));
    router.get('/categories/:id',httpServices.getCategoryApi.bind(httpServices));
    router.post('/categories', httpServices.createANewCategoryApi.bind(httpServices));
    router.patch('/categories/:id',httpServices.updateCategoryApi.bind(httpServices));
    router.delete('/categories/:id',httpServices.deleteCategoryApi.bind(httpServices));
    return router
}