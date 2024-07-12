const pool = require('./db_todo')

const findUserByEmail = async(email) => {
    try {
        const result = await pool.User.findOne({where: {email: email} })
        return result
    } catch (error) {
        console.log("failed to find user", error)
    }
}

const findUserByEmailAndPassword = async(email, password) => {
    try {
        const result = await pool.User.findOne({where: {email: email, password: password}, raw: true})
        return result
    } catch (error) {
        console.log("failed to find user", error)
    }
}

module.exports = {
    findUserByEmail,
    findUserByEmailAndPassword
}