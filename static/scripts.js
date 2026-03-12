// Variáveis header
const character = document.querySelector("#character_name");
const player = document.querySelector("#player_name");
const origin = document.querySelector("#character_origin");
const clas = document.querySelector("#character_class");
const headerArr = [character,player,origin,clas];

// Variáveis main_attributes
const agility = document.querySelector("#agility");
const strength = document.querySelector("#strength");
const intelligence = document.querySelector("#intelligence");
const presence = document.querySelector("#presence");
const vigor = document.querySelector("#vigor");
const mainAttArr = [agility,strength,intelligence,presence,vigor];

// Variáveis health_attributes
const pv = document.querySelector("#pv");
const san = document.querySelector("#san");
const pe = document.querySelector("#pe");
const healthAttArr = [pv,san,pe]

// Variáveis defense_attributes
const pas = document.querySelector("#pas");
const blo = document.querySelector("#blo");
const esq = document.querySelector("#esq");
const defenseAttArr = [pas,blo,esq];

// Variáveis skills
const atl = document.querySelector("#atl");
const atu = document.querySelector("#atu");
const cie = document.querySelector("#cie");
const dip = document.querySelector("#dip");
const eng = document.querySelector("#eng");
const fort = document.querySelector("#for");
const fur = document.querySelector("#fur");
const ilu = document.querySelector("#ilu")
const inti = document.querySelector("#inti");
const intu = document.querySelector("#intu");
const inv = document.querySelector("#inv");
const lut = document.querySelector("#lut");
const med = document.querySelector("#med");
const ocu = document.querySelector("#ocu");
const per = document.querySelector("#per");
const pil = document.querySelector("#pil");
const pon = document.querySelector("#pon");
const pro = document.querySelector("#pro");
const ref = document.querySelector("#ref");
const rel = document.querySelector("#rel");
const tat = document.querySelector("#tat");
const tec = document.querySelector("#tec");
const von = document.querySelector("#von");
const skillsArr = [atl,atu,cie,dip,eng,fort,fur,ilu,inti,intu,inv,lut,med,ocu,per,pil,pon,pro,ref,rel,tat,tec,von];

// Variável botões
const addItem = document.querySelector("#add-item");
const addAbility = document.querySelector("#add-ability");
const saveChar = document.getElementById('save-character');
const deleteChar = document.getElementById('delete-character');
const goBack = document.getElementById('back-to-prev')

// Variável abilities
let abilities = [];
// Variável items
let items = [];

// Funções
addItem.addEventListener("click", () => {
    const itemDiv = document.querySelector(".item");
    const descriptionDiv = document.querySelector(".description");
    const amountDiv = document.querySelector(".amount");
    const removeDiv = document.querySelector(".delete-item");
    const itemInput = document.createElement("input");
    const descriptionInput = document.createElement("input");
    const amountInput = document.createElement("input");
    const removeButton = document.createElement("button");

    itemInput.value = "Item";
    descriptionInput.value = "Descrição";
    amountInput.value = "0";

    removeButton.classList.add("remove-item");

    const item = {
        input: itemInput.value,
        description: descriptionInput.value,
        amount: amountInput.value,
        remove: false
    }

    items.push(item);
    localStorage.setItem("items",JSON.stringify(items));

    itemInput.addEventListener("input", () => {
        item.input = itemInput.value;
        localStorage.setItem("items",JSON.stringify(items));
    })

    descriptionInput.addEventListener("input", () => {
        item.description = descriptionInput.value;
        localStorage.setItem("items",JSON.stringify(items));
    })

    amountInput.addEventListener("input", () => {
        item.amount = amountInput.value;
        localStorage.setItem("items",JSON.stringify(items));
    })

    removeButton.addEventListener("click", () => {
        item.remove = true;
        items = items.filter(element => element.remove === false);
        localStorage.setItem("items", JSON.stringify(items));

        itemDiv.removeChild(itemInput);
        descriptionDiv.removeChild(descriptionInput);
        amountDiv.removeChild(amountInput);
        removeDiv.removeChild(removeButton);
    })

    itemDiv.appendChild(itemInput);
    descriptionDiv.appendChild(descriptionInput);
    amountDiv.appendChild(amountInput);
    removeDiv.appendChild(removeButton);
})

addAbility.addEventListener("click", () => {
    const ul = document.querySelector("#ability-list");
    const li = document.createElement("li");
    const abilityDiv = document.createElement("div");
    const abilityName = document.createElement("input");
    const viewButton = document.createElement("button");
    const removeButton = document.createElement("button");
    const abilityInfoDiv = document.createElement("div");
    const info1 = document.createElement("div");
    const info2 = document.createElement("div");
    const info3 = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    const input3 = document.createElement("input");

    abilityName.value = "HABILIDADE";
    p1.textContent = "Descrição:";
    p2.textContent = "Dano:";
    p3.textContent = "Efeito:"; 


    viewButton.classList.add("view");
    removeButton.classList.add("remove");
    abilityDiv.classList.add("ability");
    abilityInfoDiv.classList.add("ability-info");
    info1.classList.add("info");
    info2.classList.add("info");
    info3.classList.add("info");

    const ability = {
        name: "HABILIDADE",
        input1: "",
        input2: "",
        input3: "",
        remove: false
    }

    viewButton.addEventListener("click", () => {
        abilityInfoDiv.classList.toggle("enable");
    })

    removeButton.addEventListener("click", () => {
        ul.removeChild(li);
        ability.remove = true;
        abilities = abilities.filter(element => element.remove != true);
        localStorage.setItem("abilities", JSON.stringify(abilities));
    })

    abilityName.addEventListener("input", () => {
        ability.name = abilityName.value;
        localStorage.setItem("abilities", JSON.stringify(abilities));
    })

    input1.addEventListener("input", () => {
        ability.input1 = input1.value;
        localStorage.setItem("abilities", JSON.stringify(abilities));
    })

    input2.addEventListener("input", () => {
        ability.input2 = input2.value;
        localStorage.setItem("abilities", JSON.stringify(abilities));
    })

    input3.addEventListener("input", () => {
        ability.input3 = input3.value;
        localStorage.setItem("abilities", JSON.stringify(abilities));
    })

    abilities.push(ability);
    localStorage.setItem("abilities", JSON.stringify(abilities));

    ul.appendChild(li);
    li.appendChild(abilityDiv);
    abilityDiv.appendChild(abilityName);
    abilityDiv.appendChild(viewButton);
    abilityDiv.appendChild(removeButton);
    abilityDiv.appendChild(abilityInfoDiv);
    abilityInfoDiv.appendChild(info1);
    info1.appendChild(p1);
    info1.appendChild(input1);
    abilityInfoDiv.appendChild(info2);
    info2.appendChild(p2);
    info2.appendChild(input2);
    abilityInfoDiv.appendChild(info3);
    info3.appendChild(p3);
    info3.appendChild(input3);
})

headerArr.forEach((element) => {
    element.addEventListener("input", () => {
        localStorage.setItem("header", JSON.stringify([character.value,player.value,origin.value,clas.value]));
    })
})

function loadHeader(){
    const header = JSON.parse(localStorage.getItem("header") || "[]");
    if(header.length !== 0){
        let i = 0;
        headerArr.forEach((element) => {
            element.value = header[i];
            i++;
        })
    }
}

mainAttArr.forEach((element) => {
    element.addEventListener("input", () => {
        localStorage.setItem("main-attributes", JSON.stringify([agility.value,strength.value,intelligence.value,presence.value,vigor.value]));
    })
})

function loadMainAt(){
    const main_attributes = JSON.parse(localStorage.getItem("main-attributes") || "[]");
    if(main_attributes.length !== 0){
        let i = 0;
        mainAttArr.forEach((element) => {
            element.value = main_attributes[i];
            i++;
        })
    }
}

healthAttArr.forEach((element)=> {
    element.addEventListener("input", ()=>{
        localStorage.setItem("health-attributes",JSON.stringify([pv.value,san.value,pe.value]));
    })
})

function loadHealthAt(){
    const health_attributes = JSON.parse(localStorage.getItem("health-attributes") || "[]" );
    if(health_attributes.length !== 0){
        let i = 0;
        healthAttArr.forEach((element) => {
            element.value = health_attributes[i];
            i++;
        })
    }
}

defenseAttArr.forEach((element) => {
    element.addEventListener("input", () => {
        localStorage.setItem("defense-attributes", JSON.stringify([pas.value,blo.value,esq.value]));
    })
})

function loadDefenseAt(){
    const defense_attributes = JSON.parse(localStorage.getItem("defense-attributes") || "[]");
    if(defense_attributes.length !== 0){
        let i = 0;
        defenseAttArr.forEach((element) => {
            element.value = defense_attributes[i];
            i++;
        })
    }
}

skillsArr.forEach((element) => {
    element.addEventListener("input", () => {
        localStorage.setItem("skills", JSON.stringify([atl.value,atu.value,cie.value,dip.value,eng.value,fort.value,fur.value,ilu.value,inti.value,intu.value,inv.value,lut.value,med.value,ocu.value,per.value,pil.value,pon.value,pro.value,ref.value,rel.value,tat.value,tec.value,von.value]));
    })
})

function loadSkills(){
    const skills = JSON.parse(localStorage.getItem("skills") || "[]");
    if(skills.length !== 0){
        let i = 0;
        skillsArr.forEach((element) => {
            element.value = skills[i];
            i++;
        })
    }
}

function loadAbilities(){
    const local_abilities = JSON.parse(localStorage.getItem("abilities") || "[]");
    if(local_abilities.length !== 0 && abilities.length === 0){
        local_abilities.forEach((element) => {
            abilities.push(element);
        })
    }

    local_abilities.forEach((ability) => {
        const ul = document.querySelector("#ability-list");
        const li = document.createElement("li");
        const abilityDiv = document.createElement("div");
        const abilityName = document.createElement("input");
        const viewButton = document.createElement("button");
        const removeButton = document.createElement("button");
        const abilityInfoDiv = document.createElement("div");
        const info1 = document.createElement("div");
        const info2 = document.createElement("div");
        const info3 = document.createElement("div");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const input1 = document.createElement("input");
        const input2 = document.createElement("input");
        const input3 = document.createElement("input");

        abilityName.value = ability.name;
        p1.textContent = "Descrição:";
        p2.textContent = "Dano:";
        p3.textContent = "Efeito:";
        input1.value = ability.input1;
        input2.value = ability.input2;
        input3.value = ability.input3;

        viewButton.classList.add("view");
        removeButton.classList.add("remove");
        abilityDiv.classList.add("ability");
        abilityInfoDiv.classList.add("ability-info");
        info1.classList.add("info");
        info2.classList.add("info");
        info3.classList.add("info");

        viewButton.addEventListener("click", () => {
            abilityInfoDiv.classList.toggle("enable");
        })

        removeButton.addEventListener("click", () => {
            ul.removeChild(li);
            ability.remove = true;
            abilities = abilities.filter(element => element.remove !== true);
            localStorage.setItem("abilities", JSON.stringify(abilities));
        })

        abilityName.addEventListener("input", () => {
            ability.name = abilityName.value;
            localStorage.setItem("abilities", JSON.stringify(abilities));
        })

        input1.addEventListener("input", () => {
            ability.input1 = input1.value;
            localStorage.setItem("abilities", JSON.stringify(abilities));
        })

        input2.addEventListener("input", () => {
            ability.input2 = input2.value;
            localStorage.setItem("abilities", JSON.stringify(abilities));
        })

        input3.addEventListener("input", () => {
            ability.input3 = input3.value;
            localStorage.setItem("abilities", JSON.stringify(abilities));
        })

        ul.appendChild(li);
        li.appendChild(abilityDiv);
        abilityDiv.appendChild(abilityName);
        abilityDiv.appendChild(viewButton);
        abilityDiv.appendChild(removeButton);
        abilityDiv.appendChild(abilityInfoDiv);
        abilityInfoDiv.appendChild(info1);
        info1.appendChild(p1);  
        info1.appendChild(input1);
        abilityInfoDiv.appendChild(info2);
        info2.appendChild(p2);
        info2.appendChild(input2);
        abilityInfoDiv.appendChild(info3);
        info3.appendChild(p3);
        info3.appendChild(input3);
    })
}

function loadItems(){

    const local_items = JSON.parse(localStorage.getItem("items") || "[]");
    if(local_items.length > 0){
        local_items.forEach(local_item => {
            items.push(local_item);
        })
    }

    if(items.length > 0){
        items.forEach(item => {
            const itemDiv = document.querySelector(".item");
            const descriptionDiv = document.querySelector(".description");
            const amountDiv = document.querySelector(".amount");
            const removeDiv = document.querySelector(".delete-item");
            const itemInput = document.createElement("input");
            const descriptionInput = document.createElement("input");
            const amountInput = document.createElement("input");
            const removeButton = document.createElement("button");

            itemInput.value = item.input;
            descriptionInput.value = item.description;
            amountInput.value = item.amount;

            removeButton.classList.add("remove-item");

            itemInput.addEventListener("input", () => {
                item.input = itemInput.value;
                localStorage.setItem("items",JSON.stringify(items));
            })

            descriptionInput.addEventListener("input", () => {
                item.description = descriptionInput.value;
                localStorage.setItem("items",JSON.stringify(items));
            })

            amountInput.addEventListener("input", () => {
                item.amount = amountInput.value;
                localStorage.setItem("items",JSON.stringify(items));
            })

            removeButton.addEventListener("click", () => {
                item.remove = true;
                items = items.filter(element => element.remove === false);
                localStorage.setItem("items", JSON.stringify(items));

                itemDiv.removeChild(itemInput);
                descriptionDiv.removeChild(descriptionInput);
                amountDiv.removeChild(amountInput);
                removeDiv.removeChild(removeButton);
            })

            itemDiv.appendChild(itemInput);
            descriptionDiv.appendChild(descriptionInput);
            amountDiv.appendChild(amountInput);
            removeDiv.appendChild(removeButton);
        })
    }
}

goBack.addEventListener("click", () => {
    window.location.href = "/";
})

saveChar.addEventListener('click', async () => {
    const charName = document.getElementById('character_name').value;
    const playName = document.getElementById('player_name').value;
    const charOrig = document.getElementById('character_origin').value;
    const charClas = document.getElementById('character_class').value;

    const agility = parseInt(document.getElementById('agility').value);
    const strength = parseInt(document.getElementById('strength').value);
    const intelligence = parseInt(document.getElementById('intelligence').value);
    const presence = parseInt(document.getElementById('presence').value);
    const vigor = parseInt(document.getElementById('vigor').value);

    const pv = document.getElementById('pv').value;
    const san = document.getElementById('san').value;
    const pe = document.getElementById('pe').value;

    const pas = parseInt(document.getElementById('pas').value);
    const blo = parseInt(document.getElementById('blo').value);
    const esq = parseInt(document.getElementById('esq').value);

    const atl = parseInt(document.getElementById('atl').value);
    const atu = parseInt(document.getElementById('atu').value);
    const cie = parseInt(document.getElementById('cie').value);
    const dip = parseInt(document.getElementById('dip').value);
    const eng = parseInt(document.getElementById('eng').value);
    const fort = parseInt(document.getElementById('for').value);
    const fur = parseInt(document.getElementById('fur').value);
    const ilu = parseInt(document.getElementById('ilu').value);
    const inti = parseInt(document.getElementById('inti').value);
    const intu = parseInt(document.getElementById('intu').value);
    const inv = parseInt(document.getElementById('inv').value);
    const lut = parseInt(document.getElementById('lut').value);
    const med = parseInt(document.getElementById('med').value);
    const ocu = parseInt(document.getElementById('ocu').value);
    const per = parseInt(document.getElementById('per').value);
    const pil = parseInt(document.getElementById('pil').value);
    const pon = parseInt(document.getElementById('pon').value);
    const pro = parseInt(document.getElementById('pro').value);
    const ref = parseInt(document.getElementById('ref').value);
    const rel = parseInt(document.getElementById('rel').value);
    const tat = parseInt(document.getElementById('tat').value);
    const tec = parseInt(document.getElementById('tec').value);
    const von = parseInt(document.getElementById('von').value);

    const local_abilities = JSON.parse(localStorage.getItem("abilities") || "[]");
    let abilities = [];

    local_abilities.forEach((ability) => {
        abilities.push({
            ability_name: ability.name,
            description: ability.input1,
            damage: ability.input2,
            effect: ability.input3
        })
    })

    const local_items = JSON.parse(localStorage.getItem("items") || "[]");
    let items = [];

    local_items.forEach((item) => {
        items.push({
            item_name: item.input,
            description: item.description,
            amount: item.amount
        })
    })

    const character = {
        character_info: {
            character_name: charName,
            player_name: playName,
            character_origin: charOrig,
            character_class: charClas
        },
        main_attributes: {
            agility: agility,
            strength: strength,
            intelligence: intelligence,
            presence: presence,
            vigor: vigor
        },
        health_attributes: {
            pv: pv,
            san: san,
            pe: pe
        },
        defense_attributes: {
            pas: pas,
            blo: blo,
            esq: esq
        },
        skills_values: {
            atl: atl,
            atu: atu,
            cie: cie,
            dip: dip,
            eng: eng,
            fort: fort,
            fur: fur,
            ilu: ilu,
            inti: inti,
            intu: intu,
            inv: inv,
            lut: lut,
            med: med,
            ocu: ocu,
            per: per,
            pil: pil,
            pon: pon,
            pro: pro,
            ref: ref,
            rel: rel,
            tat: tat,
            tec: tec,
            von: von
        },
        abilities_list: abilities,
        items_list: items
    };

    try {
        const response = await fetch('/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Personagem salvo com sucesso!');
            console.log(data);
        } else {
            const errorData = await response.json();
            console.error('Erro na validação do Pydantic:', errorData);
            alert('Erro ao salvar. Verifique o console para ver o que faltou.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
    }
});

deleteChar.addEventListener("click", async () => {
    const charName = document.getElementById('character_name').value;

    try {
        const response = await fetch(`/characters/${charName}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message)
        } else {
            const errorData = await response.json();
            console.error('Erro na validação do Pydantic:', errorData);
            alert('Erro ao remover. Verifique o console para ver o que faltou.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
    }
})

function loadLocal(){
    loadHeader();
    loadMainAt();
    loadHealthAt();
    loadDefenseAt();
    loadSkills();
    loadAbilities();
    loadItems();
}

loadLocal();
