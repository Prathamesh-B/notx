import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      try {
        const Password = req.headers["admin-password"];
        if (Password == process.env.ADMIN_PASSWORD) {
          await prisma.user.deleteMany({});
          await prisma.notes.deleteMany({});
          res
            .status(200)
            .json({ success: true, message: "Deleted All Records" });
        } else {
          res.status(401).send({ success: false, message: "access denied" });
        }
      } catch (error) {
        console.error(error);
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
