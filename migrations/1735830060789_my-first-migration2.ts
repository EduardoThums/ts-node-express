import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('users', {
        id: {
            type: 'int',
            primaryKey: true
        }
    })

}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('users', { ifExists: true })
}
