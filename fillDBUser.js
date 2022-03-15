const axios = require("axios");

const callLambda = async (data) => {
  const body = data;

  if (!body) {
    return null;
  }

  try {
    const res = await axios({
      url: `https://**/replaceconnections`,
      method: "POST",
      data: body,
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

module.exports.callLambda = callLambda;
