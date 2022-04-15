// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  //   await prisma.user.createMany({
  //     data: [
  //       { email: "test@test.com", password: "password" },
  //       { email: "pratham@gmail.com", password: "09654" },
  //       { email: "Monket@kk.com", password: "321lol" },
  //     ],
  //   });
  if (req.method === "POST") {
    try {
      console.log(req.body)
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
      const results = await prisma.user.create({
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
      success = true;
      res.status(200).json({ success, authtoken });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }

    const allUsers = await prisma.user.findMany();
    //   const allNotes = await prisma.notes.findMany();
    //   console.log(allNotes);
    console.log(allUsers);
  } else {
    res.status(500).send("Internal Server Error");
  }
}
