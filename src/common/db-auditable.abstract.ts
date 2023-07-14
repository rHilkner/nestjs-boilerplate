import { AbstractModel } from './abstract.model';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DbAuditable extends AbstractModel {
    @CreateDateColumn()
    createdDt: Date;
    @Column()
    createdBy: string;
    @UpdateDateColumn()
    updatedDt: Date;
    @Column()
    updatedBy: string;

    protected constructor(props: {
        id: string,
        createdBy: string,
        updatedBy: string,
    }) {
        super({ id: props.id });
        this.createdBy = props.createdBy;
        this.updatedBy = props.updatedBy;
    }

    updateDbAuditable(props: { updatedBy: string }) {
        this.updatedBy = props.updatedBy;
    }
}
