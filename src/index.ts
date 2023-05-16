import express, { json, urlencoded } from "express";
import { AppDataSource } from "./dataSource.ts";
import cors from "cors"
import { routes } from "./routes"
import { errorHandler } from "./middleware/erroHandler";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(json())
    app.use(urlencoded({ extended: true }))
    app.use(cors())

    app.use('/api', routes)
    
    app.get('/', (req, res) => {
        return res.json("Conectado");
    });
    app.use(errorHandler)

    return app.listen(process.env.PORT, () => console.log("server online"));
});