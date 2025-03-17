import { Sequelize } from "sequelize";
import { Router } from "express";
import { init } from "./infrastructure/repository/sequelize/dto";
import { MySQLBrandRepository } from "./infrastructure/repository/sequelize";
import { CreateNewBrandCmdHandler } from "./useCase/create";
import { UpdateBrandCmdHandler } from "./useCase/update";
import { DeleteBrandCmdHandler } from "./useCase/delete";
import { GetQueryHandler } from "./useCase/get";
import { ListBrandQuery } from "./useCase/list";
import { BrandHttpService } from "./infrastructure/transport/express-http";


export const setupBrandHexagonal = (sequelize: Sequelize) => {
    init(sequelize)

    const repository = new MySQLBrandRepository(sequelize)
    
    const createCmdHandler = new CreateNewBrandCmdHandler(repository)
    const updateCmdHandler = new UpdateBrandCmdHandler(repository)
    const deleteCmdHandler = new DeleteBrandCmdHandler(repository)
    const getQueryHandler = new GetQueryHandler(repository)
    const listQueryHandler = new ListBrandQuery(repository)

    const router = Router()

    const brandHttpServices = new BrandHttpService(createCmdHandler, updateCmdHandler, deleteCmdHandler, getQueryHandler, listQueryHandler)

    router.post('/brand', brandHttpServices.createAPI.bind(brandHttpServices))
    router.patch('/brand/:id', brandHttpServices.updateAPI.bind(brandHttpServices))
    router.delete('/brand/:id', brandHttpServices.deleteAPI.bind(brandHttpServices))
    router.get('/brand/:id', brandHttpServices.getAPI.bind(brandHttpServices))
    router.get('/brand', brandHttpServices.listAPI.bind(brandHttpServices))

    return router
}