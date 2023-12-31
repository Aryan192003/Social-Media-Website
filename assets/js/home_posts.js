{
    let createPost =  function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },error: function(error){
                    console.log(error.responseText);
                }
            })

        });
    }

    //method to create a post in DOM
    
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id}">
        <p>
        
        <small>
            <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>    
        </small>
       
        ${post.content}
        <br>
        <small>
        ${post.user.name }
        <br>
        ${post.createdAt }
        </small>

        <small>
                            
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                0 Likes
            </a>
                            
        </small>

        </p>
        <div class="post-comments">
               
                        <form action="/comments/create" method="post">
                                <input type="text" name="content" placeholder="add comments" required >
                                <input type="hidden" name="post" value="${ post._id }">
                                 <input type="submit" value="add comment">
                        </form>
    
              
                <div class="post-comments-list">
                     <ul id="post_comments-${ post._id }">
                        
                     </ul>  
                </div>
    
        </div>
    </li>`)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }


    createPost();
}