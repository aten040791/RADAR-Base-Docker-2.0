require('dotenv').config()

const database = {
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USERNAME || 'postgresdb-user' ,
    database: process.env.POSTGRES_DB || 'managementportal' ,
    password: process.env.POSTGRES_PASSWORD || 'campro47' ,
    port: process.env.POSTGRES_PORT || 'postgresdb-user' 
}

module.exports = database