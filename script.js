let budget = 600000
let ownedHorses = []
let usedButtons = {}
let stableCapacity = 2
let stableCost = 30000
document.getElementById("penize").innerHTML = budget + " Kč"
document.getElementById("boxy").textContent = `Boxy: ${ownedHorses.length}/${stableCapacity}`;
function stáj() {
  document.getElementById("kone").style.display = "block"
  document.getElementById("aukce").style.display = "none"
  document.getElementById("penize").innerHTML = budget + " Kč"
  document.getElementById("boxy").textContent = `Boxy: ${ownedHorses.length}/${stableCapacity}`;
}
function aukce() {
  document.getElementById("aukce").style.display = "block"
  document.getElementById("kone").style.display = "none"
  document.getElementById("penize").innerHTML = budget + " Kč"
  document.getElementById("boxy").textContent = `Boxy: ${ownedHorses.length}/${stableCapacity}`;

}
// Pole s jmény koní
const horses = [
  "Thunderbolt",
  "Shadow King",
  "Blazing Speed",
  "Storm Chaser",
  "Midnight Racer",
  "Golden Victory",
  "Eagle's Flight",
  "Iron Will",
  "Lightning Strike",
  "Silver Shadow",
  "Wild Spirit",
  "Fury of the Wind",
  "Champion's Pride",
  "Desert Phantom",
  "Majestic Runner",
  "Dark Thunder",
  "Sunrise Blaze",
  "Swift Dream",
  "Bold Rider",
  "King of Hearts",
  "Diamond Rush",
  "Power Surge",
  "Velocity King",
  "Mystic Runner",
  "Royal Thunder",
  "Skyline Hero",
  "Raging Storm",
  "True Winner",
  "Lone Warrior",
  "Flash Point",
  "Silver Hawk",
  "Firestorm Fury",
  "Phantom Rider",
  "Stormy Legend",
  "Silent Warrior",
  "Starfire Prince",
  "Crimson Blaze",
  "Galloping Ghost",
  "Viking Thunder",
  "Rising Tide",
  "Speed Demon",
  "Ace of Hearts",
  "Mystic Thunder",
  "Dashing Spirit",
  "Golden Flame",
  "Hurricane King",
  "Storm Rider",
  "Fierce Falcon",
  "Black Knight",
  "Jetstream Runner",
  "Desert Thunder",
  "Blazing Glory",
  "Sonic Dash",
  "King's Arrow",
  "Silver Warrior",
  "Thunder King",
  "Champion Spirit",
  "Iron Fury",
  "Night Rider",
  "Blaze Runner",
  "Solar Fury",
  "Speeding Star",
  "Jetstream King",
  "Iron Blaze",
  "Sable Knight",
  "Thunder Rider",
  "Lightning King",
  "Steel Shadow",
  "Eagle's Fury",
  "Mighty Storm",
  "Crimson Speed",
  "Royal Prince",
  "Victory Dash",
  "Shadow Fury",
  "Stormwind Racer",
  "Thunder Blaze",
  "Spirit of the Sky",
  "Ace Thunder",
  "Moonlight King",
  "Rapid Fire",
  "Furious Storm",
  "Golden Arrow",
  "Blaze King",
  "Maverick Racer",
  "Lightning Fury",
  "Vortex Racer",
  "Royal Blaze",
  "Storm Surge",
  "Windstorm Rider",
  "Cobalt Thunder",
  "Midnight Flash",
  "Legendary Racer",
  "Bolt of Glory",
  "Crimson Rider",
  "Wind Rider",
  "Shooting Star",
  "Fire Rider",
  "Silver Bolt",
  "Phoenix Dash",
  "Majestic Fury",
  "Tempest King",
  "Crimson Arrow",
  "Rising Storm",
  "Golden Rider",
  "Blazing Falcon",
  "Thunderstrike",
  "Mighty Blaze",
  "Storm Runner",
  "Vanguard King",
  "Firestorm Dash",
  "Red Thunder",
  "Gale Rider",
  "Quickfire King",
  "Solar Racer",
  "Noble Thunder",
  "Dashing King",
  "Titan Rider",
  "Speed King",
  "Storm Prince",
  "Iron Phantom",
]

// Funkce pro náhodný výběr jména
function getRandomHorse() {
  return horses[Math.floor(Math.random() * horses.length)]
}

// Funkce pro náhodný počet startů, vítězství a věk
function getRandomStats() {
  const starts = Math.floor(Math.random() * 50) + 1 // Počet startů mezi 1 a 100
  const wins = Math.floor(Math.random() * (starts + 1)) // Vítězství mezi 0 a počtem startů
  const age = Math.floor(Math.random() * 4) + 5 // Věk mezi 5 a 8 lety
  return { starts, wins, age }
}

// Funkce pro určení ceny na základě bilance startů a vítězství
function getPrice(starts, wins) {
  let price
  const winRatio = wins / starts // Poměr vítězství k startům
  if (wins > 30) {
    price = 200000
  } else if (wins > 20) {
    price = 160000 // Když je více než 70% vítězství, vysoká cena
  } else if (winRatio > 0.7) {
    price = 150000 // Když je více než 70% vítězství, vysoká cena
  } else if (winRatio > 0.3) {
    price = 130000 // Když je mezi 30% a 70% vítězství, střední cena
  } else {
    price = 100000 // Když je méně než 30% vítězství, nízká cena
  }

  return price
}

// Funkce pro generování více koní
function generateHorses(numHorses) {
  const horsesList = document.getElementById("horses-list")
  horsesList.innerHTML = "" // Vymažeme předchozí výsledky

  // Generování více koní
  for (let i = 0; i < numHorses; i++) {
    const horseName = getRandomHorse()
    const { starts, wins, age } = getRandomStats()
    const price = getPrice(starts, wins)

    // Vytvoření divu pro každého koně
    const horseDiv = document.createElement("div")
    horseDiv.innerHTML = 
          `
  <h4>Kůň: ${horseName}</h4>
  <h4>Počet startů: ${starts}</h4>
  <h4>Počet vítězství: ${wins}</h4>
  <h4>Věk: ${age} let</h4>
  <h4>Cena koně: ${price} Kč</h4>
  <button onclick="buyHorse('${horseName}', ${starts}, ${wins}, ${age}, ${price}, this)">Koupit</button>
  <hr>
`
        
    horsesList.appendChild(horseDiv) // Přidání do seznamu koní
  }
}
function buyHorse(name, price, button) {
  if (ownedHorses.length < stableCapacity) {
    if (budget >= price) {
      budget -= price;
      ownedHorses.push({ name: name, age: 3 }); // Kůň začíná ve věku 3 let
      document.getElementById("penize").textContent = budget + " Kč";
      document.getElementById("boxy").textContent = `Boxy: ${ownedHorses.length}/${stableCapacity}`;
      renderStable();
      
      // Změna textu tlačítka a deaktivace
      button.textContent = "Prodáno";
      button.disabled = true;
    } else {
      alert("Nemáš dost peněz na tohoto koně!");
    }
  } else {
    alert("Nemáš dost volných boxů! Musíš nejdříve postavit nový box.");
  }
}


// Výpočet popularity
// Výpočet popularity
function calculatePopularity(starts, wins) {
  if (starts === 0) return 1;
  
  let winRate = wins / starts;
  
  if (wins >= 35) return 5;
  else if (winRate === 1) return 5;
  else if (winRate >= 0.75) return 4;
  else if (winRate >= 0.5) return 3;
  else if (winRate >= 0.25) return 2;
  return 1;
}


// Funkce na zestárnutí koní a obnovení tlačítek
function ageHorses() {
  let totalCost = ownedHorses.length * 10000; // Cena za zestárnutí všech koní

  if (budget >= totalCost) {
    budget -= totalCost;
    document.getElementById("penize").textContent = budget + " Kč";

    // Zestárnutí koní a odstranění těch, kteří mají 25 let
    ownedHorses = ownedHorses.filter(horse => {
      horse.age++; // Zestárnutí koně
      return horse.age < 25; // Ponecháme jen ty, kteří mají méně než 25 let
    });

    renderStable(); // Aktualizace stáje
  } else {
    alert("Nemáš dost peněz na zestárnutí všech koní!");
  }
}


// Funkce na vykreslení stáje a tlačítek
function renderStable() {
  const stableList = document.getElementById("stable-list");
  stableList.innerHTML = "";

  ownedHorses.forEach((horse, index) => {
    horse.popularity = calculatePopularity(horse.starts, horse.wins);
    const horseDiv = document.createElement("div");
    horseDiv.classList.add("owned-horse");

    let horseId = `horse-${index}`;

    let moneyButtons = "";

    if (!usedButtons[horseId]) {
      usedButtons[horseId] = new Array(horse.popularity).fill(false);
    }

    usedButtons[horseId].forEach((used, i) => {
      if (!used) {
        moneyButtons += `<button onclick="earnMoney(${horse.popularity}, '${horseId}', ${i}, this)">💰</button>`;
      }
    });

    horseDiv.innerHTML = `
      <h4>${horse.name}</h4>
      <p class="horse-info">
        Starty: ${horse.starts}, Výhry: ${horse.wins}, Věk: <span class="horse-age">${horse.age}</span> let
      </p>
      <p>Popularita: <span class="horse-popularity">${horse.popularity}</span> ⭐</p>
      <div class="money-buttons">${moneyButtons}</div>
      <hr>
    `;

    stableList.appendChild(horseDiv);
  });
}


// Funkce na vydělávání peněz
function earnMoney(popularity, horseId, buttonIndex, button) {
  let moneyEarned = 0
  switch (popularity) {
    case 5:
      moneyEarned = 20000
      break
    case 4:
      moneyEarned = 15000
      break
    case 3:
      moneyEarned = 12000
      break
    case 2:
      moneyEarned = 10000
      break
    default:
      moneyEarned = 5000
      break
  }

  budget += moneyEarned
  document.getElementById("penize").textContent = budget + " Kč"
  usedButtons[horseId][buttonIndex] = true // Označí tlačítko jako použité
  button.remove() // Skryje tlačítko
}
function buildStable() {
  if (budget >= stableCost) {
    budget -= stableCost;
    stableCapacity++; // Přidání nového boxu
    document.getElementById("penize").textContent = budget + " Kč";
    document.getElementById("boxy").textContent = `Boxy: ${ownedHorses.length}/${stableCapacity}`;

  } else {
    alert("Nemáš dost peněz na stavbu boxu!");
  }
}
