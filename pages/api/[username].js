/**
 * -> Dynamic routing works similar to Dynamic Page Routing in NextJS
 *
 * -> We can use catch-all routes i.e., [...slug] -> similar to page routing we can use same catch-all route
 *      syntax in "api" folder also.
 * -> NextJs treats "api" folder in similar way as in "page" folder
 *
 * In NodeJs::
 * req.params -> take the "/:id"
 * req.query -> takes the "?value"
 *
 * In NextJs API routing::
 * re.query takes both "params & query" values
 *
 * EXAMPLE:
 *      url-> http://localhost:3000/api/rajroyal9040?age=90
 *
 *      req.query -> { age: '90', username: 'rajroyal9040' }
 *
 */

function getUserName(req, res) {
  console.log(req.query);
  res.status(200).send(`<h1>${JSON.stringify(req.query)}</h1>`);
}

export default getUserName;
