const {Post,User} = require('../models')



// GET /    
exports.getAll = async (req,res,next) => {
  
  try{
    const posts = await Post.findAll();
    return res.json(posts);
  }
  catch(err)
  {
   console.error(err)
   next(err)
  }
  
}

// GET /user/:id 
exports.getAllByUserId = async (req,res,next) => {

  const id = req.params.id;
  try{
       const posts = await Post.findAll({where : {UserId : id}})
       res.status(200).json(posts);
  }
  catch(error)
  {
    console.error(error)
    next(error)
  }
}

// POST /
exports.createPost = async (req,res,next) => {

  const {title, description} = req.body;
  console.log(req.file.location)
  try{
    const post = await Post.create({
      UserId : req.user.id , 
      title,
      description,
      image : req.file.location
    })
    res.redirect('/')
  }
  catch(error)
  {
    console.error(error)
    next(error)
  }
  
}

// PUT /:id
exports.updatePost = async (req,res,next) => {

  const {description} = req.body;

  try{
      const post = await Post.update({description},{where : {id : req.params.id}})
      res.json(post);
  }
  catch(error)
  {
    console.error(error)
    next(error);
  }

}

// DELETE /:id 
exports.deletePost = async (req,res,next) => {

  try{
     const post = await Post.destroy({where : {id : req.params.id}})
     return res.send({message : '삭제 완료'})
  }
  catch(error)
  {
    console.error(error)
    next(error);
  }

}