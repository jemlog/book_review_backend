const RateLimit = require('express-rate-limit')

exports.apiLimiter = new RateLimit({
  windowMs : 1000 * 60,
  max : 10,
  handler(req,res){
    res.status(this.statusCode).json({
      code : this.statusCode,
      message : '1분에 한번만 호출 가능합니다'
    })
  }
})


