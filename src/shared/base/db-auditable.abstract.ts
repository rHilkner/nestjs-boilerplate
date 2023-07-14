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
        id?: string,
        createdDt?: Date,
        createdBy?: string,
        updatedDt?: Date,
        updatedBy?: string,
    }) {
        const currentDate = new Date();
        super({ ...props });
        this.createdDt = props.createdDt ?? currentDate;
        this.createdBy = props.createdBy ?? 'SYSTEM';
        this.updatedDt = props.updatedDt ?? currentDate;
        this.updatedBy = props.updatedBy ?? 'SYSTEM';
    }
}
