import * as usersDao from "./users-dao.js";
import users from "./users.js";

const AuthController = (app) => {
 const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
        res.sendStatus(409);
        return;
    }
    const createUser = req.body;
    createUser.firstName = "Default";
    createUser.lastName = "Default";
    createUser._id = (new Date()).getTime() + '';
    const newUser = usersDao.createUser(createUser);
    req.session["currentUser"] = newUser;
    res.json(newUser);
 };

 const login    = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
        req.session["currentUser"] = user;
        res.json(user);
    } else {
        res.sendStatus(404);
    }
 };
 const profile  = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log(req.session["currentUser"]);
    if (!currentUser) {
        res.sendStatus(404);
        return;
    }
    res.json(currentUser);
 };
 const logout   = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
 };
  const update = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const updatedUserInfo = req.body;
    usersDao.updateUser(currentUser._id, updatedUserInfo);
    res.json(usersDao.findUserById(currentUser._id));
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login",    login);
  app.post("/api/users/profile",  profile);
  app.post("/api/users/logout",   logout);
  app.put ("/api/users",          update);
};
export default AuthController;