const fs = require('fs');
const crypto = require('crypto');

var encrypt = (privatekey=null,file, callback)=>{
    if( fs.existsSync(file) && fs.statSync(file).isFile() ){
        let publickey;
        publickey = crypto.randomBytes(16);
        publickey = Buffer.from( publickey );

        if( privatekey == null ){
            privatekey = crypto.scryptSync( crypto.randomBytes(16), 'salt', 32 );
        } else {
            privatekey = crypto.scryptSync( privatekey, 'salt', 32 );
        }
        privatekey = Buffer.from( privatekey );

        let cipher = crypto.createCipheriv('aes-256-cbc', privatekey, publickey);

        let readStream = fs.createReadStream(file);

        let newFilePath = file+'.encrypted';

        let writeStream = fs.createWriteStream(newFilePath);

        readStream.pipe(cipher).pipe(writeStream);

        writeStream.on('finish', ()=>{
            callback(newFilePath, privatekey.toString('base64'),publickey.toString('base64'));
        });

    } else {
        throw "File not Exists or File not Valid";
    }
}
var decrypt = ( privatekey=null,publickey=null, file, callback)=>{
    if( fs.existsSync(file) && fs.statSync(file).isFile() ){
        publickey = Buffer.from(publickey,'base64');

        privatekey = Buffer.from(privatekey,'base64');

        let cipher = crypto.createDecipheriv('aes-256-cbc', privatekey, publickey);

        let readStream = fs.createReadStream(file);

        let newFilePath = file+'.decrypted';

        let writeStream = fs.createWriteStream(newFilePath);

        readStream.pipe(cipher).pipe(writeStream);

        writeStream.on('finish', ()=>{
            callback(newFilePath, privatekey.toString('base64'),publickey.toString('base64'));
        });

    } else {
        throw "File not Exists or File not Valid";
    }
}
module.exports = {decrypt,encrypt};