let itemList = [];

const summaryBody = document.getElementById('summeryBody');
const total = document.getElementById('total');
const clearListBtn = document.getElementById('clearListBtn');
const backButton = document.getElementById('backButton');


function updateListAndTotal() {
    displayItems(items);
    updateTotal();
}

window.addEventListener('DOMContentLoaded', function() {
    const savedItemList = sessionStorage.getItem('itemList');
    if (savedItemList) {
        itemList = JSON.parse(savedItemList);
        updateListAndTotal();
    }
});


function addItemToList(name, price) {
    let existingItem = itemList.find(item => item.name === name);

    if (existingItem) {
        existingItem.piece++;
    } else {
        itemList.push({ name, price, piece: 1 });
    }

    updateListAndTotal();
    saveItemListToSessionStorage();
}


function updateListAndTotal() {
    summaryBody.innerHTML = "";
    itemList.forEach((item, index) => {
        var row =`
            <tr>
                <td>${item.name}</td>
                <td>${item.piece}</td>
                <td>${item.price}</td>
                <td><img src="img/trash.svg" class="trashbin" data-index="${index}"></td> <!-- Az indexet adatattribútumként tároljuk -->
            </tr>
        `;
        summaryBody.innerHTML += row;
    });

    updateTotal();

    const trashbins = document.querySelectorAll('.trashbin');
    trashbins.forEach(trashbin => {
        trashbin.addEventListener('click', function(event) {
            const index = event.target.dataset.index;
            deleteItem(index);
        });
    });
}

function updateTotal() {
    var sum = 0;
    itemList.forEach(item => {
        sum += item.price * item.piece;
    });
    total.innerText = ` ${sum} Ft`;
}

clearListBtn.addEventListener('click', function() {
    itemList.length = 0;
    updateListAndTotal();
    saveItemListToSessionStorage();
});

function saveItemListToSessionStorage() {
    sessionStorage.setItem('itemList', JSON.stringify(itemList));
}


const categories = [...new Set(items.map(item => item.category))];


const categoryFilter = document.getElementById('categoryFilter');

//KATEGÓRIA NEVEK

const categoryTranslations = {
  "Soda": "Üdítő",
  "Shot": "Rövidital",
  "Longdrink": "Longdrink",
  "Water":"Víz",
  "Cocktail":"Koktél",
  "Cup":"Pohár",
  "Other":"Egyéb",
  "Beer":"Sör",
  "Energydrink":"Energiaital",
  "Spritz":"Fröccs",
  "Wine":"Bor",
  "Champagne":"Pezsgő"
};

  function filterItemsByCategory(category) {
      const filteredItems = items.filter(item => item.category === category);
    displayItems(filteredItems);
  }
  

  function displayItems(itemsToDisplay) {
      const filteredItemsContainer = document.getElementById('itemPlace');
      filteredItemsContainer.innerHTML = '';
  
      itemsToDisplay.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-item';
    card.innerHTML = `
    <div id="itemButton" class="${item.category}">
    <div class="card-body">
      <h5 class="card-title" id="itemName">${item.name}</h5>
      <h6 class="card-subtitle" id="itemAmount">${item.amount}</h6>
      <p class="card-text" id="itemPrice">${item.price} Ft</p>
    </div>
    </div>
    `;
  
          filteredItemsContainer.appendChild(card);
          card.addEventListener('click', function() {
              addItemToList(item.name, item.price);
          });
      });
};
  

  function addItemToList(name, price) {
      let existingItem = itemList.find(item => item.name === name);
  
      if (existingItem) {
          existingItem.piece++;
      } else {
          itemList.push({ name, price, piece: 1 });
      }
  
      updateListAndTotal();
      saveItemListToSessionStorage();
  }

backButton.addEventListener('click', function() {
    displayItems(items);
    
});