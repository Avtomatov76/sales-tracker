export default function GetConfiguration() {
  var baseUrl = "http://localhost:8080"; //"https://example/herokuapp.com"; "http://127.0.0.1:5000"; //

  if (process.env["DEV"])
    // NOTE - Chrome sometimes hates localhost, and never finishes requests.
    //        Try 127.0.0.1 in that case.
    baseUrl = "http://localhost:8080"; //"http://127.0.0.1:5000";

  return {
    // profile: baseUrl + "/backend/profile",
    // endpoint: baseUrl + "/graphql/",
    // clientApi: baseUrl + "/backend/",
    // imageProxy: baseUrl + "/backend/image/?url=",
    // thumbProxy: baseUrl + "/backend/thumbnail/?url=",
    // defaultImage: baseUrl + "/public/assets/thumbnail-exports/",
    // cms: "https://culturecms.herokuapp.com/",
    baseUrl: baseUrl,
  };
}
