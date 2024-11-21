import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pagamentos') // Nome da tabela
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    transaction_amount: number;

    @Column('varchar')
    description: string;

    @Column('varchar')
    payment_method: string;

    @Column('varchar')
    status: string;

    @Column('varchar')
    payer_email: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}