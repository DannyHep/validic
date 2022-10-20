const trustedURLs = [
  process.env.ONE_ED_SV_FRONTEND_URL,

  process.env.PAT_AIDE_DEV_FRONTEND_URL,

  process.env.NOTIFICATION_SERVICE_URL,

  process.env.PAT_AIDE_INT_LAYER_URL,

  "https://oneed-development.azurewebsites.net",

  "https://patientaide2.azurewebsites.net",

  "http://localhost:3000",

  "http://localhost:3001",

  "https://demo.patientaide.co.uk",
];

export const corsConfig = {
  origin: function (origin, callback) {
    if (!origin || trustedURLs.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
};
