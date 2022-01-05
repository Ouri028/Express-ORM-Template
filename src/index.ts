import "reflect-metadata";
import { createConnection } from "typeorm";
// import { User } from "./entity/User";
import { server } from "./express/server/server";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
    path: path.join(__dirname, "../.env")
});
const PORT = process.env.PORT;


createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    server.listen(PORT, () => console.info(`[EXPRESS] Running on port ${PORT}`));

}).catch(error => console.log(error));
