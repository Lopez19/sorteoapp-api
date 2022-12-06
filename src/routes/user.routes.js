import { Router } from "express";
// Instance router
const router = Router();

// Import controller
import * as userCtrl from "../controllers/user.controller";

// Import middlewares
import { authJwt, verifySignup } from "../middlewares";

// Routes
router.post(
  "/",
  [
    verifySignup.checkDuplicateUsernameOrEmailOrDni,
    verifySignup.checkRolesExisted,
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  userCtrl.createUser
);

router.get("/", userCtrl.getUsers);

// Export router
export default router;
