# nodejs-authproxy-keycloak

Simple Authproxy for Keycloak using nodejs and express and keycloak-connect

Use this when

* You want to have a local auth proxy that uses production near authentication
* You have some private projects that should be restricted to a defined group of people

### Getting started (VERY short)

The following instructions tell you, how to run this auth proxy locally. To get it running on a server, you will have to do some more manual steps, that are not described here. (Which include some more knowledge about networking, ssl, etc.)

Prerequisites:

* Installed Docker
* Installed NodeJs

Start a keycloak instance:

```
$ docker run -p 18080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e --name kc jboss/keycloak
```
This will run a keycloak container on port 18080. After running you will have access to the keycloak admin interface under http://localhost:18080/

* Login with admin/admin
* Configure a Realm (see https://github.com/keycloak/keycloak-nodejs-connect/tree/master/example): I called it: "my-super-realm"
* Create at least one user (and roles if needed)
* Configure a Client
  * Client  Protocol: openid-connect
  * Access Type: confidential
* Go to clients -> Installation -> Select Keycloak OIDC JSON and copy the shown content to `./keycloak.json`  
* now run `npm install`
* now run `npm start`
* Start your application that shall be proxied
* open `http://localhost:8081/`
* Login should be shown, after successful login, you should be proxied to your application

