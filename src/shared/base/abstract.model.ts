import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    protected constructor(props: { id: string }) {
        this.id = props.id;
    }

}
