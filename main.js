const BRB = new BRBClass();

// name, ccost, gen, ancost, #btnclr 

BRB.additem("clicks");
BRB.additem("dogs", 100, 1, "", "#FF8C00");
BRB.additem("cats", 1200, 12, "dogs/10", "#FFA500");
BRB.additem("foxes", 1800, 18, "dogs/15", "#FFA07A");
BRB.additem("wolfs", 10000, 100, "foxes/5,dogs/6", "#D3D3D3");
BRB.additem("hamsters", 13000, 130, "wolfs/1,cats/2", "#F5DEB3");
BRB.additem("whales", 22000, 220, "wolfs/2", "#66CDAA");
BRB.additem("capybaras", 28000, 280, "whales/1,cats/4", "#BC8F8F");
BRB.additem("platypuses", 42000, 400, "capybaras/1,wolfs/1", "#A0522D");
BRB.additem("porcupines", 70000, 650, "platypuses/1,whales/1", "#8B4513");
BRB.additem("hippopotamuses", 100000, 950, "porcupines/1,hamsters/2", "#778899");
BRB.additem("snakes", 150000, 1000, "whales/2,hamsters/4", "#008000");
BRB.additem("cheetahs", 350000, 3000, "snakes/2,platypuses/2", "#DAA520");
BRB.additem("pythons", 820000, 7800, "cheetahs/1,hippopotamuses/5", "#6495ED");
BRB.additem("giraffes", 880000, 8400, "pythons/1,foxes/20", "#ffdb4d");
BRB.additem("otters", 950000, 9000, "giraffes/1,capybaras/2", "#bc8f8f");
BRB.additem("meerkats", 1000000, 9800, "otters/1,whales/3", "#cd853f");
BRB.additem("racoons", 1500000, 14500, "meerkats/1,porcupines/7", "#708090");
BRB.additem("owls", 1800000, 16000, "racoons/1,snakes/1", "#f4a460");
BRB.additem("badgers", 3500000, 32000, "owls/1,pythons/2", "#D8D6CA");
BRB.additem("squirrels", 5500000, 50000, "badgers/1,cheetahs/5", "#CFB190");

document.body.innerHTML += `
<section class="joe" id="jonathan">
  <div id="logclick">
    <p id="disclicks"></p>
    <p id="disclicksmake"></p>
  </div>
</section>
<main id="main" style="margin-top:200px;"></main>`

for(let itemName in BRB.items){
  if(itemName=="clicks") continue;
  let item = BRB.items[itemName];
  const color = BRB.items[itemName].color;
  const imgsrc = `../img/${itemName}.svg`
  const content = 
      `<div class="item">
        <h2 style="text-transform:capitalize;">${itemName}</h2>
        <img src="${imgsrc}">
        <div class="buttons" style="--Bcolor: ${color}">
          <button onclick="BRB.cbuy('${itemName}', 1);display()" class="buyone" id="c${itemName}1">
            Buy a ${itemName} for ${fornum(item.ccost)} clicks
          </button>
          <button onclick="BRB.cbuy('${itemName}', BRB.ccalcMax('${itemName}'));display()" class="buymax">
            MAX
          </button>
        </div>
        <p id="dis${itemName}"></p>
        <p id="dis${itemName}make"></p>
      </div>`
      if(item.ancost){
        const acontent = `
        <div class="item">
          <h2 style="text-transform:capitalize;">${itemName}</h2>
          <img src="${imgsrc}">
          <div class="buttons" style="--Bcolor: ${color}">
            <button onclick="anbuy('${itemName}', 1);display()" class="buyone" id="${itemName}1">
              Buy a ${itemName} for${ancostText(item.ancost)}
            </button>
            <button onclick="anbuy('${itemName}', 1);display()" class="buymax">
              MAX
            </button>
          </div>
          <div class="clickbtn" style="--Bcolor: ${color}">
            <button onclick="BRB.cbuy('${itemName}', 1);display()" class="buyone" id="c${itemName}1">
              Buy a ${itemName} for ${fornum(item.ccost)} clicks
            </button>
            <button onclick="BRB.cbuy('${itemName}', BRB.ccalcMax('${itemName}'));display()" class="buymax">
              MAX
            </button>
          </div>
          <p id="dis${itemName}"></p>
          <p id="dis${itemName}make"></p>
        </div>`
        document.getElementById('main').innerHTML += acontent;
        continue;
      }
  document.getElementById('main').innerHTML += content;
}

BRB.cbuy("clicks", 1000000000);
BRB.cbuy("dogs", 60);
BRB.cbuy("cats", 50);

BRB.anbuy("cats", 10);
console.log(BRB.items);

function display(){
  for(let itemName in BRB.items){
    const item = BRB.items[itemName];
    document.getElementById(`dis${itemName}`).innerHTML = `You've got ${fornum(item.count)}`;
    document.getElementById(`dis${itemName}make`).innerHTML = `You're making ${fornum(item.count*item.make*item.upgrade)}`;
  }
  let cs = 0;
  for(let itemName in BRB.items){
    const item = BRB.items[itemName];
    cs += item.count*item.make*item.upgrade;
  }
  document.getElementById('disclicksmake').innerHTML = `You're making ${fornum(cs)}`;
}

function ancostText(text){
  let fin = '';
  let and = true;
  if(text.match(/,/)){
    and = false;
  }
  text.split(",").forEach((el) => {
    const sub0 = el.split("/");
    
    if(and){
      fin += ` ${sub0[1]} ${sub0[0]} and`;
      and = false;
    }else{
      fin += ` ${sub0[1]} ${sub0[0]}`;  
    }
  });
  return fin;
}

setInterval(()=>{
  BRB.gen();
  display();
}, 1000)


// 'Lemon        for    some cats'  #FFFF00
// 'Lemon Tree   for    5 lemons'   #FAFAD2