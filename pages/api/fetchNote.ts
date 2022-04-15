// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = "HELLO";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let success: boolean = false;
  console.log(req.body);
  const { authToken } = req.body;
  try {
    try {
      const UserID = jwt.verify(authToken, JWT_SECRET);
      console.log(UserID);
      const notes = await prisma.notes.findMany({
        where: {
          userId: parseInt(UserID),
        },
      });
      res.status(200).json(notes)
    } catch (error) {
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}
