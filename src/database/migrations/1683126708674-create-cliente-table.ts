import { type } from "os";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreateClienteTable1683126708674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'clients',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
            
              },
              {
                name: 'regular_payment',
                type: 'boolean',
                default: false,
              },
          
            ],
          }));
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('clients');
        }
}



