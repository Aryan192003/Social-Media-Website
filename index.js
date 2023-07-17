const express = require('express');
const app = express();
const port = 8000;

app.use('/', require('./routes/inedx'));

app.listen(port, function(err){
    if(err){
    //console.log('Error:', err );
    console.log(`Error: ${err}`);
    }

    console.log(`Server is running at port: ${port}`);
});