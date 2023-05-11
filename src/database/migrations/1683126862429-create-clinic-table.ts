import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreateClinicTable1683126862429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'clinics',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
              },
              {
                name: 'specialty',
                type: 'varchar',
                isArray:true,
                isNullable: true,
              },
      
     
            ],
          }));

     
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
      
            await queryRunner.dropTable('clinics');
        }

}
