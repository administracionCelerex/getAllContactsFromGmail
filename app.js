const contacts = require("./contacts");
const lambda = require("./fillDBUser");
const { token } = require("./env");

const fs = require("fs");


const getContacts = async (token) => {
  const allCont = await contacts.getAllContacts(token);
  console.log(allCont);
  return allCont;
};

const writeAllContacts = async () => {
  const data = await getContacts(token);
  const contactos = JSON.stringify(data);

  fs.writeFileSync("contactos.json", contactos);
};

writeAllContacts();

/* const insertContactsToDb = async (tok) => {
  //console.log(tok)
  const conObj = await getContacts(tok);
  await lambda.callLambda(conObj);
};

insertContactsToDb(token); */
