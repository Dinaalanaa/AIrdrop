const form = document.getElementById("airdropForm");
const list = document.getElementById("airdropList");
const filterStatus = document.getElementById("filterStatus");

let garapan = JSON.parse(localStorage.getItem("airdropData")) || [{"title":"R2 Money","link":"https://www.r2.money/swap","type":"Testnet","task":"Swap, Stake,  Add Liquidity","status":"Ongoing"},{"title":"Union","link":"https://dashboard.union.build/","type":"Testnet","task":"Bridge to Other Chain","status":"Ongoing"},{"title":"Gokite","link":"https://testnet.gokite.ai/","type":"Testnet","task":"Interaction with AI, Stake, Unstake, Quiz ","status":"Ongoing"},{"title":"Maitrix AI","link":"https://app.testnet.themaitrix.ai/#/home","type":"Testnet","task":"Mint and Stake","status":"Ongoing"},{"title":"Turnkey","link":"https://wallet.tx.xyz/dashboard","type":"Testnet","task":"Send to other adress","status":"Ongoing"},{"title":"Fraction AI","link":"https://fractionai.xyz/dapp","type":"Testnet","task":"Interact with AI","status":"Selesai"},{"title":"Soul","link":"https://app.soul.io/seeds/quests","type":"Testnet","task":"Supply, Lend, Borrow","status":"Ongoing"},{"title":"Somnia Network","link":"https://testnet.somnia.network/","type":"Testnet","task":"Complete quest","status":"Ongoing"},{"title":"Magma","link":"https://www.magmastaking.xyz/","type":"Testnet","task":"Stake, Unstake","status":"Ongoing"},{"title":"Apriori","link":"https://stake.apr.io/","type":"Testnet","task":"Stake and Unstake","status":"Ongoing"},{"title":"Portal to Bitcoin","link":"https://quests.portaltobitcoin.com/quests","type":"Testnet","task":"Complete Quest","status":"Ongoing"},{"title":"Portal to Bitcoin","link":"https://hub.portaltobitcoin.com/dashboard","type":"Testnet","task":"Cek Badge","status":"Ongoing"},{"title":"Revive","link":"https://dev.revivefi.io/lend","type":"Testnet","task":"Lend Borrow","status":"Selesai"}];
let editIndex = -1;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const link = document.getElementById("link").value;
  const type = document.getElementById("type").value;
  const task = document.getElementById("task").value;
  const status = document.getElementById("status").value;

  const newData = { title, link, type, task, status };

  if (editIndex === -1) {
    garapan.push(newData);
  } else {
    garapan[editIndex] = newData;
    editIndex = -1;
    form.querySelector("button").textContent = "Tambah";
  }

  saveData();
  renderList();
  form.reset();
});

filterStatus.addEventListener("change", renderList);

function renderList() {
  list.innerHTML = "";
  const filter = filterStatus.value;

  garapan
    .filter(item => filter === "All" || item.status === filter)
    .forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add(`status-${item.status}`);
      li.innerHTML = `
        <strong>${item.title}</strong><br/>
        <p>Tipe Project : ${item.type}<p/>
        <p>Tugas Project : ${item.task}<p/>
        <p>Status: ${item.status}<p/>
        <a href="${item.link}" target="_blank">Buka tugas</a>
        <button onclick="edit(${index})">✏️ Edit</button>
        <button onclick="hapus(${index})">🗑️ Hapus</button>
      `;
      list.appendChild(li);
    });
}

function hapus(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    garapan.splice(index, 1);
    saveData();
    renderList();
  }
}

function edit(index) {
  form.style.scale = "1"
  const data = garapan[index];
  document.getElementById("title").value = data.title;
  document.getElementById("link").value = data.link;
  document.getElementById("task").value = data.task;
  document.getElementById("type").value = data.type;
  document.getElementById("status").value = data.status;

  editIndex = index;
  form.querySelector("button").textContent = "Update";
}

function saveData() {
  localStorage.setItem("airdropData", JSON.stringify(garapan));
}

// render awal saat halaman dibuka
renderList();

const close = document.getElementById('close')
close.addEventListener('click', ()=>{
  form.style.scale = "0"
})

const add = document.getElementById('add')
add.addEventListener('click', ()=>{
  form.style.scale = '1'
})

