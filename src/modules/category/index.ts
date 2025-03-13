import { Router } from "express"
import { createCategoryApi } from "./infrastructure/create"
import { deleteCategoryApi } from "./infrastructure/delete"
import { listCategoryApi } from "./infrastructure/getList"
import { getCategoryApi } from "./infrastructure/get"
import { updateCategoryApi } from "./infrastructure/update"
import { init } from "./infrastructure/repository/dto"
import { Sequelize } from "sequelize"

export const setupCategoryModule = (sequelize: Sequelize) => {
    init(sequelize)
    const router = Router()

    router.get('/categories', listCategoryApi);
    router.get('/categories/:id', getCategoryApi);
    router.post('/categories', createCategoryApi);
    router.patch('/categories/:id', updateCategoryApi());
    router.delete('/categories/:id', deleteCategoryApi());
    return router
}