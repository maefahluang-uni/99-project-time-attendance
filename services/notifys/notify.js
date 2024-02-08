const connection = require('../../configs/database')

module.exports = {
    async findALL() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM notify";
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },

    async create(notify) {
        try {
            return await new Promise((resolve, reject) => {
                let sql = "INSERT INTO notify SET ?";
                connection.query(sql, notify, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (err) {
            throw err;
        }
    },

    async update(id, notify) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE notify SET ? WHERE user_id = ?";
            connection.query(sql, [notify, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        }).catch((err) => reject(err))
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM notify WHERE user_id = ?";
            connection.query(sql, id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    }
}
