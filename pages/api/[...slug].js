/**
 * -> catch-all api routes works in similar way as in "page" folder
 * -> syntax : [...<name>] -> usally called as "slug" i.e., [...slug]
 *
 * EXAMPLE:
 *      url: http://localhost:3000/api/raj/raj/raj
 *      response: {"slug":["raj","raj","raj"]}
 */

function slugPath(req, res) {
  res.status(200).send(`<h1>${JSON.stringify(req.query)}</h1>`);
}

export default slugPath;
