import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie.model";
import { Episode } from "./Episode.model";

@Entity("directors")
export class Director {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "text",
        unique: true
    })
    name: string

    @Column({ type: "int" })
    dob: number

    @OneToMany(() => Movie, (movie) => movie.director)
    movies: Movie[]

    @OneToMany(() => Episode, (episode) => episode.director)
    episode: Episode[]

}