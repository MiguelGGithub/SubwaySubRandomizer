

//Check if user wants options.
const meatCheckbox = document.querySelector('#meatCheck');
const cheeseCheckbox = document.querySelector('#cheeseCheck');
const veggiesCheckbox = document.querySelector('#veggiesCheck');
const saucesCheckbox = document.querySelector('#sauceCheck');

const meatAmount = document.getElementById("meatAmount");
const cheeseAmount = document.getElementById("cheeseAmount");
const sauceAmount = document.getElementById("sauceAmount");
const vegAmount = document.getElementById("veggiesAmount");

const breadContainer = document.querySelector('.breadDisplay');
const meatContainer = document.querySelector('.meatDisplay');
const cheeseContainer = document.querySelector('.cheeseDisplay');
const veggieContainer = document.querySelector('.veggieDisplay');
const sauceContainer = document.querySelector('.sauceDisplay');

meatCheckbox.addEventListener("change", function() {
  handleCheckboxChange(meatCheckbox, meatAmount, meatContainer);
});

cheeseCheckbox.addEventListener("change", function() {
  handleCheckboxChange(cheeseCheckbox, cheeseAmount, cheeseContainer);
});

saucesCheckbox.addEventListener("change", function() {
  handleCheckboxChange(saucesCheckbox, sauceAmount, sauceContainer);
});

veggiesCheckbox.addEventListener("change", function() {
  handleCheckboxChange(veggiesCheckbox, vegAmount, veggieContainer);
});
function handleCheckboxChange(checkbox, amountInput, containerElement) {
  if (checkbox.value === "yes" && !checkbox.disabled) {
    amountInput.removeAttribute("disabled");
    amountInput.value = '1';
    containerElement.classList.remove('hidden');
  } else {
    amountInput.setAttribute("disabled", "disabled");
    amountInput.value = '';
    amountInput.placeholder = 'N';
    containerElement.classList.add('hidden');
  }
}

document.querySelector('.randomize').addEventListener('click', hideOptions)
function hideOptions(){
    document.querySelector('.selectionBox').classList.add('hidden')
    document.querySelector('.subContentDisplay').classList.remove('hidden');
}
const newSub = document.querySelector('.changeOptions');
const reset = document.querySelector('.reset')


    
    
reset.addEventListener('click', getBread)
document.querySelector('.reset').addEventListener('click', () => {
    getRandomItem('https://subwayrbackend.onrender.com/meats', meatContainer, meatAmount, 'Meats ');
    getRandomItem('https://subwayrbackend.onrender.com/cheeses', cheeseContainer, cheeseAmount, 'Cheese ');
    getRandomItem('https://subwayrbackend.onrender.com/veggies', veggieContainer, vegAmount, 'Veggies ');
    getRandomItem('https://subwayrbackend.onrender.com/sauces', sauceContainer, sauceAmount, 'Sauces ');
});
newSub.addEventListener('click', show)
function show(){
    document.querySelector('.selectionBox').classList.remove('hidden')
    document.querySelector('.subContentDisplay').classList.add('hidden');
}


document.querySelector('.randomize').addEventListener('click', getBread)
function getBread() {
  const loaderElement = document.querySelector('.loader');
  loaderElement.classList.remove('hidden'); 
    fetch('https://subwayrbackend.onrender.com/breads')
    .then(response => response.json())
    .then(breads => {
        const breadContainer = document.querySelector('.breadDisplay');
        const randomIndex = Math.floor(Math.random() * 4);
        const randomBread = breads[randomIndex];

        while (breadContainer.firstChild) {
            breadContainer.firstChild.remove();
        }

        const picture = document.createElement('img');
        const imageURL = `https://subwayrbackend.onrender.com${randomBread.picture}`;
        picture.src = imageURL;

        const name = document.createElement('h1');
        name.textContent = randomBread.name;
        const nameACal = document.createElement('div')
        const calories = document.createElement('h4');
        calories.textContent = `${randomBread.calories} Cals`;

        const category = document.createElement('h1')
        category.textContent = 'Bread '

        const div = document.createElement('div'); 

        nameACal.appendChild(name);
        nameACal.appendChild(calories);
        breadContainer.appendChild(category)
        div.appendChild(picture); 
        div.appendChild(nameACal);

        breadContainer.classList.add('slide-top');
        breadContainer.appendChild(div);
        loaderElement.classList.add('hidden'); 
    })
    .catch(error => {
        console.error('Error:', error);
        loaderElement.classList.add('hidden'); 
    });
}

document.querySelector('.randomize').addEventListener('click', getRandomItem);

function getRandomItem(apiUrl, containerElement, amountElement, category) {
  const loaderElement = document.querySelector('.loader');
  loaderElement.classList.remove('hidden');
  fetch(apiUrl)
    .then(response => response.json())
    .then(items => {
      const amountValue = amountElement.value;
      const selectedItems = [];

      while (containerElement.firstChild) {
        containerElement.firstChild.remove();
      }

      const categoryTitle = document.createElement('h1');
      categoryTitle.textContent = category;
      containerElement.appendChild(categoryTitle);

      if (amountValue != 0) {
        containerElement.classList.remove('hidden');
      }

      const availableItems = [...items]; // Create a copy of the original items array

      for (let i = 0; i < amountValue; i++) {
        if (availableItems.length === 0) {
          // If no more available items, break out of the loop
          break;
        }

        const randomIndex = Math.floor(Math.random() * availableItems.length);
        const randomItem = availableItems[randomIndex];

        const div = document.createElement('div');
        const picture = document.createElement('img');
        const imageURL = `https://subwayrbackend.onrender.com${randomItem.picture}`;
        picture.src = imageURL;

        const nameACal = document.createElement('div')
        const name = document.createElement('h1');
        const calories = document.createElement('h4');
        calories.textContent = `${randomItem.calories} Cals`;

        name.textContent = randomItem.name;
        nameACal.appendChild(name);
        nameACal.appendChild(calories);

        div.appendChild(picture);
        div.appendChild(nameACal);
        containerElement.classList.add('slide-top');
        containerElement.appendChild(div);
        loaderElement.classList.add('hidden');

        availableItems.splice(randomIndex, 1); // Remove the selected item from available items
        selectedItems.push(randomItem); // Add the selected item to the selected items array
      }
    })
    .catch(error => {
      console.error('Error:', error);
      loaderElement.classList.add('hidden');
    });
}




document.querySelector('.randomize').addEventListener('click', () => {
  getRandomItem('https://subwayrbackend.onrender.com/meats', meatContainer, meatAmount, 'Meats ');
  getRandomItem('https://subwayrbackend.onrender.com/cheeses', cheeseContainer, cheeseAmount, 'Cheese ');
  getRandomItem('https://subwayrbackend.onrender.com/veggies', veggieContainer, vegAmount, 'Veggies ');
  getRandomItem('https://subwayrbackend.onrender.com/sauces', sauceContainer, sauceAmount, 'Sauces ');
});



  
  
  
  
  
  
  

