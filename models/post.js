const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model{


  static init(sequelize)
  {
    return super.init({
      title : {
        type : Sequelize.STRING(50),
        allowNull : false
      },
      description : {
        type : Sequelize.TEXT,
        allowNull : false
      },
      image : {
        type : Sequelize.STRING(300),
        allowNull : true
      }
    },{
      sequelize,
      timestamps : true,
      modelName : 'Post',
      tableName : 'posts',
      paranoid : true,
      charset : 'utf8',
      collate : 'utf8_general_ci'
    })
  }

  static associate(db)
  {
    db.Post.belongsTo(db.User)
  }


}