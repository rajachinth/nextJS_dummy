import { useRouter, withRouter } from "next/router";
/**
 * -> In "class components", we wrap whole component is wrapped while exporting it globally.
 *      Example:
 *                  class UserID( render(){return ()});
 *                  export default withRouter(UserID);
 * -> Now, all router object information is available on "this.props" of class component
 *
 * -> In "functional components", "useRouter" hook used to get access to "router object"
 */
export default function UserID(props) {
  const routeData = useRouter();
  console.log(routeData);
  // console.log(props.con);

  function navigateFunc() {
    routeData.replace({
      pathname: "/",
    });
  }

  return (
    <div>
      <h1>{props.id}</h1>
      <button onClick={navigateFunc}>Home Page</button>
    </div>
  );
}

/**
 * *************************** getServerSideProps() ***************************
 *
 * -> As we know data fetch in NextJs is done in two ways
 *      a) Static Generation (getStaticProps() & getStaticPaths())
 *      b) Server Side Render (getServerSideProps())
 *
 * -> With "getServerSideProps()" -> we can render the page on the server on the fly when a request is made to load
 *      the respective Page
 * -> So, we are not pre-rendering like "Static Generation"; instead we render pages on demand when a page request is triggered
 * -> "getServerSideProps()" is not pre-rendered at build time; instead it renders only on the server everytime when a
 *      request is triggered to load page
 *
 *
 */

export async function getServerSideProps(context) {
  /***************** CIRCULAR OBJECTS cant be converted to JSON *****************
   * 
   * JSON doesn't accept circular objects - objects which reference themselves. 
   * JSON.stringify() will throw an error if it comes across one of these.
   * The request (req) object is circular by nature - Node does that.
   * In this case, because you just need to log it to the console, you can use the console's native 
      stringifying and avoid using JSON:
   */

  // more on JSON.parse() & JSON.stringify() -> https://javascript.info/json

  // console.log(context);

  /**
   * "context" parameter in "getServerSideProps()" is a object passed by NextJS which has lot more properties than
   *    the "context" parameter in "getStaticProps()".
   * -> In "getServerSideProps()" -> we can access the request object and also can tweak the response object using
   *    "context" parameter available in "getServerSideProps()".
   *
   */

  let { params, req, res } = context; // similar to nodeJS-expressJS
  console.log(params, req, res);

  /**
   * -> On cotext -> we see lots of neted & complex & circular objects and all these are NodeJS object values & properties
   *
   * -> we used object destructuring method to extract "params, req, res" properties from "context" object
   *
   * -> "req & res" are similar NodeJS objects in ExpressJS framework
   *      i.e., app.post('<URL>',(req,res)=>{ })
   *
   * -> Similar to this "res and req" objects passed as properties to a function call in NodeJS-ExpressJS
   *
   */

  return { props: params };
}

/**
 * How "getServerSideProps()" behave in build process:
 * 
 * -> run command npm run build
 * 
 * ******************************************************************************************
 * 
 * Page                                       Size     First Load JS
┌ ● / (ISR: 20 Seconds)                    2.07 kB        65.2 kB
├   /_app                                  0 B            63.1 kB
├ ● /[author]                              1.72 kB        64.8 kB
├   ├ /Kewin
├   └ /John
├ ○ /404                                   1.71 kB        64.8 kB
├ ○ /blogs/[...date]                       467 B          63.6 kB
├ ○ /location/[countrycode]                377 B          63.5 kB
├ ○ /location/[countrycode]/[countryname]  389 B          63.5 kB
├ ○ /user                                  348 B          63.4 kB
└ λ /user/[id]                             372 B          63.5 kB
+ First Load JS shared by all              63.1 kB
  ├ chunks/commons.428e25.js               13.4 kB
  ├ chunks/framework.1cddd9.js             41.8 kB
  ├ chunks/main.bfa58a.js                  6.67 kB
  ├ chunks/pages/_app.28f5f9.js            529 B
  ├ chunks/webpack.50bee0.js               751 B
  └ css/6e9ef204d6fd7ac61493.css           194 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)

 * ******************************************************************************************

   -> from above we see "λ" for the "/user/[id]" which means these routes are rendered on the server on the fly 
   -> When there is a page request to these "λ lambda" routes, these are generated on the server (Just In Time)
   
 */
