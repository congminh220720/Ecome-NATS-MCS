import { config } from 'dotenv'
import express from 'express'
import  morgan from 'morgan'
import { setupCategoryHexagon } from '../src/modules/category'
import { sequelize } from './share/components/sequelize'
import { setupBrandHexagonal } from '../src/modules/brand'

config();


(async () => {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    const app = express()
    const port = process.env.PORT || 3000

    app.use(morgan('dev'))
    app.use(express.json())
    app.use('/v1', setupCategoryHexagon(sequelize))
    app.use('/v1', setupBrandHexagonal(sequelize))

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})()



