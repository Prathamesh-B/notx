import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      try {
        const Password = req.headers["admin-password"];
        if (Password == process.env.ADMIN_PASSWORD) {
          const notes = await prisma.notes.findMany();
          res.status(200).json(notes);
        } else {
          res.status(401).send({ success: false, message: "access denied" });
        }
      } catch (error) {
        console.log(error);
        res
          .status(401)
          .send({ error: "Please authenticate using a valid token" });
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
