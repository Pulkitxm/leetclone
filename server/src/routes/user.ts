import { Router } from "express";

const UserRouter= Router();

UserRouter.get('/login', (req, res) => {
    res.send('Hello from User Router');
});

export default UserRouter;