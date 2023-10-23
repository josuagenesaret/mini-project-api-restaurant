const db = require("../../db/config");

const customerModel = {}
customerModel.getAll = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer"

        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

customerModel.findById = (data) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer WHERE id = ?"

        db.get(query, [data], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

customerModel.create = (data) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO customer (name, address, email) VALUES (?, ?, ?)";
        const values = [data.name, data.address, data.email];

        db.run(query, values, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

customerModel.update = (id, data, callback) => {
    const query = "UPDATE customer SET name = ?, address = ?, email = ? WHERE id = ?";
    const values = [data.name, data.address, data.email, id]

    return db.run(query, values, (err, rows) => {
        if (err) {
            callback(err)
        } else {
            callback(rows);
        }
    })
}

customerModel.delete = (data) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM customer WHERE id =?"

        db.run(query, [data], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}


module.exports = customerModel