const express = require("express")
const menuController = require("../controllers/menuController")
const customerController = require("../controllers/customerController")
const categoriesController = require("../controllers/categoriesController")
const orderController = require("../controllers/ordersController")

const router = express.Router()

router.get("/menu", menuController.getAll)
router.get("/menu/:id", menuController.getById)
router.post("/menu/create", menuController.create)
router.put("/menu/update/:id", menuController.update)
router.delete("/menu/delete/:id", menuController.delete)

router.get("/customers", customerController.getAll)
router.get("/customers/:id", customerController.getById)
router.post("/customers/create", customerController.create)
router.put("/customers/update/:id", customerController.update)
router.delete("/customers/delete/:id", customerController.delete)

router.get("/categories", categoriesController.getAll)
router.get("/categories/:id", categoriesController.getById)
router.post("/categories/create", categoriesController.create)
router.put("/categories/update/:id", categoriesController.update)
router.delete("/categories/delete/:id", categoriesController.delete)

router.get("/orders", orderController.getAll)
router.post("/order/create", orderController.create)

module.exports = router