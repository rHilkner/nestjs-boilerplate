import { PrimaryGeneratedColumn } from 'typeorm';
import { uuid } from 'uuidv4';

export abstract class AbstractModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    protected constructor(props: { id?: string }) {
        this.id = props.id ?? uuid();
    }

}
