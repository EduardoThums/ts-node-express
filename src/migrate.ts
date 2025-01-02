import runner from 'node-pg-migrate'
import { run } from 'node:test'

runner({
    // TODO: get credentials from ssm
    databaseUrl: 'postgres://myuser:mypassword@localhost:5432/mydatabase',
    migrationsTable: 'pgmigrations',
    dir: 'migrations',
    direction: 'up'
})
