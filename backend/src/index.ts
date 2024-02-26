/**
 * Importing required modules.
 */
import express from "express";
import cors from "cors";
import axios from "axios";
import cheerio from "cheerio";

/**
 * The Express application instance.
 */
const app = express();

app.use(express.json());
app.use(cors());

/**
 * Endpoint to check if the API is running successfully.
 */
app.get("/api/", async (req, res) => {
  res.json({ message: "success" });
});

/**
 * Endpoint to fetch data from a URL.
 */
app.get("/url", async (req, res) => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  res.json(data);
});

/**
 * Endpoint to fetch the favicon and og:image links from a URL.
 */
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

/**
 * Endpoint to fetch the title from a URL.
 */
app.get("/title", async (req, res) => {
  let title = {
    message: 200,
    title: "title"
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

/**
 * Endpoint to fetch an image from a URL.
 */
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

/**
 * Start the server on localhost:5001.
 */
app.listen(5001, () => {
  console.log("Server running on localhost:5001");
});