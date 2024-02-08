const connection = require('../../configs/database')

module.exports = {
    async findALL() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM office_setting";
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }).catch((err) => reject(err))
    },
    async create(officeSetting) {
        try {
            return await new Promise((resolve, reject) => {
                let sql = "INSERT INTO office_setting SET ?";
                connection.query(sql, officeSetting, (err, result) => {
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
    async update(id, officeSetting) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE office_setting SET ? WHERE officeSettingID = ?";
            connection.query(sql, [officeSetting, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        }).catch((err) => reject(err))
    },
    async delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM office_setting WHERE officeSettingID = ?";
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