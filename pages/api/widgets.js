import { connectToDatabase } from "../../utils/mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const { user } = await getSession(req, res);

    let response = await db.collection('widgets').find({user_id: `${user.email}`}).toArray();
    console.log(response);
    res.status(200).json(response);
}