const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');


module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        
        

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();
            // commentsMailer.newComment(comment);
            
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
                        

        res.redirect('/');
    }
    


}catch(err){
    console.log('error');
    return;
}
}

module.exports.destroy = async function(req,res){
    const comment = await Comment.findById(req.params.id);
    if(comment.user==req.user.id){
        let postId = comment.post;

        await comment.deleteOne({ $set: req.body });

        Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

        // CHANGE :: destroy the associated likes for this comment
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }


        req.flash('success', 'Comment deleted!');


        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}