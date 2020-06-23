const proxy = require("express-http-proxy");
const app = require("express")();
const session = require("express-session");
const Keycloak = require("keycloak-connect");

var memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "notSoSecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

var keycloak = new Keycloak({
  store: memoryStore,
});

app.use(keycloak.middleware());

app.get("/api/*", keycloak.protect(), proxy("http://localhost:3001/", {
  proxyReqPathResolver: function (req) {
    var parts = req.url.split('?');
      var queryString = parts[1];
      var updatedPath = parts[0].replace(/api/, '/');
      return updatedPath + (queryString ? '?' + queryString : '');
  }
}));
app.get("/*", keycloak.protect(), proxy("http://localhost:3000/"));

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Authproxy listening at http://%s:%s", host, port);
});
