const pg = require('pg')
const fs = require('fs')
const path = require('path')
// pg setting type parsing
const { types } = pg
const timestampOID = 1114
const timestamptzOID = 1184
const dateOID = 1082
types.setTypeParser(timestampOID, (v) => v)
types.setTypeParser(timestamptzOID, (v) => v)
types.setTypeParser(dateOID, (v) => v)
const config = {
    user: 'postgres',
    database: 'db_course',
    password: 'tinh123',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
}

/*
 *- Gọi tới database postgre
 *- Lưu lại log các query đã gọi tới postgre tại models/logs/{tháng + name}postgrelog.txt
 */
const postgre = {
    run(query) {
        const pool = new pg.Pool(
            {
                user: 'postgres',
                database: 'db_course',
                password: 'tinh123',
                port: 5432,
                max: 10,
                idleTimeoutMillis: 30000,
            }
        )
        let poolClient = null
        let result = null
        let error = null
        return pool
            .connect()
            .then((pc) => (poolClient = pc))
            .then(() => poolClient.query(query))
            .then((rs) => (result = rs))
            .catch((e) => (error = e))
            .then(() => {
                if (poolClient !== null)
                    poolClient.release((err) => {
                        if (err) {
                            // cant not release PoolClient
                        }
                    })
                if (error !== null) {
                    // query fail
                    throw error
                }
               

                return result
            })
    },
}


module.exports = {
    postgre
}