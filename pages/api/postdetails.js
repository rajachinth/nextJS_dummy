import fs from "fs";
import path from "path";
import { cwd } from "process";

function postDetails(req, res) {
  if (req.method == "POST") {
    const dataPath = path.join(cwd(), "backend_data.json");
    console.log(dataPath); // absolute path
    /**
     * https://medium.com/hackernoon/https-medium-com-amanhimself-converting-a-buffer-to-json-and-utf8-strings-in-nodejs-2150b1e3de57#:~:text=Buffers%20can%20convert%20to%20JSON,a%20Buffer%20%2C%20and%20its%20data.
     * https://nodejs.org/api/buffer.html
     *
     *
     * In NodeJS, we can covert Buffer data to JSON or JS Object using stringify() or parse()
     *
     */
    // reading file data
    let fsContent = fs.readFileSync(dataPath); // stores data which is of type Buffer

    console.log(fsContent); // Buffer data
    // converting Buffer data to JS object
    let data = JSON.parse(fsContent); // In NodeJS we can convert Buffer data to JavaScript Object or JSON

    data.push(JSON.parse(req.body));

    // storing whole data back to file in JSON data type
    fs.writeFileSync(dataPath, JSON.stringify(data));

    res.status(200).send(JSON.stringify(data));
  }
}

export default postDetails;
