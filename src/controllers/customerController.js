const customerModel = require("../models/customerModel");

const customerController = {}

customerController.getAll = async (req, res) => {
    try {
        const customer = await customerModel.getAll();
        res.json({
            status: "OK",
            data: customer
        });
    } catch (error) {
        res.json({
            message: "Gagal melihat data customer"
        })
    }
}

customerController.getById = async (req, res) => {
    try {
        const customerId = req.params.id
        const customer = await customerModel.findById(customerId)
        res.json({
            status: "OK",
            data: customer
        })
    } catch (error) {
        res.json({
            message: "Gagal melihat data customer"
        })
    }
}

customerController.create = async (req, res) => {
    try {
        const customerData = req.body
        const validasiEmail = /^[a-z]+@[a-z]+\.[a-z]+$/;
        if (!customerData.name) {
            res.json({
                message: "Name tidak boleh kosong dan wajib diisi"
            })
        } else if (!customerData.address) {
            res.json({
                message: "Address tidak boleh kosong dan wajib diisi"
            })
        } else if (!validasiEmail.test(customerData.email)) {
            res.json({
                message: "Email hanya berupa huruf kecil dan wajib diisi"
            })
        } else {
            const customer = await customerModel.create(customerData);
            res.json({
                status: "OK",
                message: "Data Berhasil Ditambahkan"
            })
        }
    } catch (error) {
        res.json({
            message: "Data customer gagal ditambahkan"
        })
    }
}

customerController.update = (req, res) => {
    try {
        const customerId = req.params.id
        const customerData = req.body
        const validasiEmail = /^[a-z]+@[a-z]+\.[a-z]+$/;
        if (!customerData.name) {
            res.json({
                message: "Name tidak boleh kosong dan wajib diisi"
            })
        } else if (!customerData.address) {
            res.json({
                message: "Address tidak boleh kosong dan wajib diisi"
            })
        } else if (!validasiEmail.test(customerData.email)) {
            res.json({
                message: "Email hanya berupa huruf kecil dan wajib diisi"
            })
        } else {
            const updateCustomer = customerModel.update(customerId, customerData, (err) => {
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
        return res.json({
            message: error.message
        })
    }
}

customerController.delete = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deleteCustomer = await customerModel.delete(customerId);

        res.json({
            status: "OK",
            message: "Data Berhasil Dihapus"
        })
    } catch (error) {
        res.json({
            message: "Data customer gagal dihapus"
        })
    }
}

module.exports = customerController