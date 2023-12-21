const Post = require('../../../models/post');
const Comment =require('../../../models/comment');

module.exports.index = async function(req,res){
     
    const posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    return res.json(200, {
        message: "list of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req, res){
    try{
        //before deleting a post checking that post is avialble in the database or not 
    let post = await Post.findById(req.params.id);
    // checking the authorised person is deleting the post or not
        //.id means converting  the object id in to string beacause when you are compaprng the two object id they both need to hbe in the string format
        if(post.user == req.user.id){
            post.remove();

            //deleting the commetns also
            await Comment.deleteMany({post: req.params.id});
        
                return res.json(200, {
                    message: "Post and associated comments deleted successfully!"
                });

            }
                else{
                    return res.json(401, {
                        messege:"You can not delete this post!!"
                    });
                };
    }catch(err){
        console.log(err);
        return res.json(500, {
            messege:"Internal Server Error"
        });
    }  
 };