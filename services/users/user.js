const connection = require('../../configs/database')

module.exports = {
    async findALL() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users";
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
            let sql = "SELECT * FROM users WHERE user_id = ?";
            connection.query(sql, id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },
    
    async getPendingOfficer(acc_status) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE account_status = 'pending'";
            connection.query(sql, acc_status, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },

    async getOfficer(acc_status) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE account_status = 'accept'";
            connection.query(sql, acc_status, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },

    async create(user) {
        try {
            return await new Promise((resolve, reject) => {
                let sql = "INSERT INTO users SET ?";
                connection.query(sql, user, (err, result) => {
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

    async update(id, user) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET ? WHERE user_id = ?";
            connection.query(sql, [user, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        }).catch((err) => reject(err))
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM users WHERE user_id = ?";
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