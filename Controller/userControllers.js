const ErrorHandler = require('./../utils/errorHandler')
const helper = require('./../utils/helper')
const User = require('./../Models/userModels')
const multer  = require('multer')
const path = require("path")


// const upload = multer({ dest: 'uploads/' })

exports.signIn = async(req, res, next)=>{
    try {
        const { email, password } = req.body
        if (email && password){
            const user = await User.findOne({userEmail: email})
            if(user && user._id){
                isPasswordCorrect = await helper.checkPassword(password, user.userPassword)
                if(isPasswordCorrect){
                    const tokenPayload = {
                        _id: user._id,
                        userEmail: user.userEmail
                    }
                    const token = await helper.createToken(tokenPayload)
                    res.json({
                        success: true,
                        user: user,
                        token: token
                    })
                }else{
                    return next(new ErrorHandler('Invalid Username or Password', 403))
                }

            }else{
                return next(new ErrorHandler('Invalid Username or Password', 403))
            }
        }else{
            return next(new ErrorHandler('Please provide Username and Password', 400))
        }
    } catch (error) {
        return next(error)
    }
}


exports.me = (req, res, next)=>{
    res.json({
        success: true,
        user: req.user
    })
}


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })


  var upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb){
		var filetypes = /jpeg|jpg|png/;
		var mimetype = filetypes.test(file.mimetype);

		var extname = filetypes.test(path.extname(
					file.originalname).toLowerCase());
		
		if (mimetype && extname) {
			return cb(null, true);
		}
	
		cb("Error: File upload only supports the "
				+ "following filetypes - " + filetypes);
	}
}).single("userImage");	

exports.createUser =  async(req, res, next) =>{
    try {
        const formData = req.body
        console.log('formData: ', req.body);
        const username = formData.name;
        console.log('req: ', username);
        // upload(request,response,function(err) {
            
        //     if(!err) {
        //         req.send(username)
        //     }
        //     else {
        //         console.log(req.file)
        //     }
        // })
        // console.log(data)

        // res.json({
        //     success: true
        // })
        
    } catch (error) {
        return next(error)
    }
}

