export default function GetConfiguration() {
  // On web, API requests should follow the port that served the application.
  // Native clients do not have a browser origin, so they retain the default.
  const location = typeof window !== "undefined" ? window.location : undefined;
  const port = Number(location?.port);
  const isDirectLocalDevServer =
    location?.hostname === "localhost" && port && (port < 8080 || port > 8089);
  const baseUrl =
    location?.origin && !isDirectLocalDevServer
      ? location.origin
      : "http://localhost:8080";

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
