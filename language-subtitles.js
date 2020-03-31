// ==UserScript==
// @name         New Userscript
// @grant        GM.xmlHttpRequest
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add english captions to spongebob squarepants!
// @author       Tyler Cole
// @match        http://bs.to/*
// ==/UserScript==
var index = 0;
var arrayContent = [];

function handleClick(){
    var val = document.getElementById("urlText").value;
    if(val && val!=""){
        GM.xmlHttpRequest({
            method: "GET",
            url: val,
            onload: (resp) => {
                var parser      = new DOMParser ();
                var responseDoc = parser.parseFromString (resp.responseText, "text/html");
                var content = responseDoc.getElementById("mw-content-text");
                var children = [].slice.call(content.children);
                children.shift();
                children.shift();
                children.shift();
                children.forEach((child) => {
                    if(child.tagName == 'P'){
                        arrayContent.push(child)
                    }
                });
                console.log(arrayContent);
            }
        });
    } else {
        alert("No value");
    }
}

(function() {
    'use strict';
    document.querySelector("body").insertAdjacentHTML("beforeend", '<div style="width:100%; background-color:gray; padding:20px; text-align:center"><div style="padding:5px">Enter the URL: <input id="urlText" type="text" style="width: 500px;"></div><button style="width: 650px;" id="urlSubmit">Submit</button></div>');

    var myobj = document.querySelector("#urlSubmit");
    console.log(myobj);
    myobj.addEventListener("click", () => { handleClick() });

    var secondObj = document.querySelector(".stream-content");
    secondObj.insertAdjacentHTML("afterend", '<div id="subtitle-box" style="width:100%;padding:20px;background-color: rgb(0,0,0); margin-top:0px;"></div>');

    window.onkeydown = function(key){
        console.log(key);
        if(key.keyCode == 37){
            index--;
        } else if(key.keyCode == 39){
            index++;
        }
        var subtitlebox = document.getElementById("subtitle-box")
        if(subtitlebox.childNodes.length > 2){
            subtitlebox.removeChild(subtitlebox.childNodes[0]);
        }
        document.getElementById("subtitle-box").appendChild(arrayContent[index]);
    };


