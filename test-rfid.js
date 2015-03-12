var rfid = require("./node-rfid/serial");

console.log(rfid);

rfid.connect();

rfid.on("data", function(data) {
    console.log("DATA: ", data);
});

rfid.on("connect", function() {
  console.log("connection"); 
});