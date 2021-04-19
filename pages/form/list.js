import fs from "fs";
import path from "path";

/**
 * we cant use own API(routes in api folder) routes with fetch() inside getStaticProps() & getServerSideProps()
 *
 * only external API routes can be used with fetch() inside getStaticProps() & getServerSideProps()
 *
 * -> All JS files inside "api" folder are not included in clientside bundle and also if imported in regular
 *      React components to use any reusable NodeJS code from this "api" folder in " getStaticProps() & getServerSideProps()"
 *      will be bundled separately as "server side bundle & client side bundle"

  -> In order to get data from the file present on the root-level; since we cant send request to own API's, we can use
      NodeJs "fs" to read the data and send his data as "props" from "getStaticProps() or getServerSideProps()" to the
      React component.
 *
 */

function FormList(props) {
  // render "backend_data.json" file data
  return (
    <div>
      {/* dynamic API Routes Example using iframe */}

      <iframe
        style={{
          width: "80%",
          marginLeft: "10%",
          marginTop: "20px",
          border: "2px solid black",
        }}
        width={600}
        height={250}
        title="Dynamic API"
        src="http://localhost:3000/api/rajasekhar?age=25"
      ></iframe>

      <ul>
        {props.list.map((e, currrentIndex, array) => (
          <li key={currrentIndex}>{e.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default FormList;

export async function getStaticProps(context) {
  // use NodeJs code to get data from "backend_data.json" and transfer to React component via "props"

  let rootpath = path.join(process.cwd(), "backend_data.json");

  let fsContent = fs.readFileSync(rootpath);
  let data = JSON.parse(fsContent);

  console.log(data);
  return {
    props: {
      list: data,
    },
  };
}
