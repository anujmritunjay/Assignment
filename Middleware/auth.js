const ErrorHandler = require('./../utils/errorHandler')
const helper = require('./../utils/helper')
const User = require('./../Models/userModels')


exports.auth = async(req, res, next) =>{
    try {
        const token = req.header('authorization')
        if(!token){
            return next(new ErrorHandler('No auth token, Access denied.', 401))
        }else{
            const jwtToken = token.split(' ')[1]
            const decode = await helper.verifyToken(jwtToken)
            const user =  await User.findOne({"_id": decode._id})
            if(user && user._id){
                req.user = user
            }else{
                return next(new ErrorHandler('Unauthorized', 401))
            }
            next();

        }
        
        // const verified = jwt.verify(token, 'mritunjay-paswan')
        // if(!verified) return next(new ErrorHandler('Token verification failed, Authorization denied.', 401))
        // req.user = verified._id
        // req.token = token;
        // next();
    } catch (error) {
        return next(error)
    }
}