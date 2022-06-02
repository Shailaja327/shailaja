const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "goodreads.db");
const app = express();
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost/Books/");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
app.get("/books/", async (request, response) => {
  const getBooksQuery = `
   SELECT * FROM
   book ORDERBY book_id;`;
  const booksArray = await bd.all(getBooksQuery);
  response.send(booksArray);
});
