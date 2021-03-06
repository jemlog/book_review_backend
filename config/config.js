require('dotenv').config()

module.exports = {

  development: {
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "api_server",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases : false
  },
  test: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "api_server",
    host: "127.0.0.1",
    dialect: "mysql",
    
    logging : false
  }
}


