const { minify } = require("html-minifier");

function minifyHTML(req, res, next) {
  const originalSend = res.send;
  res.send = function (body) {
    if (typeof body === "string") {
      body = minify(body, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }
    originalSend.call(this, body);
  };
  next();
}

module.exports = { minifyHTML };
