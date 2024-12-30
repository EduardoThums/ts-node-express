import pg, { ClientConfig } from 'pg'
import { Express } from 'express'
import logger from '@services/logger'
// import { Client } from '@types/pg'
const { Client } = pg

let config: ClientConfig

export function configure(app: Express){
    config = {
        user: app.locals.config.get('DB_USER'),
        password: app.locals.config.get('DB_PASSWORD'),
        host: app.locals.config.get('DB_HOST'),
        port: app.locals.config.get('DB_PORT'),
        database: app.locals.config.get('DB_NAME')    
    }
}

export async function withTransaction(callback: (client: InstanceType<typeof Client>) => Promise<void>) {
    let client: InstanceType<typeof Client>

    try {
        client = new Client(config)
    
        await client.connect()
        
    } catch (error) {
        logger?.error("unable to connect to the client")
        throw error
        // handle with connect issue        
    }

    try {
        await client.query('BEGIN')
    
        await callback(client)
    
        await client.query('COMMIT')
            
    } catch (error) {
        await client.query('ROLLBACK')
    } finally {
        await client.end()
    }

}

// const client = new Client({
//     user: 'myuser',
//     password: 'mypassword',
//     host: 'localhost',
//     port: 5432,
//     database: 'mydatabase',
// })
// await client.connect()




// await client.end()
