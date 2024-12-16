document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/monsters';
  
    // Load the first 50 monsters
    fetch(`${baseUrl}?_limit=50&_page=1`)
      .then(response => response.json())
      .then(data => displayMonsters(data));
  
    // Create monster form
    createMonsterForm();
  
    // Add pagination
    addPagination();
  });
  
  function displayMonsters(monsters) {
    const container = document.querySelector('#monster-container');
    monsters.forEach(monster => {
      const monsterDiv = document.createElement('div');
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description}</p>
      `;
      container.appendChild(monsterDiv);
    });
  }
  
  function createMonsterForm() {
    const form = document.createElement('form');
    form.id = 'monster-form';
    form.innerHTML = `
      <input id="name" placeholder="Name" />
      <input id="age" type="number" placeholder="Age" />
      <input id="description" placeholder="Description" />
      <button>Create Monster</button>
    `;
    document.querySelector('#create-monster').appendChild(form);
  
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.querySelector('#name').value;
      const age = parseFloat(document.querySelector('#age').value);
      const description = document.querySelector('#description').value;
  
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ name, age, description })
      })
        .then(response => response.json())
        .then(newMonster => displayMonsters([newMonster]));
  
      event.target.reset();
    });
  }
  
  function addPagination() {
    const button = document.createElement('button');
    button.id = 'load-more';
    button.textContent = 'Load More Monsters';
    document.body.appendChild(button);
  
    let currentPage = 1;
  
    button.addEventListener('click', () => {
      currentPage++;
      fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
        .then(response => response.json())
        .then(data => displayMonsters(data));
    });
  }
  