# fileencryption

    const encryption = require('./index.js');
    
    process.env.PRIVATEKEY = '0trebor0';

    encryption.encrypt({input:'./LICENSE',output:'./LICENSES2',key:'test'},(e)=>{
        console.log( e );

        encryption.decrypt({input:'./LICENSES2',output:'./LICENSES3',key:'test', iv:e.iv},( e )=>{
            console.log( e );
        });


    });