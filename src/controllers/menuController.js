const menuModel = require("../models/menuModel")

const menuController = {}

menuController.getAll = async (req, res) => {
    try {
        const menu = await menuModel.getAll();
        res.json({
            status: "OK",
            data: menu
        });
    } catch (error) {
        res.json({
            message: "Gagal melihat data menu"
        });
    }
};
// silahkan buat varian controller lain sesuai fitur masing masing
menuController.getById = async (req, res) => {
    try {
        const menuId = req.params.id
        const menu = await menuModel.findById(menuId)
        res.json({
            status: "OK",
            data: menu
        })
    } catch (error) {
        res.json({
            message: "Gagal melihat data menu"
        })
    }
}

menuController.create = async (req, res) => {
    try {
        const createData = req.body;
        const validasiHuruf = /^[a-zA-Z ]+$/;
        const validasiAngka = /^[0-9]+$/;
        if (!validasiHuruf.test(createData.item)) {
            res.json({
                message: "Item hanya menerima inputan berupa huruf dan wajib diisi"
            })
        } else if (!validasiAngka.test(createData.price)) {
            res.json({
                message: "Price hanya menerima inputan berupa angka dan wajib diisi"
            })
        } else {
            const menu = await menuModel.create(createData)
            res.json({
                status: "OK",
                message: "Data Berhasil Ditambahkan"
            })
        }
    } catch (error) {
        res.json({
            message: "Gagal menambahkan menu"
        })
    }
}

menuController.update = (req, res) => {
    try {
        const menuId = req.params.id
        const createData = req.body;
        const validasiHuruf = /^[a-zA-Z ]+$/;
        const validasiAngka = /^[0-9]+$/;
        if (!validasiHuruf.test(createData.item)) {
            res.json({
                message: "Item hanya menerima inputan berupa huruf dan wajib diisi"
            })
        } else if (!validasiAngka.test(createData.price)) {
            res.json({
                message: "Price hanya menerima inputan berupa angka dan wajib diisi"
            })
        } else {
            const updateMenu = menuModel.update(menuId, req.body, (err) => {
                if (err) {
                    res.json({
                        message: err
                    })
                } else {
                    res.json({
                        message: "Data berhasil diperbarui"
                    })
                }

            })
        }

    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

menuController.delete = async (req, res) => {
    try {
        const menuId = req.params.id
        const deleteMenu = await menuModel.delete(menuId)
        res.json({
            status: "OK",
            message: "Data Berhasil Dihapus"
        })
    } catch (error) {
        res.json({
            message: "Gagal menghapus data"
        })
    }
}


module.exports = menuController