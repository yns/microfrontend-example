const manifestName = "assets-manifest.json";
const firstMfeUrl = "http://localhost:3000/";
const secondMfeUrl = "http://localhost:3001/";
const jsKey = "main.js";
const cssKey = "main.css";

const getfirstMfe = () => {
    return fetchIt(firstMfeUrl+manifestName);
}

const getSecondMfe = () =>  {
    return fetchIt(secondMfeUrl+manifestName);
}

const fetchIt = async (path) => {
    let response = await fetch(path);
    let json;

    if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
        json = await response.json();
    } else {
       console.log("HTTP-Error: " + response.status);
    }

    return json;
}

const load = () => {
    getfirstMfe()
            .then(response => {
                let firstcssPath = firstMfeUrl + response[cssKey]; 
                addStyle(firstcssPath);

                let firstMfeContainer = document.createElement("div");
                firstMfeContainer.id = response["name"];
                let mainDiv = document.getElementById("main");
                mainDiv.appendChild(firstMfeContainer);
                
                let firstjsPath = firstMfeUrl + response[jsKey];
                addScript(firstjsPath);
            });

    getSecondMfe()
            .then(response => {
                let secondcssPath = secondMfeUrl + response[cssKey]; 
                addStyle(secondcssPath);

                let secondMfeContainer = document.createElement("div");
                secondMfeContainer.id = response["name"];
                let mainDiv = document.getElementById("main");
                mainDiv.appendChild(secondMfeContainer);
                
                let secondjsPath = secondMfeUrl + response[jsKey];
                addScript(secondjsPath);
            });

    // let firstMfeContainer = document.createElement("div");
    // firstMfeContainer.id = m1.name;

    // let secondMfeContainer = document.createElement("div");
    // secondMfeContainer.id = m2.name;

    // let mainDiv = document.getElementById("main");
    // mainDiv.appendChild(firstMfeContainer);
    // mainDiv.appendChild(secondMfeContainer);

}

const addStyle = (uri) => {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', uri);
    document.head.appendChild(link);
}

const addScript = (src, callback ) => {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload=callback;
    document.body.appendChild(s);
}

load();
  