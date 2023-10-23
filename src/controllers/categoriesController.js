const categoriesModel = require("../models/categoriesModel");

const categoriesController = {}

categoriesController.getAll = async (req, res) => {
    try {
        const categori = await categoriesModel.getAll()
        res.status(200).json({
            status: "OK",
            data: categori
        })
    } catch (error) {
        res.status(500).json({
            message: "Gagal melihat data categories"
        })
    }
}

categoriesController.getById = async (req, res) => {
    try {
        const categoriesId = req.params.id
        const categori = await categoriesModel.findById(categoriesId)
        res.json({
            status: "OK",
            data: categori
        })
    } catch (error) {
        res.json({
            message: "Gagal melihat data customer"
        })
    }
}

categoriesController.create = async (req, res) => {
    try {
        const createData = req.body
        const validasiHuruf = /^[a-zA-Z ]+$/;
        if (!validasiHuruf.test(createData.name)) {
            res.json({
                message: "Name hanya menerima inputan berupa huruf dan wajib diisi"
            })
        } else {
            const categori = await categoriesModel.create(createData);
            res.status(201).json({
                status: "OK",
                message: "Data Berhasil Ditambahkan"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Data categories gagal dibuat"
        })
    }
}

categoriesController.update = (req, res) => {
    try {
        const categoriesId = req.params.id
        const createData = req.body
        const validasiHuruf = /^[a-zA-Z ]+$/;
        if (!validasiHuruf.test(createData.name)) {
            res.json({
                message: "Name hanya menerima inputan berupa huruf dan wajib diisi"
            })
        } else {
            const updateCategori = categoriesModel.update(categoriesId, createData, (err) => {
                if (err) {
                    throw err
                } else {
                    return res.json({
                        message: "Data berhasil diperbarui"
                    })
                }
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

categoriesController.delete = async (req, res) => {
    try {
        const categoriId = req.params.id;
        const deleteCategori = await categoriesModel.delete(categoriId)

        res.status(200).json({
            status: "OK",
            message: "Data Berhasil Dihapus"
        })
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus data categories"
        })
    }
}

module.exports = categoriesController