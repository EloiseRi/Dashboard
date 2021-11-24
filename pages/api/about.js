import { connectToDatabase } from "../../utils/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const infos = await db
    .collection("users")
    .find()
    console.log(infos)
};