const db = require("../../db/config");

const categoriesModel = {}
categoriesModel.getAll = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM categories";

        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

categoriesModel.findById = (data) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM categories WHERE id = ?"

        db.get(query, [data], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

categoriesModel.create = (data) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO categories (name) VALUES (?)";
        const values = [data.name];

        db.run(query, values, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

categoriesModel.update = (id, data, callback) => {
    const query = "UPDATE categories set name = ? WHERE id = ?";

    return db.run(query, [data.name, id], (err, rows) => {
        if (err) {
            callback(err)
        } else {
            callback(rows)
        }
    })
}

categoriesModel.delete = (data) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM categories WHERE id = ?"

        db.run(query, [data], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = categoriesModel