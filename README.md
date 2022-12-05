# fileencryption


    encryption.encrypt(PRIVATEKEY,FILEPATH,CALLBACK);
    encryption.encrypt("YOURPRIVATEKEY",'FILEPATH',(file,privatekey,iv)=>{
        console.log( file, privatekey,iv );
    });

    

    encryption.decrypt(YOURPRIVATEKEY,iv,FILEPATH,CALLBACK);
    encryption.decrypt("YOURPRIVATEKEY","iv","FILEPATH",( file,privatekey,iv )=>{
        console.log( file, privatekey,iv );
    });