import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRequestTable1683150604633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'request',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
     
              },
              {
                name: 'name',
                type: 'varchar',
                length:'255',
                isNullable:true,
              },
              {
                name: 'regional_council_number',
                type: 'varchar',
                length:"20",
                isUnique:true,
                isNullable: true,
              },
              {
                name: 'regional_council',
                type: 'varchar',
                length:'50',
                isNullable: true,
              },
              {
                name: 'specialty',
                type: 'varchar',
                isArray:true,
                isNullable: true,
              },
              {
                name: 'date_of_birth',
                type: 'timestamptz',
                default: 'now()',
              },
              {
                name: 'email',
                type: 'varchar',
                length:"300",
                isUnique:true,
                isNullable: true,
              },
              {
                name: 'phone_number',
                type: 'numeric',
                length:"20",
                isUnique:true,
                isNullable: true,
              },
              {
                name: 'password',
                type: 'varchar',
                length:'200',
                isNullable: true,
              },
            ],
          }));
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('request');
        }

}
