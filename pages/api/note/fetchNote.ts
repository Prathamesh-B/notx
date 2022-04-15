import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
        .send({ success: false, message: "Please authenticate using a valid token" });
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
