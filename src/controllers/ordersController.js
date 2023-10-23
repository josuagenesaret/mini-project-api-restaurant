const customerModel = require("../models/customerModel")
const menuModel = require("../models/menuModel")
const orderModel = require("../models/ordersModel")


const orderController = {}

orderController.getAll = (req, res) => {
    const data = orderModel.getAll((err, rows) => {
        if (err) {
            res.status(500).json({
                "Status": "ERROR",
                "data": err
            })
        } else {
            res.status(500).json({
                "Status": "SUCCESS",
                "data": rows
            })
        }
    })
}
orderController.create = async (req, res) => {
    const { customerId, items } = req.body
    const findCustomer = customerModel.findById(customerId, (err, rows) => {
        if (err) {
            return res.status(500).json({
                "Status": "ERROR",
                "data": err
            })
        }
    })
    const menuName = items.map((d) => d.menu)
    const mappedMenu = items.map((f) => ({
        menuName: f.menu.split(" ").join(""),
        qty: f.qty
    }))
    const groupByMenuName = mappedMenu.reduce((result, item) => {
        if (!result[item.menuName]) {
            result[item.menuName] = [];
        }
        result[item.menuName].push(item);
        return result;
    }, {});;

    const findMenu = new Promise((resolve, reject) => {
        menuModel.findByName(menuName, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
    const menus = await findMenu
    for (let data of menus) {
        const menuName = data.item.split(" ").join("")
        const insertOrder = {
            customerId: customerId,
            menuId: data.id,
            qty: groupByMenuName[menuName][0].qty
        }
        const toInsert = orderModel.create(insertOrder, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                console.log(rows);
            }
        })
    }
    res.status(201).json({
        message: "Data Berhasil Ditambahkan !"
    })
}

module.exports = orderController