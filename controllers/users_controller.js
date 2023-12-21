const User = require('../models/user');

module.exports.profile = async function (req,res) {
    
    // if(req.cookies.user_id){
        const user = await User.findById(req.params.id);
        
    //      if(user){
            return res.render('user_profile',{
                title: "User Profile",
                profile_user: user
                // user: user
            })
         }
    //      return res.render('/users/sign_in');
    // }
    // else{
    //     return res.render('/users/sign_in');
    // }
   
// }

module.exports.update = async function(req,res){
    
    // if(req.user.id == req.params.id){

    //    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true
    //    });
    //     return res.redirect('back');
    // }
    // else{
    //     return res.status(401).send('Unauthorised');
    // }

    if(req.user.id === req.params.id){
        try{
            //1 find the user
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*******Multer Error: ',err)
                }
                user.name = req.body.name;
                user.email = req.body.email;

                //if there is file we are uploading it 
                if(req.file){
                    //if the user an already a avatar asssociated with it delete it 
                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                    // }
                    //this is savaing the path of the uploaded file in to the avatar field in the user 
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'unauthorized!');
        return res.status(401).send('unauthorized');
    }
}

module.exports.sign_in = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign_in', {
        title: "Sign in page"
    });
}

module.exports.sign_up = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign_up', {
        title: "Sign up page"
    });
}

module.exports.create = function(req,res){
   if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
   }

//    User.findOne({email: req.body.email}).then(()=> {return res.redirect('/users/sign_up')})
//    .catch((err)=> {console.error(err)})
    
        User.create({name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(()=> console.log("inserted"))
        .catch((err)=> {console.error(err)})
        return res.redirect('/users/sign_in');
    

   
}
//setting up actions; 
module.exports.createSession = async function(req,res){
    req.flash('success','Logged In Successfully');
    // const{email, password} = req.body;
    
    // const user = await User.findOne({email,password});
    
    // if(!user){
    //     return res.redirect('/users/sign_up');
    // }
    // else{
    //     if(user.password!=req.body.password){
    //         return res.redirect('/users/sign_up');
    //     }
    //     res.cookie('user_id', user.id);
    //     return res.redirect('/users/profile');
    // }
      //it was manual authentication

    return res.redirect('/');
    
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        req.flash('success','Logged Out Successfully');
        if (err) { console.log('error in sign out'); }
        res.redirect('/');
      });

    ;
}