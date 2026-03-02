let items = [];
let selectedItems = [];
let total = 0;

fetch("pivot_data.csv")
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").slice(1);
        rows.forEach(row => {
            const [name, price] = row.split(",");
            if (name && price) {
                items.push({ name, price: parseFloat(price) });
            }
        });
        renderFullList();
    });

function renderFullList() {
    document.body.innerHTML = `
        <h1>Build Your Grocery List</h1>
        <div id="item-list"></div>
        <h2>Total: $<span id="total">0.00</span></h2>
        <button onclick="goToShopMode()">Done</button>
        <button onclick="clearList()">Clear List</button>
    `;

    const container = document.getElementById("item-list");

    items.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <input type="checkbox" onchange="toggleSelect(${index}, this)">
            ${item.name} - $${item.price.toFixed(2)}
        `;
        container.appendChild(div);
    });

    document.getElementById("total").textContent = total.toFixed(2);
}

function toggleSelect(index, checkbox) {
    const item = items[index];

    if (checkbox.checked) {
        selectedItems.push(item);
        total += item.price;
    } else {
        selectedItems = selectedItems.filter(i => i.name !== item.name);
        total -= item.price;
    }

    document.getElementById("total").textContent = total.toFixed(2);
}

function goToShopMode() {
    document.body.innerHTML = `
        <h1>Today's List</h1>
        <div id="shop-list"></div>
        <button onclick="finishShopping()">Shopping Trip Done</button>
    `;

    const container = document.getElementById("shop-list");

    selectedItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "shop-item";
        div.onclick = function() {
            div.classList.toggle("checked");
        };
        div.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        container.appendChild(div);
    });
}

function finishShopping() {
    selectedItems = [];
    total = 0;
    renderFullList();
}

function clearList() {
    selectedItems = [];
    total = 0;
    renderFullList();
}