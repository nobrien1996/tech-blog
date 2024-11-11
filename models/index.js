//REQUIRES

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//USER

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});


//POST

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});


//COMMENT

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});


module.exports = { User, Post, Comment };