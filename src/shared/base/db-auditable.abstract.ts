import { AbstractModel } from './abstract.model';
import { Column } from 'typeorm';

export abstract class DbAuditable extends AbstractModel {
    @Column()
    createdDt: Date;
    @Column()
    createdBy: string;
    @Column()
    updatedDt: Date;
    @Column()
    updatedBy: string;

    protected constructor(props: {
        id: string,
        createdDt: Date,
        createdBy: string,
        updatedDt: Date,
        updatedBy: string,
    }) {
        super({ id: props.id });
        this.createdDt = props.createdDt;
        this.createdBy = props.createdBy;
        this.updatedDt = props.updatedDt;
        this.updatedBy = props.updatedBy;
    }

    updateDbAuditable(props: { updatedBy: string; updatedDt: Date }) {
        this.updatedBy = props.updatedBy;
        this.updatedDt = props.updatedDt;
    }
}
