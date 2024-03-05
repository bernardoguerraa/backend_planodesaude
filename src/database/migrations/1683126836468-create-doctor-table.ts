import { 
  MigrationInterface, 
  QueryRunner, 
  Table, 
  TableColumn,
  TableForeignKey
} from "typeorm";

export class CreateDoctorTable1683126836468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "doctors",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "regional_council_number",
            type: "varchar",
            length: "20",
            isUnique: true,
            isNullable: true,
          },
          {
            name: "regional_council",
            type: "varchar",
            length: "50", 
            isNullable: true, 
          },
        ],
      })
    );

    await queryRunner.changeColumn("doctors", "regional_council", new TableColumn({
      name: "regional_council",
      type: "varchar",
      length: "50",
      isNullable: true, 
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("doctors");
  }
}
