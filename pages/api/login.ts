import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const JWT_SECRET = "HELLO";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let success: boolean = false;
  const { email, password } = req.body;
  if (req.method === "POST") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(422).json({
          success: false,
          message: "Please try to login with correct credentials",
        });
      }
      const userPassword = user.password;
      const passwordCompare = await bcrypt.compare(password, userPassword);
      if (!passwordCompare) {
        return res.status(403).json({
          success: false,
          message: "Please try to login with correct credentials",
        });
      }
      const authtoken = jwt.sign(user.id, JWT_SECRET);
      success = true;
      res.status(200).json({ success: true, authtoken });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(500).send("Internal Server Error");
  }
}
