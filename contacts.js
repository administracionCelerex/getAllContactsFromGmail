const axios = require("axios");
const correo = "daniel.badial@gmail.com";
const personFields =
  "names,biographies,occupations,genders,emailAddresses,organizations,phoneNumbers,addresses,nicknames,birthdays,events,relations,memberships,metadata,userDefined";


const personFieldsShort = "names,emailAddresses,phoneNumbers";
const getContactsUser = async (token, email) => {
  let allContactsPerUSer = [];
  let nextPageToken = null;
  let iteraciones = 0;
  let isFirstTime = true;

  let paramsAxios = {
    personFields: personFields,
    sortOrder: `LAST_MODIFIED_DESCENDING`,
    pageSize: 1000,
  };
  while (nextPageToken || isFirstTime) {
    isFirstTime = false;

    if (nextPageToken) {
      paramsAxios = { ...paramsAxios, pageToken: nextPageToken };
    }
    try {
      const response = await axios({
        url: `https://people.googleapis.com/v1/people/me/connections`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: paramsAxios,
      });

      const googleObj = response.data;
      const connections = googleObj.connections;
      const maxGotContactsInRequest = connections.length;
      if (maxGotContactsInRequest < 1)
        return { isError: false, connections: [] };

      const allContactsPerUSerAux = [...allContactsPerUSer];
      allContactsPerUSer = [...allContactsPerUSerAux, ...connections];
      nextPageToken = googleObj.nextPageToken;

      console.log(nextPageToken);

      iteraciones++;
    } catch (error) {
      iteraciones++;
      console.log(error);
      console.log(error.response);
      console.log(`An Error ocurred failed to fetch Contacts ${email}`);
      return { isError: true, connections: [] };
      //return { error: true, msg: "An Error ocurred failed to fetch Contacts" }
    }
  }
  console.log(`iteraciones ${iteraciones}`);
  return { isError: false, connections: allContactsPerUSer };
};

const getAllContacts = async (token) => {
  const contactsObj = await getContactsUser(token, correo);

  if (!contactsObj.isError) {
    return {
      email: correo,
      connections: contactsObj.connections,
      type: "GMAIL",
    };
  }

  console.log("Empty");
  return {};
};

module.exports.getAllContacts = getAllContacts;
