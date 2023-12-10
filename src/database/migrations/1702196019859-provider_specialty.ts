import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class providerSpecialty1702196019859 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "provider_specialty",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "provider_id",
            type: "uuid",
          },
          {
            name: "specialty_id",
            type: "uuid",
          },
          {
            name: "role",
            type: "varchar",
          },
        ],
      })
    );
    await queryRunner.createForeignKeys("provider_specialty", [
      new TableForeignKey({
        name: "provider_fk",
        columnNames: ["provider_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users_profiles",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        name: "specialty_fk",
        columnNames: ["specialty_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "specialty",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("provider_specialty", "provider_fk");
    await queryRunner.dropForeignKey("provider_specialty", "specialty_fk");
    await queryRunner.dropTable("provider_specialty");
  }
}
