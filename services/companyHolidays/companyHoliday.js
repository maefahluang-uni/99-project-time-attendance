const connection = require('../../configs/database')

module.exports = {
    async findALL() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM company_holiday";
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },

    async create(companyHoliday) {
        try {
            return await new Promise((resolve, reject) => {
                let sql = "INSERT INTO company_holiday SET ?";
                connection.query(sql, companyHoliday, (err, result) => {
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

    async update(id, companyHoliday) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE company_holiday SET ? WHERE user_id = ?";
            connection.query(sql, [companyHoliday, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        }).catch((err) => reject(err))
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM company_holiday WHERE user_id = ?";
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
