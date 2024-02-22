import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class activity1704646912544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "activity",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "professional_name",
            type: "varchar",
            default: false,
          },
          {
            name: "patient_cpf",
            type: "numeric",
          },
          {
            name: "date",
            type: "timestamptz",
            default: "now()",
          },
          {
            name: "price",
            type: "numeric",
          },
          {
            name: "specialty",
            type: "varchar",
            default: false,
          },
          {
            name: 'medical_procedure',
            type: 'varchar',
            isNullable: false,
          },
        ],
      })
    );
    await queryRunner.addColumn(
      "activity",
      new TableColumn({
        name: "provider_id",
        type: "uuid",

        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "activity",
      new TableForeignKey({
        name: "provider_fk",
        columnNames: ["provider_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users_profiles",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.addColumn(
      "activity",
      new TableColumn({
        name: "client_id",
        type: "uuid",

        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "activity",
      new TableForeignKey({
        name: "client_fk",
        columnNames: ["client_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clients",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.addColumn(
      "activity",
      new TableColumn({
        name: "client_associate_id",
        type: "uuid",

        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "activity",
      new TableForeignKey({
        name: "client_associate_fk",
        columnNames: ["client_associate_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "client_associate",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("activity", "client_fk");
    await queryRunner.dropColumn("activity", "client_id");
    await queryRunner.dropForeignKey("activity", "provider_fk");
    await queryRunner.dropColumn("activity", "provider_id");
    await queryRunner.dropForeignKey("activity", "client_associate_fk");
    await queryRunner.dropColumn("activity", "client_associate_id");
    await queryRunner.dropTable("activity");
  }
}
