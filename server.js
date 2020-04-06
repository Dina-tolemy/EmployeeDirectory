const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
   app.use(express.static("build"));
}

app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'build', 'index.html'), (err) => {
      console.log(err);
   });
});



app.listen(port, () => {
   console.log(`Server is up on port ${port}!`);
});


