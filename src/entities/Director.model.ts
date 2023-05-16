import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie.model";
import { Serie } from "./Serie.model";

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

    @OneToMany(() => Serie, (serie) => serie.director)
    serie: Serie[]

}