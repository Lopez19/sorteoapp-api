import { Router } from "express";
// Instance router
const router = Router();

// Import controllers
import * as sorteosCtrl from "../controllers/sorteos.controller";

// Import middlewares
import { authJwt } from "../middlewares";

// Routes for /api/sorteos - REST API
// Create
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  sorteosCtrl.createSorteo
);

// Read all
router.get("/", sorteosCtrl.getSorteos);

// Read one
router.get("/:sorteoId", [authJwt.verifyToken], sorteosCtrl.getSorteoById);

// Update
router.put("/:sorteoId", [authJwt.verifyToken], sorteosCtrl.updateSorteoById);

// Update Sorteo Participantes
router.put(
  "/participantes/:sorteoId",
  [authJwt.verifyToken],
  sorteosCtrl.updateSorteoParticipants
);

// Delete
router.delete(
  "/:sorteoId",
  [authJwt.verifyToken, authJwt.isAdmin],
  sorteosCtrl.deleteSorteoById
);

// Export router
export default router;
