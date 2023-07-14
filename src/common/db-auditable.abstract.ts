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
        currentUserId: string,
    }) {
        super({ id: props.id });
        this.createdBy = props.currentUserId;
        this.updatedBy = props.currentUserId;
    }

    updateDbAuditable(props: { currentUserId: string }) {
        this.updatedBy = props.currentUserId;
    }
}
