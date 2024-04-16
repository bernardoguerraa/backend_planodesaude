import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from "typeorm";


export class createAssociateRequest1709248552949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "associate_request",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "associate_name",
                        type: "varchar",
                        default: false,
                    },
                    {
                        name: "associate_cpf",
                        type: "numeric",
                    },
                    {
                        name: "date",
                        type: "timestamptz",
                        default: "now()",
                    },
                    
                ],
    })
);
await queryRunner.createForeignKey(
    "associate_request",
    new TableForeignKey({
      name: "profile_fk",
      columnNames: ["profile_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users_profiles",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
  );
}
    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("associate_request");
    await queryRunner.dropForeignKey("associate_request", "profile_fk");
    }

}
