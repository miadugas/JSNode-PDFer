const fs = require('fs')
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const convertHTMLToPDF = require("pdf-puppeteer");

const callback = function (pdf) {
writeFileAsync('githubResume.pdf', pdf);
}

let username = '';
let bio = '';
let name = '';
let location = '';
let profile = '';
let picture = '';
let followers = 0;
let following = 0;
let repos = 0;
// let starsLink = '';
// let stars = 0;

function getGithub(){
return inquirer
    .prompt({
    message: "Enter your GitHub username",
    name: "username"
    })
    .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios
    .get(queryUrl)
    .then(function(res) {
        const results = res.data;
        console.log(results);
        name = results.name;
        username = results.login;
        location = results.location;
        profile = results.html_url;
        bio = results.bio;
        followers = results.followers;
        following = results.following;
        repos = results.public_repos;
        picture = results.avatar_url;
        const html = generateHTML(name, username, bio, location, profile, following, followers, repos, picture);
        convertHTMLToPDF(html, callback);
    });
    });
}

function generateHTML(name, username, bio, location, profile, following, followers, repos, picture) {
    // const colors = {
    // green: {
    //     wrapperBackground: "#E6E1C3",
    //     headerBackground: "#C1C72C",
    //     headerColor: "black",
    //     photoBorderColor: "#black"
    // },
    // blue: {
    //     wrapperBackground: "#5F64D3",
    //     headerBackground: "#26175A",
    //     headerColor: "white",
    //     photoBorderColor: "#73448C"
    // },
    // pink: {
    //     wrapperBackground: "#879CDF",
    //     headerBackground: "#FF8374",
    //     headerColor: "white",
    //     photoBorderColor: "#FEE24C"
    // },
    // red: {
    //     wrapperBackground: "#DE9967",
    //     headerBackground: "#870603",
    //     headerColor: "white",
    //     photoBorderColor: "white"
    // }
    // };
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>JSNode | PDFer</title>
        <style>
        
@page {
    margin: 0;
}
        
html, body {
    padding: 10px;
    margin: 10px;
}
        
.wrapper {
    background-color: #011627;
    padding-top: 120px;
}

body {
    background-color: black;
    -webkit-print-color-adjust: exact !important;
    font-family: 'Raleway', sans-serif;
}

main {
    background-color: black;
    height: auto;
    padding-top: 30px;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Raleway', sans-serif;
    margin: 0;
}

h1 {
    font-size: 32px;
}

h2 {
    font-size: 24px;
}

h3 {
    font-size: 16px;
}

h4 {
    font-size: 16px;
}

h5 {
    font-size: 16px;
}

h6 {
    font-size: 16px;
    }

.pic-header {
    position: relative;
    margin: 0 auto;
    margin-bottom: -50px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #D496A7;
    color: black;
    padding: 10px;
    width: 95%;
    border-radius: 6px;
}

.pic-header img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: -75px;
    border: 6px solid black;
    box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
}

.pic-header h1, .pic-header h2 {
    width: 100%;
    text-align: center;
}

.pic-header h1 {
    margin-top: 10px;
}

.addInfo {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    font-size: 1.1em;
}

.infoAdd {
    display: inline-block;
    margin: 5px 10px;
}

.workExp-date {
    font-style: italic;
    font-size: .7em;
    text-align: right;
    margin-top: 10px;
}

.container {
    padding: 50px;
    padding-left: 100px;
    padding-right: 100px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
}

.info {
    padding: 20px;
    border-radius: 6px;
    flex-basis: 45%;
    background-color: #D496A7;
    margin: 0 auto;
    margin-top: 100px;
    margin-left: 30px;
    margin-bottom: 30px;
    background-color: #D496A7;
    color: black;
}
        
.col {
    flex: 1;
    text-align: center;
}

a, a:hover {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
}

@media print { 
    body { 
    zoom: .75; 
    } 
}
    
</style>
    <!-- Bootstrap CSS CDN -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <!-- Googel Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
    
    <!-- Core Stylesheet -->
    <link rel="stylesheet" href="./style.css">
    
    </head>
    <body>
        <div class="wrapper">
            <div class="main">
            <div class="pic-header">
            <img src = ${picture}/>
            <h1>${name}</h1>
            <h2>${username}</h2>
            <h2>${bio}</h2>
            <div class="addInfo">
                    <!-- <div class="links-nav"> -->
            <div class="infoAdd">
                    <!-- <div class="nav-link"> -->
            <a href='https://github.com/miadugas'>Github</a><br>
            https://github.com/miadugas
            </div>
            <div class="nav-link">
                    <!-- <div class="nav-link"> -->
                    <a href='${profile}'>Github</a><br>
                    ${profile}
                    </div>
<div class="nav-link">
    <a href="https://www.google.com/maps/place/${location}">Location</a><br>
                ${location}
                </div>
    </div>
    </div>
    <div class="row">
        <div class="card">
        <h2>Followers: ${followers}</h2>
        <h2>Following: ${following}</h2>
        </div>
        <div class="card">
        <h2>Repos: ${repos}</h2>
        </div>
        </div>

    </body>
    </html>
    `
    }

    async function init(){
    try{
        await getGithub();
    
    }catch(error){
        console.log(error);
    }
    }
    
    init();
