import { Router } from "express";
// Instance router
const router = Router();

// Import controllers
import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";

// Routes
router.post(
  "/signup",
  [
    verifySignup.checkDuplicateUsernameOrEmailOrDni,
    verifySignup.checkRolesExisted,
  ],
  authCtrl.signUp
);
router.post("/signin", authCtrl.signIn);

// Export router
export default router;
