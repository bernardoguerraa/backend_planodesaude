import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class userProfileFk1683675962306 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.addColumn('clients', new TableColumn({
            name: 'profile_id',
            type: 'uuid',
            isUnique: true,
            isNullable:true
          }));
      
        await queryRunner.createForeignKey('clients', new TableForeignKey({
            name: 'profile_fk',
            columnNames: [ 'profile_id' ],
            referencedColumnNames: [ 'id' ],
            referencedTableName: 'users_profiles',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }));
          
          await queryRunner.addColumn('doctors', new TableColumn({
            name: 'profile_id',
            type: 'uuid',
            isUnique: true,
            isNullable:true
          }));
          await queryRunner.createForeignKey('doctors', new TableForeignKey({
            name: 'profile_fk',
            columnNames: [ 'profile_id' ],
            referencedColumnNames: [ 'id' ],
            referencedTableName: 'users_profiles',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }));


          await queryRunner.addColumn('clinics', new TableColumn({
            name: 'profile_id',
            type: 'uuid',
            isUnique: true,
            isNullable:true
          }));
          await queryRunner.createForeignKey('clinics', new TableForeignKey({
            name: 'profile_fk',
            columnNames: [ 'profile_id' ],
            referencedColumnNames: [ 'id' ],
            referencedTableName: 'users_profiles',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }));


          await queryRunner.addColumn('user_permissions', new TableColumn({
            name: 'profile_id',
            type: 'uuid',
            isUnique: true,
            isNullable:true
          }));
          await queryRunner.createForeignKey('user_permissions', new TableForeignKey({
            name: 'profile_fk',
            columnNames: [ 'profile_id' ],
            referencedColumnNames: [ 'id' ],
            referencedTableName: 'users_profiles',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.dropForeignKey('clients', 'profile_fk');
        await queryRunner.dropForeignKey('doctors', 'profile_fk');
        await queryRunner.dropForeignKey('clinics', 'profile_fk');
        await queryRunner.dropForeignKey('user_permissions', 'profile_fk');
        await queryRunner.dropColumn('clients', 'profile_id');
        await queryRunner.dropColumn('doctors', 'profile_id');
        await queryRunner.dropColumn('clinics', 'profile_id');
        await queryRunner.dropColumn('user_permissions', 'profile_id');
        


        await queryRunner.createForeignKey('clients', new TableForeignKey({
          name: 'profile_fk',
          columnNames: [ 'profile_id' ],
          referencedColumnNames: [ 'id' ],
          referencedTableName: 'users_profiles',
          onUpdate: 'SET NULL',
          onDelete: 'CASCADE',
        }));
    
        await queryRunner.createForeignKey('doctors', new TableForeignKey({
          name: 'profile_fk',
          columnNames: [ 'profile_id' ],
          referencedColumnNames: [ 'id' ],
          referencedTableName: 'users_profiles',
          onUpdate: 'SET NULL',
          onDelete: 'CASCADE',
        }));
    
        await queryRunner.createForeignKey('clinics', new TableForeignKey({
          name: 'profile_fk',
          columnNames: [ 'profile_id' ],
          referencedColumnNames: [ 'id' ],
          referencedTableName: 'users_profiles',
          onUpdate: 'SET NULL',
          onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('user_permissions', new TableForeignKey({
          name: 'profile_fk',
          columnNames: [ 'profile_id' ],
          referencedColumnNames: [ 'id' ],
          referencedTableName: 'users_profiles',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }));
    }

}
