import mongoose from "mongoose";

const CONNECT_DB = (url) => mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

export default CONNECT_DB;