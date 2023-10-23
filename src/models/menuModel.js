const db = require("../../db/config")

const menuModel = {}
menuModel.getAll = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM menu";

        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}
// lanjutkan disini
menuModel.findById = (data) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM menu WHERE id = ?"

        db.get(query, [data], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

menuModel.create = (data) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO menu (item, price) VALUES (?, ?)";
        const values = [data.item, data.price];

        db.run(query, values, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};


menuModel.update = (id, data, callback) => {
    const query = "UPDATE menu SET item = ?, price = ? WHERE id = ?";
    const values = [data.item, data.price, id];

    return db.run(query, values, (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
};


menuModel.delete = (data) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM menu WHERE id = ?";

        db.run(query, [data], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows)
            }
        })
    })
}

menuModel.findByName = (menuName, callback) => {
    return db.all(`SELECT * FROM menu WHERE item IN ('${menuName}')`, (err, rows) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, rows)
        }
    })
}

module.exports = menuModel