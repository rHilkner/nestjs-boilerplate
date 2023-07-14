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
        currentUserId: string,
    }) {
        super();
        this.createdBy = props.currentUserId ?? 'SYSTEM';
        this.updatedBy = props.currentUserId ?? 'SYSTEM';
    }

    updateDbAuditable(props: { currentUserId: string }) {
        this.updatedBy = props.currentUserId ?? 'SYSTEM';
    }
}
