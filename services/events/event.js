const connection = require('../../configs/database')

module.exports = {
    
    async findALL() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * from event";
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },

    async create(event) {
        try {
            return await new Promise((resolve, reject) => {
                let sql = "INSERT INTO event SET ?";
                connection.query(sql, event, (err, result) => {
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

    async update(id, event) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE event SET ? WHERE user_id = ?";
            connection.query(sql, [event, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        }).catch((err) => reject(err))
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM event WHERE user_id = ?";
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
