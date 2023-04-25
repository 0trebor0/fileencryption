const fs = require('fs');
const crypto = require('crypto');
const serverKey = process.env.PRIVATEKEY;

var encrypt = ( object = {}, callback = null )=>{

    if( fs.existsSync(object.input) && fs.statSync(object.input).isFile() ){

        if( 'key' in object && object.key !== '' ){

        } else {
            object.key = serverKey;
        }
        if( !"output" in object || !object.output ){

            object.error = 'output name must be set';
            

            if( typeof callback === 'function' ){
             
                callback( object.error );
            
            }

        }
        
        object.key = crypto.scryptSync( object.key, 'salt', 32 );

        object.key = Buffer.from( object.key );

        let iv = crypto.randomBytes(16);

        iv = Buffer.from( iv );

        let cipher = crypto.createCipheriv('aes-256-cbc', object.key, iv);

        let readStream = fs.createReadStream(object.input);

        let writeStream = fs.createWriteStream(object.output);

        readStream.pipe(cipher).pipe(writeStream);

        writeStream.on('finish', ()=>{

            object.ok = {file:object.output,key:object.key.toString('base64'),iv:iv.toString('base64')};

            if( typeof callback === 'function' ){

                callback( object.ok );

            }
            
            writeStream.close();
            
            readStream.close();
        
        });

    } else {

        object.error = 'input was not found';
        
        if( typeof callback === 'function' ){

            callback( object.error );

        }
    
    }

}
var decrypt = ( object = {}, callback = null )=>{
    
    if( fs.existsSync( object.input) && fs.statSync( object.input).isFile() ){
    
        if( 'key' in object && object.key ){            
        } else {
            object.key = serverKey;
        }
        if( !"output" in object || !object.output ){

            object.error = 'output name must be set';

            if( typeof callback === 'function' ){

                callback(object.error);
            
            }

        }

        object.key = crypto.scryptSync( object.key, 'salt', 32 );

        object.key = Buffer.from(object.key,'base64');

        object.iv = Buffer.from( object.iv, 'base64' );

        let cipher = crypto.createDecipheriv('aes-256-cbc', object.key, object.iv );

        let readStream = fs.createReadStream( object.input );

        let writeStream = fs.createWriteStream( object.output );

        readStream.pipe( cipher ).pipe( writeStream );

        writeStream.on('finish', ()=>{

            object.ok = {file:object.output,key:object.key.toString('base64')};
            

            if( typeof callback === 'function' ){

                callback( object.ok );

            }

            writeStream.close();

            readStream.close();

        });

    } else {

        object.error = 'input was not found';

        if( typeof callback === 'function' ){

            callback(object.error);

        }
    
    }
    
    return object;

}
module.exports = {decrypt,encrypt};