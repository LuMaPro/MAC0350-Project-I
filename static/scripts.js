const inputIds = [
    'character_name', 'player_name', 'character_origin', 'character_class',
    'agility', 'strength', 'intelligence', 'presence', 'vigor',
    'pv', 'san', 'pe', 'pas', 'blo', 'esq',
    'atl', 'atu', 'cie', 'dip', 'eng', 'for', 'fur', 'ilu', 'inti', 'intu', 
    'inv', 'lut', 'med', 'ocu', 'per', 'pil', 'pon', 'pro', 'ref', 'rel', 'tat', 'tec', 'von'
];

document.addEventListener("DOMContentLoaded", async () => {
    const charToLoad = localStorage.getItem("characterToLoad");

    if (charToLoad) {
        try {
            const response = await fetch(`/api/characters/${charToLoad}`);
            if (response.ok) {
                const data = await response.json();

                const abilities = (data.abilities_list || []).map(ab => ({
                    name: ab.ability_name,
                    input1: ab.description,
                    input2: ab.damage,
                    input3: ab.effect
                }));
                localStorage.setItem("abilities", JSON.stringify(abilities));

                const items = (data.items_list || []).map(it => ({
                    input: it.item_name,
                    description: it.description,
                    amount: it.amount
                }));
                localStorage.setItem("items", JSON.stringify(items));

                const draft = {};
                inputIds.forEach(id => {
                    const dbKey = (id === 'for') ? 'fort' : id;
                    draft[id] = data[dbKey] !== undefined ? data[dbKey] : '';
                });
                localStorage.setItem("characterDraft", JSON.stringify(draft));

                localStorage.removeItem("characterToLoad");

                window.location.reload();
                return; 
            }
        } catch (error) {
            console.error("Erro ao tentar ler os dados do banco:", error);
            alert("Houve um erro ao carregar o personagem. Verifique o console.");
            return; 
        }
    }

    const savedDraft = JSON.parse(localStorage.getItem("characterDraft") || "{}");
    
    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input && savedDraft[id] !== undefined) {
            input.value = savedDraft[id];
        }
        
        if (input) {
            input.addEventListener("input", () => {
                const currentDraft = JSON.parse(localStorage.getItem("characterDraft") || "{}");
                currentDraft[id] = input.value;
                localStorage.setItem("characterDraft", JSON.stringify(currentDraft));
            });
        }
    });

});

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

function montarPayloadPersonagem() {
    const local_abilities = JSON.parse(localStorage.getItem("abilities") || "[]");
    const local_items = JSON.parse(localStorage.getItem("items") || "[]");

    return {
        character_name: document.getElementById('character_name').value,
        player_name: document.getElementById('player_name').value,
        
        abilities_list: local_abilities.map(ab => ({
            ability_name: ab.name, description: ab.input1, damage: ab.input2, effect: ab.input3
        })),
        items_list: local_items.map(it => ({
            item_name: it.input, description: it.description, amount: it.amount
        }))
    };
}

deleteChar.addEventListener("click", async () => {
    const charName = document.getElementById('character_name').value;

    try {
        const response = await fetch(`/characters/${charName}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        } else {
            const errorData = await response.json();
            console.error('Erro na requisição:', errorData);
            
            if (errorData.detail) {
                alert(errorData.detail);
            } else {
                alert('Erro ao remover. Verifique o console.');
            }
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
    }
});

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
