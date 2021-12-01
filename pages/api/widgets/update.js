import { connectToDatabase } from "../../../utils/mongodb";

const { ObjectId } = require("mongodb");

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const { type } = req.body;
    const _idObj = ObjectId(req.body._id);
    let response = null;

    switch (type) {
      case "CRYPTO":
        response = await db.collection("widgets").updateOne(
          { _id: _idObj },
          {
            $set: { params: { pair: req.body.pair } },
          }
        );
        res.status(200).json(response);

      case "WEATHER":
        response = await db.collection("widgets").updateOne(
          { _id: _idObj },
          {
            $set: { params: { city: req.body.city } },
          }
        );
        res.status(200).json(response);
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
