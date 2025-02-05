import { Router } from "express"
import authorizationControl from "../controller/authorization.control";
import { verifyUser } from "../midleware/verification.midleware";

export const authorRoute = () => {
    const router=Router();

    router.post("/new", authorizationControl.signUp);
    router.post("/", authorizationControl.signIn);
    router.patch("/", verifyUser, authorizationControl.updateUser)

    return router;
}