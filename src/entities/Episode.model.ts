import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Serie } from "./Serie.model";
import { Director } from "./Director.model";

@Entity("epsodes")
export class Episode {
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

    @Column({
        type: "text",
        nullable: true
    })
    episodeFile: string

    @Column({ type: "int" })
    duration: number

    @ManyToOne(() => Serie, (serie) => serie.epsodes)
    serie: Relation<Serie>

    @ManyToOne(() => Director, (director) => director.episode)
    director: Relation<Director>

} 