import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from"jsonwebtoken";
const TOKEN = Router();
const config = process.env;


TOKEN.post("/token", async (req: Request, res: Response) => {
    // Get user input
    const { user, password } = req.body;
    // Validate user input
    if (user && password) {
      if (user == config.TOKEN_USER && password == config.TOKEN_SECRET) {
        const token_user = process.env.TOKEN_USER;

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10).catch(err => console.error(err));

        // Create token
        const token = jwt.sign(
          { user: user._id },
          <jwt.Secret> process.env.TOKEN_SECRET,
          {
            expiresIn: "12h",
          }
        );

        let tokenized = {
          user: user,
          token: token
        }
        // return new user
        return res.send(tokenized).status(200);
      } else {
        return res.status(400).send({
          error: "AUTH_FAILED",
          message: "Required parameters { user: <String>, password: <String> }"
        });
      }
    }  else {
      return res.status(400).send({
        error: "AUTH_FAILED",
        message: "Required parameters { user: <String>, password: <String> }"
      });
    }
});

export {
  TOKEN
}
