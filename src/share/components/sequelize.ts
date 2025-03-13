import {config } from 'dotenv'
import { Sequelize } from 'sequelize'

config()

export const sequelize = new Sequelize({
    database: process.env.DB_NAME || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT as string || "5432"),
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 2,
        idle: 30000
    },
    logging: false,
})