import { mongooseConnect } from '@/lib/mongoose';
import multiparty from 'multiparty';
import { resolve } from 'styled-jsx/css';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handle(req, res){
const form = new multiparty.Form();
await mongooseConnect(); //Database connection
await isAdminRequest(req, res);// a protection for the admin request

const {fields, files} = await new Promise( (resolve, reject) =>{
     form.parse(req, (err, fields, files)=>{
        if(err) reject(err);
        resolve({fields, files});
    });

});


console.log('lenght:', files.file.length);
console.log(fields);
 //Uploading files into AWS S3 buckets 
 
res.json('OK');


}

export const confiq = {
 api: {bodyParser: false},
};