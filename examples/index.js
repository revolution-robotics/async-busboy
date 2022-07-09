import asyncBusboy from "../index.js";
import http from "http";
const PORT = 8080;
const server = http
    .createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('POST request');
        asyncBusboy(req).then(function (formData) {
            // [You can put your tests here]
            console.log('Files :', formData.files);
            console.log('Fields :', formData.fields);
            // We need to emit a response so that the request doesn't hang
            res.end('It Works!! ');
        }, function (error) {
            console.log(error);
            res.end('Something broke!! ');
        });
    }
    else if (req.method === 'GET') {
        res.writeHead(200, { Connection: 'close' });
        res.end(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Async Busboy upload test</title>
          <link rel="stylesheet" href="//unpkg.com/@picocss/pico@latest/css/pico.classless.min.css">
        </head>
        <body>
          <main>
            <h1>Async Busboy upload test</h1>
            <form method="POST" enctype="multipart/form-data">
              <label>
                Choose file for upload
                <input type="file" name="filefield">
              </label>
              <label>
                A text field
                <input type="text" name="textfield" placeholder="a text field">
              </label>
              <button type="submit">Submit</button>
            </form>
          </main>
        </body>
      </html>
      `);
    }
})
    .listen(PORT, () => {
    console.log('Server listening on: http://localhost:%s', PORT);
});
