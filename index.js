const fs = require('fs');
const crypto = require('crypto');

var encrypt = (privatekey=null,file, callback)=>{
    if( fs.existsSync(file) && fs.statSync(file).isFile() ){
        let iv = crypto.randomBytes(16);
        iv = Buffer.from( iv );

        if( privatekey == null ){
            privatekey = crypto.scryptSync( crypto.randomBytes(16), 'salt', 32 );
        } else {
            privatekey = crypto.scryptSync( privatekey, 'salt', 32 );
        }
        privatekey = Buffer.from( privatekey );

        let cipher = crypto.createCipheriv('aes-256-cbc', privatekey, iv);

        let readStream = fs.createReadStream(file);

        let newFilePath = file+'.encrypted';

        let writeStream = fs.createWriteStream(newFilePath);

        readStream.pipe(cipher).pipe(writeStream);

        writeStream.on('finish', ()=>{
            callback(newFilePath, privatekey.toString('base64'),iv.toString('base64'));
        });

    } else {
        console.log("File not Exists or File not Valid");
        callback({error:'File not Exists or File not Valid'});
    }
}
var decrypt = ( privatekey=null,iv=null, file, callback)=>{
    if( fs.existsSync(file) && fs.statSync(file).isFile() ){
        iv = Buffer.from(iv,'base64');

        privatekey = Buffer.from(privatekey,'base64');

        let cipher = crypto.createDecipheriv('aes-256-cbc', privatekey, iv);

        let readStream = fs.createReadStream(file);

        let newFilePath = file+'.decrypted';

        let writeStream = fs.createWriteStream(newFilePath);

        readStream.pipe(cipher).pipe(writeStream);

        writeStream.on('finish', ()=>{
            callback(newFilePath, privatekey.toString('base64'),iv.toString('base64'));
            //writeStream.close();
            //readStream.close();
        });

    } else {
        console.log("File not Exists or File not Valid");
        callback({error:'File not Exists or File not Valid'});
    }
}
module.exports = {decrypt,encrypt};