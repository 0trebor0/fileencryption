const encryption = require('./index.js');

encryption.encrypt("0trebor0",'./LICENSE',(file,privatekey,publickey)=>{
    console.log( file, privatekey,publickey );

    encryption.decrypt(privatekey,publickey,file,( file,privatekey,publickey )=>{
        console.log( file, privatekey,publickey );
    });


});