import express from "express";
import cors from "cors";
import axios from "axios";
import cheerio from "cheerio";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/", async (req, res) => {
  res.json({ message: "success" });
});

app.get("/url", async (req, res) => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  res.json(data);
});

app.get("/icon", async (req, res) => {
  const url = req.query.url as string;
  const request = new URL(url);

  let icon: { [key: string]: string | undefined } = {};

  const response = await fetch(request);
  const body = await response.text();
  const $ = cheerio.load(body);

  const faviconLink = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');
  const ogImageLink = $('meta[property="og:image"]').attr('content');

  console.log('Favicon link:', faviconLink);
  console.log('OG image link:', ogImageLink);
  icon["favicon"] = faviconLink;
  icon["ogImage"] = ogImageLink;

  res.json(icon);
});

app.get("/title", async (req, res) => {
  let title = {
    message : 200,
    title : "title"
  }

  const url = req.query.url as string;
  const request = new URL(url);
  console.log(url);

  const response = await fetch(request);
  const body = await response.text();
  const $ = cheerio.load(body);
  title['title'] = $('title').text();
  console.log(title);

  res.json(title);
});

app.get("/image", async (req, res) => {
  try {
    const url = req.query.url as string;
    console.log(url);

    const response = await fetch(url);
    const blob = await response.blob();

    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    let image = {
      message: 200,
      image: base64
    }

    res.json(image);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(5000, () => {
  console.log("Server running on localhost:5000");
});