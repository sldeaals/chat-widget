import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-sender-id");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const form = formidable({
      uploadDir: "./public/uploads",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing form" });
      }

      const content = fields.content ? fields.content[0] : null;
      const file = files.file ? files.file[0] : null;

      let filePath = "";
      let fileId = null;
      if (file) {
        filePath = `/uploads/${path.basename(file.filepath)}`;
        fs.renameSync(
          file.filepath,
          path.join(
            process.cwd(),
            "public/uploads",
            path.basename(file.filepath)
          )
        );

        const messageFile = await prisma.messageFile.create({
          data: {
            name: file.originalFilename,
            size: file.size,
            type: file.mimetype,
            url: filePath,
          },
        });
        fileId = messageFile.id;
      }

      const senderId = req.headers["x-sender-id"] || "anonymous";

      await prisma.message.create({
        data: {
          content,
          senderId,
          fileId,
        },
      });

      res.status(201).json({ message: "Message sent" });
    });
  } else if (req.method === "GET") {
    const messages = await prisma.message.findMany({
      include: {
        file: true,
      },
    });
    res.status(200).json(messages);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
