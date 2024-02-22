import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class createClinicAssociate1702277628722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clinic_associates",
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
      "clinic_associates",
      new TableColumn({
        name: "clinic_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "clinic_associates",
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
    await queryRunner.dropForeignKey("clinic_associates", "clinic_fk");
    await queryRunner.dropColumn("clinic_associates", "clinic_id");
    await queryRunner.dropTable("clinic_associates");
  }
}
