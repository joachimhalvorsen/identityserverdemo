/// <reference path="oidc-client.js" />

function log() {
    document.getElementById('results').innerText = '';

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('results').innerHTML += msg + '\r\n';
    });
}

document.getElementById("login").addEventListener("click", login, false);
document.getElementById("get").addEventListener("click", identityGet, false);
document.getElementById("post").addEventListener("click", identityPost, false);
document.getElementById("logout").addEventListener("click", logout, false);


var config = {
    authority: "http://localhost:5000/",
    client_id: "javascriptclient",
    redirect_uri: "http://localhost:5002/callback.html",
    response_type: "id_token token",
    scope:"openid profile userapi.read_access",
};

Oidc.Log.logger = console;
var mgr = new Oidc.UserManager(config);

mgr.getUser().then(function (user) {
    
    if (user) {
        log("User logged in", user);
    }
    else {
        log("User not logged in");
    }
});

function login() {
    mgr.signinRedirect();
}

function identityGet() {
    callApi("identity", "GET");
}

function identityPost() {
    callApi("identity", "POST");
}

function callApi(path, method) {
    
    mgr.getUser().then(function (user) {
        var url = "http://localhost:5001/" + path;

        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            log(url + " (" + method +")", xhr.status + " (" + xhr.statusText + ")", xhr.responseText);
        }
        if(user != null){
            xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        }
        xhr.send();
    });
}

function logout() {
    mgr.signoutRedirect();
}