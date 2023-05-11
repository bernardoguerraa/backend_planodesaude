import { MigrationInterface, QueryRunner,Table, TableForeignKey } from "typeorm"

export class CreateAssociateTable1683150700382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'associates',
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
            ],
          }));

          await queryRunner.createTable(new Table({
            name: 'clinics_associates',
            columns: [
              {
                name: 'clinic_id',
                type: 'uuid',
              },
              {
                name: 'associate_id',
                type: 'uuid',
              },
            ],
          }));
      
          await queryRunner.createForeignKeys('clinics_associates', [
            new TableForeignKey({
              name: 'clinic_fk',
              columnNames: [ 'clinic_id' ],
              referencedColumnNames: [ 'id' ],
              referencedTableName: 'clinics',
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            }),
            new TableForeignKey({
              name: 'associate_fk',
              columnNames: [ 'associate_id' ],
              referencedColumnNames: [ 'id' ],
              referencedTableName: 'associates',
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            }),
          ]);
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropForeignKey('clinics_associates', 'clinic_fk');
            await queryRunner.dropForeignKey('clinics_associates', 'associate_fk');
            await queryRunner.dropTable('clinics_associates');
            await queryRunner.dropTable('associate');
        }

}
