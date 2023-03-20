// resetData
let colaData = [
  { name: "Original_Cola", price: 1000, quantity: 1, isSoldout: false },
  { name: "Violet_Cola", price: 1000, quantity: 99, isSoldout: false },
  { name: "Yellow_Cola", price: 1000, quantity: 99, isSoldout: false },
  { name: "Cool_Cola", price: 1000, quantity: 99, isSoldout: false },
  { name: "Green_Cola", price: 1000, quantity: 99, isSoldout: false },
  { name: "Orange_Cola", price: 1000, quantity: 99, isSoldout: false },
];
let orderColaData = [];
let inventoryData = [];
let sellListData = [];
let stageData = 1;
let totalMarketPriceData = 0;
let moneyData = 10000;
let totalPriceData = 0;
let totalSellPriceData = 0;

const colaMenu = document.querySelector(".article-menu");
getColaMenu();
const body = document.querySelector("body");
const stage = document.querySelector(".stage-num");
const rankingBtn = document.querySelector(".ranking-btn");
const audioBtn = document.querySelector(".audio-btn");
const resetGameBtn = document.querySelector(".resetGame-btn");
const gameRuleBtn = document.querySelector(".gameRule-btn");
const modal =document.querySelector(".modal")
const modalCloseBtn = document.querySelector(".modalClose-btn")
const colaBox = document.querySelectorAll(".cola-box");
const orderList = document.querySelector(".orderList");
let itemQuantitys = document.querySelectorAll(".orderItem-quantity");
const money = document.querySelector(".money");
const chagesBtn = document.querySelector(".chages-btn");
const totalPrice = document.querySelector(".orderList-box .total-price");
const buyBtn = document.querySelector(".buy-btn");
const inventory = document.querySelector(".inventory");
const colaQuantity = document.querySelectorAll(".cola-box .cola-quantity");
const sellList = document.querySelector(".sellList");
const totalSellPrice = document.querySelector(".sellList-box .total-price");
const sellBtn = document.querySelector(".sell-btn");
const nextStageBtn = document.querySelector(".nextstage-btn");
const totalMarketPrice = document.querySelector(".total-marketPrice");
const main = document.querySelector("main");
money.innerHTML = moneyData.toLocaleString();
colaQuantity.forEach((el, i) => (el.innerHTML = colaData[i].quantity));

function addOrderList(e) {
  const itemPrices = document.querySelectorAll(".orderList .item-price");
  const selected = colaData.find((el) => e.target.classList.contains(el.name));
  const orderItemQuantitys = document.querySelectorAll(".orderItem-quantity");
  let isDuplication = false;
  let idx = 0;
  for (let i = 0; i < orderColaData.length; i++) {
    if (orderColaData[i].name === e.target.classList.item(1)) {
      idx = i;
      isDuplication = true;
    }
    if (isDuplication) {
      orderColaData[idx].quantity += 1;
      orderItemQuantitys[idx].value = orderColaData[idx].quantity;
      totalPriceData += selected.price;
      totalPrice.innerHTML = totalPriceData.toLocaleString();
      itemPrices[idx].innerHTML = selected.price * orderColaData[idx].quantity;
      return;
    }
  }
  orderColaData.push({ ...selected, quantity: 1 });
  totalPriceData += selected.price;
  totalPrice.innerHTML = totalPriceData.toLocaleString();

  const orderListItem = document.createElement("div");
  const itemImg = document.createElement("img");
  const itemName = document.createElement("h3");
  const itemPriceBox = document.createElement("div");
  const itemPrice = document.createElement("span");
  const priceMeasure = document.createElement("span");
  const itemQuantity = document.createElement("input");
  const deleteBtn = document.createElement("button");
  const deleteImg = document.createElement("img");
  orderListItem.setAttribute("class", `orderList-item ${selected.name}`);
  itemImg.setAttribute("class", "item-img");
  itemImg.setAttribute("src", `./img/${selected.name}.svg`);
  itemImg.setAttribute("alt", "");
  itemName.setAttribute("class", "item-name");
  itemPriceBox.setAttribute("class", "item-priceBox");
  itemPrice.setAttribute("class", "item-price");
  itemQuantity.setAttribute("class", `orderItem-quantity ${selected.name}`);
  itemQuantity.setAttribute("value", 1);
  itemQuantity.setAttribute("min", 1);
  itemQuantity.setAttribute("max", 99);
  itemQuantity.addEventListener("change", onChangeQuantity);
  deleteBtn.setAttribute("class", `deleteBtn ${selected.name}`);
  deleteImg.setAttribute("src", "./img/deleteBtn.png");
  deleteBtn.addEventListener("click", orderListdeleteItem);
  itemPrice.innerHTML = Math.round(selected.price);
  priceMeasure.innerHTML = "원";
  itemName.innerHTML = selected.name;
  itemQuantity.innerHTML = 1;
  orderList.append(orderListItem);
  orderListItem.append(itemImg);
  orderListItem.append(itemName);
  orderListItem.append(itemPriceBox);
  itemPriceBox.append(itemPrice);
  itemPriceBox.append(priceMeasure);
  orderListItem.append(itemQuantity);
  orderListItem.append(deleteBtn);
  deleteBtn.append(deleteImg);
}
colaBox.forEach((el) => el.addEventListener("click", addOrderList));

function orderListdeleteItem(e) {
  e.target.parentElement.remove();
  orderColaData = orderColaData.filter(
    (el) => el.name !== e.target.classList.item(1)
  );
  totalPriceData = 0;
  orderColaData.forEach((el) => (totalPriceData += el.quantity * el.price));
  totalPrice.innerHTML = totalPriceData.toLocaleString();
}
function sellListdeleteItem(e) {
  e.target.parentElement.remove();
  const deleteItem = sellListData.find(
    (el) => el.name === e.target.classList.item(1)
  );
  sellListData = sellListData.filter((el) => el.name !== deleteItem.name);
  totalSellPriceData -= Math.round(deleteItem.price / 2) * deleteItem.quantity;
  totalSellPrice.innerHTML = totalSellPriceData.toLocaleString();
}
function stringNumberToInt(stringNumber) {
  return parseInt(stringNumber.replace(/,/g, ""));
}
function plusMoney(a, b) {
  return (stringNumberToInt(a) + stringNumberToInt(b)).toLocaleString();
}
function minusMoney(a, b) {
  return (stringNumberToInt(a) - stringNumberToInt(b)).toLocaleString();
}

function onChangeQuantity(e) {
  const itemPrices = document.querySelectorAll(".orderList .item-price");
  if (
    parseInt(e.target.min) > parseInt(e.target.value) ||
    e.target.value.length === 0
  ) {
    e.target.value = e.target.min;
  }
  if (parseInt(e.target.max) < parseInt(e.target.value)) {
    alert("최대 구매 수량은 99개 입니다.");
    e.target.value = e.target.max;
  }
  totalPriceData = 0;
  orderColaData.forEach((el, idx) => {
    if (el.name === e.target.classList.item(1)) {
      totalPriceData += el.price * e.target.value;
      totalPrice.innerHTML = totalPriceData.toLocaleString();
      el.quantity = Number(e.target.value);
      itemPrices[idx].innerHTML = el.quantity * el.price;
    } else {
      totalPriceData += el.price * el.quantity;
      totalPrice.innerHTML = totalPriceData.toLocaleString();
    }
  });
}
function buyItem() {
  if (confirm("정말 구매 하시겠습니까?")) {
    if (orderColaData.length === 0) {
      alert("구매할 콜라가 없습니다!");
      return;
    }
    if (totalPriceData > moneyData) {
      money.innerHTML = moneyData.toLocaleString();
      totalPrice.innerHTML = totalPriceData.toLocaleString();
      alert("금액이 부족합니다!");
      return;
    }
    for (let i = 0; i < colaData.length; i++) {
      for (let j = 0; j < orderColaData.length; j++) {
        if (colaData[i].name === orderColaData[j].name) {
          console.log(colaData[i].quantity - orderColaData[j].quantity);
          if (colaData[i].quantity - orderColaData[j].quantity < 0) {
            alert("재고가 부족합니다!");
            return;
          }
          colaData[i].quantity -= orderColaData[j].quantity;
        }
      }
    }
    orderColaData.forEach((el) => addInventory(el));
    moneyData -= totalPriceData;
    money.innerHTML = moneyData.toLocaleString();
    resetList(orderList);
    orderColaData = [];
    totalPrice.innerHTML = 0;
    totalPriceData = 0;
    totalMarketPriceData = 0;
    setTotalMarketPrice();
    getColaMenu();
    getInventory();
    const colaBox = document.querySelectorAll(".cola-box");
    colaData.forEach((el, i) => {
      if (el.quantity === 0) colaBox[i].classList.add("soldout");
    });
    alert("구매가 완료되었습니다!");
  }
}
buyBtn.addEventListener("click", buyItem);
function addInventory(orderListCola) {
  let idx = 0;
  let isDuplication = false;
  const orderListItems = document.querySelectorAll(".orderList-item");
  const inventoryQuantity = document.querySelectorAll(
    ".inventory-item .cola-quantity"
  );
  console.log(inventoryQuantity);
  const inventoryItems = document.querySelectorAll(".inventory-item");
  console.log(orderListItems);
  console.log(inventoryItems);
  console.log(inventoryData);
  for (let i = 0; i < inventoryData.length; i++) {
    console.log(inventoryData[i], orderListCola.name);
    if (inventoryData[i].name === orderListCola.name) {
      console.log("aaa");
      idx = i;
      isDuplication = true;
    }
  }
  if (isDuplication) {
    inventoryData[idx].quantity += orderListCola.quantity;
    inventoryQuantity[idx].innerHTML = inventoryData[idx].quantity;
    return;
  }

  inventoryData.push(orderListCola);
}
function getInventory() {
  resetList(inventory);
  inventoryData.forEach((el) => setInventory(el));
}

function setInventory(cola) {
  totalMarketPrice.innerHTML = totalMarketPriceData.toLocaleString();
  const inventoryItem = document.createElement("div");
  const inventoryItemImg = document.createElement("img");
  const inventoryItemName = document.createElement("h2");
  const inventoryItemPriceBox = document.createElement("div");
  const inventoryItemPrice = document.createElement("span");
  const priceMeasure = document.createElement("span");
  const quantityBox = document.createElement("div");
  const quantity = document.createElement("span");
  const quantityMeasure = document.createElement("span");
  inventoryItem.setAttribute("class", `inventory-item ${cola.name}`);
  inventoryItemImg.setAttribute("src", `./img/${cola.name}.svg`);
  inventoryItemImg.setAttribute("class", "cola-img");
  inventoryItemImg.setAttribute("alt", "");
  inventoryItemPriceBox.setAttribute("class", "cola-priceBox");
  inventoryItemPrice.setAttribute("class", "cola-price");
  inventoryItemName.setAttribute("class", "cola-name");
  quantityBox.setAttribute("class", "cola-quantityBox");
  quantity.setAttribute("class", "cola-quantity");
  inventoryItem.addEventListener("click", addSellList);
  inventoryItemName.innerHTML = cola.name;
  inventoryItemPrice.innerHTML = cola.price;
  priceMeasure.innerHTML = "원";
  quantity.innerHTML = cola.quantity;
  quantityMeasure.innerHTML = "개";
  inventory.append(inventoryItem);
  inventoryItem.append(inventoryItemImg);
  inventoryItem.append(inventoryItemName);
  inventoryItem.append(inventoryItemPriceBox);
  inventoryItemPriceBox.append(inventoryItemPrice);
  inventoryItemPriceBox.append(priceMeasure);
  inventoryItem.append(quantityBox);
  quantityBox.append(quantity);
  quantityBox.append(quantityMeasure);
}

// reset
function resetGame() {
  if (
    confirm("정말 다시 시작하겠습니까? 현재 진행된 모든 내용은 초기화 됩니다.")
  ) {
    moneyData = 10000;
    money.innerHTML = moneyData.toLocaleString();
    resetList(orderList);
    resetList(inventory);
    resetList(sellList);
    totalPriceData = 0;
    totalMarketPriceData = 0;
    totalMarketPrice.innerHTML = 0;
    totalPrice.innerHTML = 0;
    orderColaData = [];
    sellListData = [];
    inventoryData = [];
    stageData = 1;
    stage.innerHTML = 1;
    colaData = [
      { name: "Original_Cola", price: 1000, quantity: 1, isSoldout: false },
      { name: "Violet_Cola", price: 1000, quantity: 99, isSoldout: false },
      { name: "Yellow_Cola", price: 1000, quantity: 99, isSoldout: false },
      { name: "Cool_Cola", price: 1000, quantity: 99, isSoldout: false },
      { name: "Green_Cola", price: 1000, quantity: 99, isSoldout: false },
      { name: "Orange_Cola", price: 1000, quantity: 99, isSoldout: false },
    ];
    console.log(colaData);
    getColaMenu();
  }
}
function resetList(list) {
  while (list.hasChildNodes()) {
    list.removeChild(list.childNodes[0]);
  }
}

function getColaMenu() {
  resetList(colaMenu);
  colaData.forEach((el) => setColaMenu(el));
}
function setColaMenu(cola) {
  const colaBox = document.createElement("div");
  const colaImg = document.createElement("img");
  const colaName = document.createElement("h2");
  const colaPriceBox = document.createElement("div");
  const colaPrice = document.createElement("span");
  const priceMeasure = document.createElement("span");
  const colaQuantityBox = document.createElement("div");
  const colaQuantity = document.createElement("span");
  const quantityMeasure = document.createElement("span");
  colaBox.addEventListener("click", addOrderList);
  colaBox.setAttribute("class", `cola-box ${cola.name}`);
  colaImg.setAttribute("src", `./img/${cola.name}.svg`);
  colaImg.setAttribute("alt", "");
  colaName.setAttribute("class", "cola-name");
  colaPriceBox.setAttribute("class", "cola-priceBox");
  colaQuantityBox.setAttribute("class", "cola-quantityBox");
  colaQuantity.setAttribute("class", "cola-quantity");
  colaName.innerHTML = cola.name;
  colaPrice.innerHTML = cola.price;
  priceMeasure.innerHTML = "원";
  colaQuantity.innerHTML = cola.quantity;
  quantityMeasure.innerHTML = "개";

  colaMenu.append(colaBox);
  colaBox.append(colaImg);
  colaBox.append(colaName);
  colaBox.append(colaPriceBox);
  colaPriceBox.append(colaPrice);
  colaPriceBox.append(priceMeasure);
  colaBox.append(colaQuantityBox);
  colaQuantityBox.append(colaQuantity);
  colaQuantityBox.append(quantityMeasure);
}

function addSellList(e) {
  // 클릭한 콜라 데이터 찾기
  const sellItemQuantitys = document.querySelectorAll(".sellItem-quantity");
  const selected = colaData.find((el) => e.target.classList.contains(el.name));
  const itemPrices = document.querySelectorAll(".sellList .item-price");

  // 중복되는 콜라가 있다면 개수만 추가
  let isDuplication = false;
  let idx = 0;
  for (let i = 0; i < sellListData.length; i++) {
    if (sellListData[i].name === e.target.classList.item(1)) {
      idx = i;
      isDuplication = true;
    }
    if (isDuplication) {
      const Inventoryitem = inventoryData.find(
        (el) => el.name === e.target.classList.item(1)
      );
      if (Inventoryitem.quantity === sellListData[idx].quantity) {
        alert("판개 가능한 수량을 초과하였습니다!");
        return;
      }
      console.log(idx);
      sellListData[idx].quantity += 1;
      itemPrices[idx].innerHTML =
        (selected.price / 2) * sellListData[idx].quantity;
      sellItemQuantitys[idx].value = sellListData[idx].quantity;
      totalSellPriceData += Math.round(selected.price / 2);
      totalSellPrice.innerHTML = totalSellPriceData.toLocaleString();
      return;
    }
  }
  sellListData.push({ ...selected, quantity: 1 });
  totalSellPriceData += Math.round(selected.price / 2);
  totalSellPrice.innerHTML = totalSellPriceData.toLocaleString();
  const sellListItem = document.createElement("div");
  const itemImg = document.createElement("img");
  const itemName = document.createElement("h3");
  const itemQuantity = document.createElement("input");
  const itemPriceBox = document.createElement("div");
  const itemPrice = document.createElement("span");
  const priceMeasure = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const deleteImg = document.createElement("img");
  sellListItem.setAttribute("class", `sellList-item ${selected.name}`);
  itemImg.setAttribute("class", "item-img");
  itemImg.setAttribute("src", `./img/${selected.name}.svg`);
  itemImg.setAttribute("alt", "");
  itemName.setAttribute("class", "item-name");
  itemPriceBox.setAttribute("class", "item-priceBox");
  itemPrice.setAttribute("class", "item-price");
  itemQuantity.setAttribute("class", `sellItem-quantity ${selected.name}`);
  itemQuantity.setAttribute("value", 1);
  itemQuantity.setAttribute("min", 1);
  itemQuantity.setAttribute("max", 99);
  itemQuantity.addEventListener("change", changeSellItemQuantity);
  deleteBtn.setAttribute("class", `deleteBtn ${selected.name}`);
  deleteImg.setAttribute("src", "./img/deleteBtn.png");
  deleteBtn.addEventListener("click", sellListdeleteItem);
  itemPrice.innerHTML = Math.round(selected.price / 2);
  priceMeasure.innerHTML = "원";
  itemName.innerHTML = selected.name;
  itemQuantity.innerHTML = 1;
  sellList.append(sellListItem);
  sellListItem.append(itemImg);
  sellListItem.append(itemName);
  sellListItem.append(itemPriceBox);
  itemPriceBox.append(itemPrice);
  itemPriceBox.append(priceMeasure);
  sellListItem.append(itemQuantity);
  sellListItem.append(deleteBtn);
  deleteBtn.append(deleteImg);
}
function changeSellItemQuantity(e) {
  const itemPrices = document.querySelectorAll(".sellList .item-price");
  const inventoryItem = inventoryData.find(
    (el) => el.name === e.target.classList.item(1)
  );
  if (
    parseInt(e.target.min) > parseInt(e.target.value) ||
    e.target.value.length === 0
  ) {
    e.target.value = e.target.min;
  }
  if (parseInt(inventoryItem.quantity) < parseInt(e.target.value)) {
    alert("판매 가능한 수량을 초과하였습니다!");
    e.target.value = inventoryItem.quantity;
  }
  totalSellPriceData = 0;
  sellListData.forEach((el, idx) => {
    if (el.name === e.target.classList.item(1)) {
      totalSellPriceData += Math.round(el.price / 2) * e.target.value;
      totalSellPrice.innerHTML = totalSellPriceData.toLocaleString();
      el.quantity = Number(e.target.value);
      itemPrices[idx].innerHTML = (el.price / 2) * el.quantity;
    } else {
      totalSellPriceData += Math.round(el.price / 2) * el.quantity;
      totalSellPrice.innerHTML = totalPriceData.toLocaleString();
    }
  });
}

function sellItem() {
  if (confirm("정말 판매 하시겠습니까?")) {
    if (sellListData.length === 0) {
      alert("판매할 음료가 없습니다!");
      return;
    }
    const inventoryQuantity = document.querySelectorAll(
      ".inventory-item .cola-quantity"
    );
    moneyData += totalSellPriceData;
    totalMarketPriceData -= totalSellPriceData * 2;
    totalMarketPrice.innerHTML = totalMarketPriceData.toLocaleString();
    money.innerHTML = moneyData.toLocaleString();
    totalSellPriceData = 0;
    for (let i = 0; i < inventoryData.length; i++) {
      for (let j = 0; j < sellListData.length; j++) {
        if (inventoryData[i].name === sellListData[j].name) {
          inventoryData[i].quantity -= sellListData[j].quantity;
          inventoryQuantity[i].innerHTML = inventoryData[i].quantity;
        }
      }
    }
    totalSellPrice.innerHTML = totalSellPriceData.toLocaleString();
    inventoryData = inventoryData.filter((el) => el.quantity !== 0);
    resetList(sellList);
    getInventory();
    sellListData = [];
    alert("판매가 완료되었습니다!");
  }
}
sellBtn.addEventListener("click", sellItem);

const randomPrice = function () {
  const random = Math.random();
  if (random < 0.01) {
    return randomRange(50000, 3000);
  } else if (random < 0.05) {
    return randomRange(30000, 1000);
  } else if (random < 0.1) {
    return randomRange(10000, 5000);
  } else if (random < 0.5) {
    return randomRange(5000, 3000);
  } else if (random < 0.7) {
    return randomRange(3000, 1000);
  } else {
    return randomRange(1000, 100);
  }
};
function randomRange(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setTotalMarketPrice() {
  inventoryData.forEach((el) => {
    totalMarketPriceData += el.price * el.quantity;
    console.log(el.price * el.quantity);
  });
  totalMarketPrice.innerHTML = totalMarketPriceData.toLocaleString();
}
function nextStage() {
  stageData++;
  if (stageData <= 10) {
    if (confirm("정말 다음 스테이지로 이동하시겠습니까?")) {
      nextStageBtn.style.pointerEvents = "none";
      main.setAttribute("class", "nextStage");
      main.style.pointerEvents = "none";
      stage.innerHTML = stageData;
      setTimeout(() => {
        colaData.forEach((el) => {
          el.quantity = 99;
          el.price = randomPrice();
        });
        inventoryData.forEach((el) => {
          for (let i = 0; i < colaData.length; i++) {
            if (colaData[i].name === el.name) el.price = colaData[i].price;
          }
        });
        sellListData = [];
        orderColaData = [];
        totalPriceData = 0;
        totalPrice.innerHTML = 0;
        totalSellPriceData = 0;
        totalSellPrice.innerHTML = 0;
        totalMarketPriceData = 0;
        getColaMenu();
        getInventory();
        setTotalMarketPrice();
        resetList(orderList);
        resetList(sellList);
      }, 1000);
      setTimeout(() => {
        main.setAttribute("class", "");
        main.style.pointerEvents = "auto";
        nextStageBtn.style.pointerEvents = "auto";
        if (stageData === 10) {
          alert(
            "게임종료! 기록을 원하는 경우 기록버튼을 눌러주세요(준비중...)."
          );
          main.style.pointerEvents = "none";
          nextStageBtn.style.pointerEvents = "none";
        }
      }, 2000);
    }
  }
}
nextStageBtn.addEventListener("click", nextStage);
resetGameBtn.addEventListener("click", resetGame);
rankingBtn.addEventListener("click", () => {
  alert("현재 준비중 입니다.");
});
audioBtn.addEventListener("click", () => {
  alert("현재 준비중 입니다.");
});
gameRuleBtn.addEventListener('click',(e)=>{
  modal.classList.toggle("active");
  body.style.overflow = 'hidden';
})
modal.addEventListener('click', (e)=>{
  if(e.target.classList.contains('modal')){
    modal.classList.toggle("active");
    body.style.overflow = 'auto';
  }
})
modalCloseBtn.addEventListener('click',()=>{
  modal.classList.toggle("active");
  body.style.overflow = 'auto';
})
