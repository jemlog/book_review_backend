const express= require('express')
const router = express.Router()
const postController = require('../controller/post')
const {isLoggedIn} = require('../middleware/auth')
const {apiLimiter} = require('../middleware/rateLimit')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

try{
  fs.readdirSync('uploads')
}
catch(error)
{
 console.log(error);
 fs.mkdirSync('uploads')
}

const upload = multer({

  storage : multer.diskStorage({
    destination(req,file,done)
    {
      done(null,'uploads/')
  },

  filename(req,file,done){
    const ext = path.extname(file.originalname)
    done(null,path.basename(file.originalname,ext) + Date.now() + ext)
  }

}),limits : { fileSize : 5*1024*1024}
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