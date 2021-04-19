import mongoose, { Schema } from "mongoose";

/**
 * -> In async function block -> all line codes executes sequentially (line-by-line) & if any promises present then JS
 *      wait untill all these promise resolves/rejects and continue with next line of code. i.e., Async function block
 *      execute code synchronously
 *
 * -> all promises line codes execute one-by-one after resolving the promises (resolve or reject)
 */

async function mongoDB(req, res) {
  let mongo;
  let getModel;
  let dataSchema;
  let dummyModel;

  try {
    mongo = await mongoose.connect(
      "mongodb+srv://raja9040:raja9040@cluster0.bgru8.mongodb.net/dummydata"
    );
    console.log("connection successful");

    // checking the existance of "dummymodel" model in DB, if not present; it throws error & catch this in "catch()" block
    try {
      getModel = mongo.model("dummymodel");
      dummyModel = getModel;
    } catch (e) {
      // catching the execption and creating a new model
      console.log(`Execption:${e}`);
      dataSchema = mongoose.Schema({
        data: Array,
      });
      dummyModel = mongoose.model("dummymodel", dataSchema);
    }

    let newData = new dummyModel({
      data: [{ username: "raja9040" }],
    });

    let savedData = await newData.save();

    // closing the connection
    mongo.connection.close().then(() => console.log("connection removed"));
    // mongoose.disconnect().then(() => console.log("connection removed"));

    res.status(200).send({ status: "success" });
  } catch (exception) {
    console.log(`connection failed: ${exception}`);
    res.status(400).send({ status: "fail" });
  }
}
export default mongoDB;
