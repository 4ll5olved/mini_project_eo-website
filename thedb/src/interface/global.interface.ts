import { ToLogin } from "./user.interface";

declare global {
    namespace Express {
        export interface Request {
            user?: ToLogin;
        }
    }
}