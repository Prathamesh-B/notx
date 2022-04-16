import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (user) {
        return res.status(409).json({
          success: false,
          message: "Account with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      await prisma.user.create({
        data: {
          email: req.body.email,
          password: secPass,
        },
      });
      const Uid = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      const authtoken = jwt.sign(Uid?.id, JWT_SECRET);
      res.status(200).json({ success: true, authtoken });
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
