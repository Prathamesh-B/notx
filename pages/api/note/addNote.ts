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
  const { title, note, authToken } = req.body;
  if (req.method === "POST") {
    try {
      try {
        const UserID = jwt.verify(authToken, JWT_SECRET);
        console.log(UserID);
        await prisma.notes.create({
          data: {
            title: title,
            note: note,
            userId: parseInt(UserID),
          },
        });
        return res.status(200).send({ success: true, message: "Note Added" });
      } catch (error) {
        res
          .status(401)
          .send({
            success: false,
            message: "Please authenticate using a valid token",
          });
      }
    } catch (error: any) {
      console.error(error.message);
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
}
