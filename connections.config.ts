export default {
    dbProvider: process.env.DB_PROVIDER ?? 'sqlite',
    dbConnection: process.env.DB_STRING ?? './keystone.db'
   }