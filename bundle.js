(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");

fruitForm.addEventListener("submit", extractFruit);

let calories = 0;

function extractFruit(e) {
  e.preventDefault();
  fetchFruitData(e.target[0].value);
  e.target[0].value = "";
}

async function fetchFruitData(fruit) {
  try {
    const response = await fetch(
      `https://fruit-api-5v0j.onrender.com/fruits/${fruit}`
    );
    const responseImage = await fetch(
      `https://pixabay.com/api/?key=49560513-12d40ed63b48b95ec83f288e3&q=${fruit}+fruit`
    );

    const data = await response.json();
    const imageData = await responseImage.json();
    addFruit(data, imageData);
  } catch (err) {
    console.log(err);
  }
}

// function fetchFruitData(fruit) {
//     fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
//         .then(processResponse)
//         .then((data) => addFruit(data))
//         .catch((err) => console.log(err));

//     fetch(`https://pixabay.com/api/?key=49560513-12d40ed63b48b95ec83f288e3&q=${fruit}+fruit`)
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((err) => console.log(err))
// }

function processResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw "Error - status code: " + response.status;
  }
}

function addFruit(fruit, imageData) {
  console.log(fruit);
  console.log(imageData);
  //const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = imageData.hits[0].previewURL;
  //li.textContent = fruit.name;
  //li.addEventListener("click", removeFruit, { once: true });
  img.addEventListener("click", removeFruit, { once: true });
  //fruitList.appendChild(li);
  fruitList.appendChild(img);

  calories += fruit.nutritions.calories;
  // console.log("calorie infor", calories);
  fruitNutrition.textContent = calories;
}

function removeFruit(e) {
  e.target.remove();
}

},{}]},{},[1]);
