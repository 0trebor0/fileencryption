const encryption = require('./index.js');

encryption.encrypt("0trebor0",'./LICENSE',(file,privatekey,iv)=>{
    console.log( file, privatekey,iv );

    encryption.decrypt(privatekey,iv,file,( file,privatekey,iv )=>{
        console.log( file, privatekey,iv );
    });


});