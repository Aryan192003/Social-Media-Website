const developement = {
    name: 'developement',
    // we need to getting different password ,different files over here and access it from this part say static files that we put in
    //creating an key asset_path for the static files that we put in the index.js
    asset_path: './assets',
    //creating an key sesssion_cookie_key for the static files that we put in the index.js
    session_cookie_key: 'blahsomething',
    db: 'social_development',
    jwt_secret: 'codial',
}

const production = {
    name: 'production',
    asset_path: process.env.CODIAL_ASSET_PATH,
    session_cookie_key: process.env.CODIAL_SESSION_COOKIE_KEY,
    db: process.env.CODIAL_DB,
    jwt_secret: process.env.CODIAL_JWT_SECRET,
}
module.exports= developement;
// module.exports = eval(process.env.CODIAL_ENVIRONMENT) == undefined ? developement : eval(process.env.CODIAL_ENVIRONMENT);