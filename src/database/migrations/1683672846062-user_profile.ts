import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class userProfile1683672846062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'users_profiles',
            columns:[
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                
                  },
                  {
                    name: 'name',
                    type: 'varchar',
                    length:'255',
                  },
                 
                  {
                    name: 'date_of_birth',
                    type: 'timestamptz',
                    default: 'now()',
                  },
                  {
                    name: 'email',
                    type: 'varchar',
                    length:"300",
                    isUnique:true,
                
                  },
                  {
                    name: 'phone_number',
                    type: 'numeric',
                    length:"20",
                    isUnique:true,
                  
                  },
                  {
                    name: 'password',
                    type: 'varchar',
                    length:"200",
                  },
                  {
                    name: 'cpf',
                    type: 'numeric',
                    length:"15",
                    isUnique:true,
                  
                  }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropTable('users_profiles');
      
    }

}
