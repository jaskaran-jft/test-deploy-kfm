module.exports = {
  google: {
    API_KEY: "",
    CLIENT_ID: "",
    SECRET: "",
  },
  facebook: {
    APP_ID: "",
  },
  api: {
    // API_URL: "https://api-node.themesbrand.website",
    // API_URL: "http://192.168.68.130:3002",
    API_URL: process.env.REACT_APP_API || "https://api.teamjft.com",
  },
};
