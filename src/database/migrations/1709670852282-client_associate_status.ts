import { 
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class ClientAssociateStatus1709670852282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "client_associate",
      new TableColumn({
        name: "status",
        type: "varchar",
        length: "20",
        isNullable: false,
        default: "'pending'",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("client_associate", "status");
  }
}
