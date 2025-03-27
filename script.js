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
    const data = await response.json();
    addFruit(data);
  } catch {}
}

// function fetchFruitData(fruit) {
//   fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
//     .then(processResponse)
//     .then((data) => addFruit(data))
//     .catch((err) => console.log(err));

//   fetch(
//     `https://pixabay.com/api/?key=49560481-dd50fb5b150dea4d442d11dba&q=${fruit}+fruit`
//   )
//     .then((respomse) => respomse.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// }

function processResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw "Error!!! - status code: " + response.status;
  }
}

function addFruit(fruit) {
  console.log(fruit);
  const li = document.createElement("li");
  li.textContent = fruit.name;
  li.addEventListener("click", removeFruit, { once: true });
  fruitList.appendChild(li);

  calories += fruit.nutritions.calories;
  // console.log("calorie infor", calories);
  fruitNutrition.textContent = calories;
}

function removeFruit(e) {
  e.target.remove();
}
