const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.getHashPassword = async(password) =>{
    const hash = bcrypt.hashSync(password, 10);
    return hash
}

exports.checkPassword = async(password, userPassword) =>{
    const isCorrect = bcrypt.compare(password, userPassword);
    return isCorrect
}

exports.createToken = async(payload) =>{
    var token = jwt.sign(payload, 'MritunjayPaswan');
    return token;
}

exports.verifyToken = async(token) =>{
    var data = jwt.verify(token, 'MritunjayPaswan');
    return data;
}