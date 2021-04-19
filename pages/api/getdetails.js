function handler(req, res) {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      res
        .status(200)
        .send(`<html><body><h1>request successful</h1></body></html>`);
      break;
    default:
      res.status(404).send({ error: "route method not handled" });
      break;
  }
}

export default handler;

/**
 * "api" folder inside the "page" folder is treated in a different way by NextJS
 * -> We can include all REST API's in this "api" folder and here we can declare a normal JS function and return the
 *      response object with JSON/HTML/XML or any other response types
 * -> All this JS files inside "api" folder are run in server and this are bundled separately and not included in
 *      normal JS front end build; this "api" bundles never reach to the client as similar to "getStaticProps() and getServerSideProps()"
 * -> We can use all nodeJS code here on this "api" folder
 * -> Routing structure for "api" folder is similar to the normal NextJS page routing.
 * -> We are exporting all functions in "api" folder as normal JS functions but not as standard React Component.
 */
