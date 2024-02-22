import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class clientAssociate1702276850379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "client_associate",
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
            name: "phone_number",
            type: "numeric",
            length: "20",
            isUnique: true,
          },
          {
            name: "cpf",
            type: "numeric",
            length: "15",
            isUnique: true,
          },
          {
            name: "rg",
            type: "varchar",
            length: "15",
            isUnique: true,
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
      "client_associate",
      new TableColumn({
        name: "client_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "client_associate",
      new TableForeignKey({
        name: "client_fk",
        columnNames: ["client_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clients",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("client_associate", "client_fk");
    await queryRunner.dropColumn("client_associate", "client_id");
    await queryRunner.dropTable("client_associate");
  }
}
