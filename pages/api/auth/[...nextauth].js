
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ['cloudsoftconsultingltd@gmail.com']; //,'hhyonlinestore1@gmail.com', 'hhyonlinestore@gmail.com'
//const adminEmails = ['cclkd2020@gmail.com'];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
     GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks:{
    session: ({session, token, user}) => {
      if(adminEmails.includes(session?.user?.email)){
       return session;
     }else{
      return false;
     }
  }, 
},
secret: process.env.JWT_SECRET,
}
export default NextAuth(authOptions);

export async function isAdminRequest(req,res){
const session = await getServerSession(req, res, authOptions);

if( !adminEmails.includes(session?.user?.email)){
 //res.status(401);//should use  status code 401 for not an admin
 //res.end(); 
  console.log('You are not an admin');
  res.status(401);
  res.end();
  throw 'You are not an admin';
  //return false;
}
else{
//  // res.status(200);
//   //res.end();
 console.log('you are an authorized admin');
//   //return true;
}

} 