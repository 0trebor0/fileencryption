# fileencryption


    encryption.encrypt(PRIVATEKEY,FILEPATH,CALLBACK);
    encryption.encrypt("YOURPRIVATEKEY",'FILEPATH',(file,privatekey,publickey)=>{
        console.log( file, privatekey,publickey );
    });

    

    encryption.decrypt(YOURPRIVATEKEY,PUBLICKEY,FILEPATH,CALLBACK);
    encryption.decrypt("YOURPRIVATEKEY","PUBLICKEY","FILEPATH",( file,privatekey,publickey )=>{
        console.log( file, privatekey,publickey );
    });