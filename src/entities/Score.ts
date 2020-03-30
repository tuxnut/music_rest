import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Composer } from "./Composer";

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    score_id!: number;

    @ManyToOne(type => Composer)
    @JoinColumn({
        name: "composer_id",
        referencedColumnName: "composer_id"
    })
    composer!: Composer;

    @Column()
    title!: string;

    @Column()
    type!: string;

    @Column({ nullable: true })
    dateofcreation!: Date;

    @Column({ nullable: true })
    difficulty!: number;

    @Column({ nullable: true })
    appreciation!: number;

    @Column({ nullable: true })
    comments!: string;
}
