import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Epsode } from "./Epsode.model";
import { Director } from "./Director.model";

@Entity("series")
export class Serie {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "text",
        unique: true
    })
    title: string

    @Column({
        type: "text"
    })
    synopsis: string

    @Column({ type: "text" })
    gender: string

    @Column({
        type: "text",
        nullable: true
    })
    photo: string

    @OneToMany(() => Epsode, (epsode) => epsode.serie)
    epsodes: Epsode[]

    @ManyToOne(() => Director, (director) => director.serie)
    director: Relation<Director>
} 