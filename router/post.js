const express= require('express')
const router = express.Router()
const postController = require('../controller/post')
const {isLoggedIn} = require('../middleware/auth')
const {apiLimiter} = require('../middleware/rateLimit')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')
const db = require('../models')

try{
  fs.readdirSync('uploads')
}
catch(error)
{
 console.log(error);
 fs.mkdirSync('uploads')
}

AWS.config.update({
  accessKeyId : process.env.S3_ACCESS_KEY_ID,
  secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
  region : 'ap-northeast-2'
})
const upload = multer({

  storage : multerS3({
    s3 : new AWS.S3(),
    bucket : 'boardproject',
    key(req,file,cb){
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    }
  })
,limits : { fileSize : 5*1024*1024}
})


// GET /     get all post
router.get('/',isLoggedIn, apiLimiter, postController.getAll)
// GET /user/:id         get posts of user 

router.get('/user/:id', isLoggedIn,  apiLimiter, postController.getAllByUserId)
// POST /         create post 
router.post('/', isLoggedIn, apiLimiter, upload.single('img') ,postController.createPost)
// PUT  /:id       update post

router.put('/:id', isLoggedIn, apiLimiter, postController.updatePost)
// DELETE /id      delete post 

router.delete('/:id', isLoggedIn,  apiLimiter, postController.deletePost)





module.exports = router;