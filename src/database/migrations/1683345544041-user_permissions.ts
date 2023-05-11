import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class userPermissions1683345544041 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'user_permissions',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
             
            },
            {
              name: 'access_type',
              type: 'enum',
              enumName: 'access_type_enum',
              enum: [ 'permission', 'role' ],
            },
            {
              name: 'access',
              type: 'varchar',
              length: '100',
            },
            {
              name: 'is_revoked',
              type: 'boolean',
              default: 'false',
            },
          ],
        }));
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_permissions');
    }

}
