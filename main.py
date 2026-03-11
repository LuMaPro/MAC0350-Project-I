from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
import json
import os

class CharacterInfo(BaseModel):
    character_name: str = ''
    player_name: str = ''
    character_origin: str = ''
    character_class: str = ''

class MainAttributes(BaseModel):
    agility: int = 0
    strength: int = 0
    intelligence: int = 0
    presence: int = 0
    vigor: int = 0

class HealthAttributes(BaseModel):
    pv: str = ''
    san: str = ''
    pe: str = ''

class DefenseAttributes(BaseModel):
    pas: int = 0
    blo: int = 0
    esq: int = 0

class SkillsValues(BaseModel):
    atl: int = 0
    atu: int = 0
    cie: int = 0
    dip: int = 0
    eng: int = 0
    fort: int = 0
    fur: int = 0
    ilu: int = 0
    inti: int = 0
    intu: int = 0
    inv: int = 0
    lut: int = 0
    med: int = 0
    ocu: int = 0
    per: int = 0
    pil: int = 0
    pon: int = 0
    pro: int = 0
    ref: int = 0
    rel: int = 0
    tat: int = 0
    tec: int = 0
    von: int = 0

class Ability(BaseModel):
    ability_name: str = ''
    description: str = ''
    damage: str = ''
    effect: str = ''

class Item(BaseModel):
    item_name: str = ''
    description: str = ''
    amount: int = 0

class Character(BaseModel):
    character_info: CharacterInfo = Field(default_factory=CharacterInfo)
    main_attributes: MainAttributes = Field(default_factory=MainAttributes)
    health_attributes: HealthAttributes = Field(default_factory=HealthAttributes)
    defense_attributes: DefenseAttributes = Field(default_factory=DefenseAttributes)
    skills_values: SkillsValues = Field(default_factory=SkillsValues)
    abilities_list: list[Ability] = Field(default_factory=list)
    items_list: list[Item] = Field(default_factory=list)

def save_characters(save_path,characters):
    with open(save_path, "w", encoding="utf-8") as f:
        json.dump([char.model_dump() for char in characters], f, indent=4)

def load_characters(save_path):
    if os.path.exists(save_path):
        with open(save_path, "r", encoding="utf-8") as f:
            try:
                dados = json.load(f)
                return [Character(**char) for char in dados]
            except json.JSONDecodeError:
                return []
    return []
    
app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

save_path = "characters.json"

characters = load_characters(save_path)

@app.get("/", response_class=HTMLResponse)
async def root():
    return FileResponse("templates/index.html")

@app.get("/characters/")
async def get_characters():
    return characters

@app.post("/characters/")
async def post_characters(character: Character):
    for i, char in enumerate(characters):
        if char.character_info.character_name == character.character_info.character_name:
            characters[i] = character 
            save_characters(save_path,characters)
            return character
            
    characters.append(character)
    save_characters(save_path,characters)
    return character

@app.delete("/characters/{character_name}")
async def delete_character(character_name: str):
    for i, char in enumerate(characters):
        if char.character_info.character_name == character_name:
            personagem_removido = characters.pop(i)
            save_characters(save_path,characters)
            return {"mensagem": f"Personagem '{character_name}' deletado com sucesso!"}
