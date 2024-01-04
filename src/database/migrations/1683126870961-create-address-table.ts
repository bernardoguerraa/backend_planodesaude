import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateAddressTable1683126870961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "addresses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "street_name",
            type: "varchar",
            length: "500",
          },
          {
            name: "number",
            type: "smallint",
          },
          {
            name: "cep",
            type: "numeric",
            length: "10",
          },
          {
            name: "neighbourhood",
            type: "varchar",
            length: "500",
          },
          {
            name: "city",
            type: "varchar",
            length: "100",
          },
          {
            name: "state",
            type: "varchar",
            length: "25",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "clients_addresses",
        columns: [
          {
            name: "client_id",
            type: "uuid",
          },
          {
            name: "address_id",
            type: "uuid",
          },
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: "doctors_addresses",
        columns: [
          {
            name: "doctor_id",
            type: "uuid",
          },
          {
            name: "address_id",
            type: "uuid",
          },
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: "clinics_addresses",
        columns: [
          {
            name: "clinic_id",
            type: "uuid",
          },
          {
            name: "address_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKeys("clients_addresses", [
      new TableForeignKey({
        name: "client_fk",
        columnNames: ["client_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clients",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        name: "address_fk",
        columnNames: ["address_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "addresses",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    ]);
    await queryRunner.createForeignKeys("doctors_addresses", [
      new TableForeignKey({
        name: "doctor_fk",
        columnNames: ["doctor_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "doctors",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        name: "address_fk",
        columnNames: ["address_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "addresses",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    ]);
    await queryRunner.createForeignKeys("clinics_addresses", [
      new TableForeignKey({
        name: "clinic_fk",
        columnNames: ["clinic_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clinics",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        name: "address_fk",
        columnNames: ["address_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "addresses",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("clients_addresses", "client_fk");
    await queryRunner.dropForeignKey("clients_addresses", "address_fk");
    await queryRunner.dropTable("clients_addresses");
    await queryRunner.dropForeignKey("doctors_addresses", "doctor_fk");
    await queryRunner.dropForeignKey("doctors_addresses", "address_fk");
    await queryRunner.dropTable("doctors_addresses");
    await queryRunner.dropForeignKey("clinics_addresses", "clinic_fk");
    await queryRunner.dropForeignKey("clinics_addresses", "address_fk");
    await queryRunner.dropTable("clinics_addresses_addresses");
    await queryRunner.dropTable("addresses");
  }
}
