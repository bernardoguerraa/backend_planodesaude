import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateAssociateTable1683150700382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "associates",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: true,
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
          {
            name: "specialty",
            type: "varchar",
            isArray: true,
            isNullable: true,
          },
          {
            name: "date_of_birth",
            type: "timestamptz",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.addColumn(
      "associates",
      new TableColumn({
        name: "clinic_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "associates",
      new TableForeignKey({
        name: "clinic_fk",
        columnNames: ["clinic_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clinics",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("associates", "clinic_fk");
    await queryRunner.dropColumn("associates", "clinic_id");
    await queryRunner.dropTable("associates");
  }
}
