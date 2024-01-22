class Item {
  constructor(costcl = 0, make = 0, ancost = "", color = "") {
    this.ccost = costcl;
    this.ancost = ancost;
    this.make = make;
    this.upgrade = 1;
    this.count = 0;
    this.hiscount = 0;
    this.color = color;
  }
}

class BRBClass {
  constructor() {
    this.items = {};
  }
  additem(name, costcl = 0, make = 0, ancost = "", color = "") {
    this.items[name] = new Item(costcl, make, ancost, color);
  }
  cbuy(itemName, count) {
    const cost = this.items[itemName].ccost;
    if (count * cost <= this.items.clicks.count) {
      this.items.clicks.count -= count * cost;
      this.items[itemName].count += count;
      this.items[itemName].hiscount += count;
    } else {
      alert("you dond hav mony");
    }
  }
  ccalcMax(itemName) {
    return Math.floor(this.items.clicks.count / this.items[itemName].ccost);
  }

  anbuy(itemName, count) {
    const cost = this.items[itemName].ancost;
    let canbuy = true;
    cost.split(",").forEach((el) => {
      const cost = el.split("/");
      const animal = this.items[cost[0]].count;
      if (animal <= cost[1] * count) canbuy = false;
    });
    if (!canbuy) return;
    cost.split(",").forEach((el) => {
      const cost = el.split("/");
      this.items[cost[0]].count - cost[1] * count;
    });
    this.items[itemName].count += count;
    this.items[itemName].hiscount += count;
  }
  ancalcMax(itemName) {
    let a1, a2;
    const cost = this.items[itemName].ancost;
    cost.split(",").forEach((el) => {
      const cost = el.split("/");
      const animal = this.items[cost[0]].count / cost[1];
      if (a1 == undefined) a1 = animal;
      else if (a2 == undefined) a2 = animal;
    });
    return Math.floor(Math.min(a1, a2));
  }

  gen() {
    let money = 0;
    for(let item of Object.values(this.items)){
      money += item.count * item.make * item.upgrade;
    };
    this.items.clicks.count += money;
    // console.log(this.items.clicks.count);
  }

  save() {
    localStorage.setItem("BRBitems", JSON.stringify(this.items));
  }
  load() {
    this.items = JSON.parse(localStorage.getItem("BRBitems"));
  }
}
