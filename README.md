# identityserverdemo
Demoprojects with identityserver, a js-client and an USER API


This repo includes:


IdentityServer4 Project.
The IdentityServer implementation with a few clients and API-scopes configured.
The code is build using https://github.com/IdentityServer/IdentityServer4.Templates, with command: dotnet new is4inmem

JavaScriptClient
Basic JavaScriptClient, with userlogin and buttons to make requests to the User API
Builds on example here https://github.com/IdentityServer/IdentityServer4.Samples/tree/master/Quickstarts/6_JavaScriptClient

UserAPI
A basic dotnet core API with endpoint to get user identity information

Postman-collection
A collection that can be imported into Postman requests for getting access_token and calling USerAPI