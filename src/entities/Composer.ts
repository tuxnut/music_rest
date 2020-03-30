import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Score } from "./Score";

@Entity()
export class Composer {
    @PrimaryGeneratedColumn()
    composer_id!: number;

    @Column()
    commonname!: string;

    @Column()
    fullname!: string;

    @Column({ nullable: true })
    dateofbirth!: Date;

    @Column({ nullable: true })
    dateofdeath!: Date;

    @Column({ nullable: true })
    nationality!: string;

    @Column({ nullable: true })
    style!: string;
    
    @OneToMany(type => Score, musicScore => musicScore.composer)
    scores!: Score[];
}
