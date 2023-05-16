import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Director } from "./Director.model";

@Entity("movies")
export class Movie {
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

    @Column({type: "text"})
    gender: string

    @Column({
        type: "text",
        nullable: true
    })
    photo: string

    @Column({
        type: "text",
        nullable: true
    })
    movieFile: string

    @Column({ type: "int" })
    duration: number

    @ManyToOne(() => Director, (director) => director.movies)
    director: Relation<Director>
} 