import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Episode } from "./Episode.model";

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

    @OneToMany(() => Episode, (episode) => episode.serie)
    epsodes: Episode[]
} 