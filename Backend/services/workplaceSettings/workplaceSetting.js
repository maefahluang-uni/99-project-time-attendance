const connection = require('../../configs/database')

module.exports = {
    async findALL() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM workplace_setting";
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },

    async getById(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM workplace_setting WHERE user_id = ?";
            connection.query(sql, id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },
    
    async create(workplaceSetting) {
        try {
            return await new Promise((resolve, reject) => {
                let sql = "INSERT INTO workplace_setting SET ?";
                connection.query(sql, workplaceSetting, (err, result) => {
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

    async update(id, workplaceSetting) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE workplace_setting SET ? WHERE user_id = ?";
            connection.query(sql, [workplaceSetting, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        }).catch((err) => reject(err))
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM workplace_setting WHERE user_id = ?";
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