import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API;

export async function getNews() {
  const getFormattedDate = (offset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    return date.toISOString().split("T")[0];
  };

  try {
    const today = getFormattedDate();
    let res = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&from=${today}&to=${today}&pageSize=1&sortBy=publishedAt&apiKey=${API_KEY}`
    );

    if (res.data.articles.length === 0) {
      const yesterday = getFormattedDate(1);
      res = await axios.get(
        `https://newsapi.org/v2/everything?q=tesla&from=${yesterday}&to=${yesterday}&pageSize=1&sortBy=publishedAt&apiKey=${API_KEY}`
      );
    }

    if (res.data.articles.length > 0) {
      return res.data.articles[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
