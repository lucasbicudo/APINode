import app from "./src/app.js";
const port = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.listen(port, () => {
  console.log(`Server Running in ${hostname} listen port ${port}`);
});
