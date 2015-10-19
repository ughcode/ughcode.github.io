
/**
 * Run: node build ~/book/out/ughcode.html
 */

(function (fs) {

  'use strict';

  var htmlTemplate = fs.readFileSync('template.html', 'utf-8');

  var delimiter = /\n(?=<h2 id=.+<\/h2>)/;

  var inputFile = process.argv[2];

  if (!inputFile)
    throw 'Must provide input file!';

  fs.readFile(inputFile, 'utf-8', function (err, data) {
    if (err) throw err;

    var matches, thisHref;

    data
      .split(delimiter)
      .forEach(function (part, index, parts) {

        if (index === 0) { // TOC
            // fix links to not be just anchors
          part = part.replace(/<a href="#(.+)"/g, function (_match, capture) {
            return "<a href='" + capture + ".html'";
          });
        } else {

          part += "<div class='navigation'>";

          if (index > 1) { // not preface
            matches = parts[index - 1].match(/<.*id="(.+)".*>(.+)<.+/);
            part +=
              "<a href='" + matches[1] + ".html'>" + matches[2] + "</a>";
          }

          if (index < parts.length - 1) { // not last one
            matches = parts[index + 1].match(/<.*id="(.+)".*>(.+)<.+/);
            part +=
              "<a class='next' href='" + matches[1] + ".html'>" + matches[2] + "</a>";
          }

          part += "</div>";

          part +=
            "<div class='toc'><a href='TOC.html'>Table of Contents</a></div>";

        }

        part +=
          "<div class='toc'><a href='../index.html'>Home</a></div>";

        thisHref = part.match(/id="(.+)"/)[1];

        part = htmlTemplate.replace('{{content}}', part);
        fs.writeFile('www/' + thisHref + '.html', part);

      });
  });

})(
  require('fs')
);

