from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from typing import Optional, List
from sqlmodel import SQLModel, Field, Session, select, create_engine, Relationship

class Ability(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    ability_name: str = ''
    description: str = ''
    damage: str = ''
    effect: str = ''
    character_id: int | None = Field(default=None, foreign_key="character.id")
    
    character: "Character" = Relationship(back_populates="abilities_list")

class Item(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    item_name: str = ''
    description: str = ''
    amount: int = 0
    character_id: int | None = Field(default=None, foreign_key="character.id")
    
    character: "Character" = Relationship(back_populates="items_list")

class Character(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    character_name: str = Field(index=True) 
    player_name: str = ''
    character_origin: str = ''
    character_class: str = ''

    agility: int = 0
    strength: int = 0
    intelligence: int = 0
    presence: int = 0
    vigor: int = 0

    pv: str = ''
    san: str = ''
    pe: str = ''

    pas: int = 0
    blo: int = 0
    esq: int = 0

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

    abilities_list: List[Ability] = Relationship(
        back_populates="character", 
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )
    items_list: List[Item] = Relationship(
        back_populates="character",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )
    
app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=True)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

templates = Jinja2Templates(directory="templates")

@app.get("/")
def root(request: Request):
    return templates.TemplateResponse(request=request, name="prev.html")

@app.get("/characters")
def get_characters(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")

@app.post("/characters", response_class=HTMLResponse)
async def create_character(character_data: dict):
    with Session(engine) as session:
        char_name = character_data.get("character_name")
        if session.exec(select(Character).where(Character.character_name == char_name)).first():
            return "<div style='color:red;'>Personagem já existe. Use Atualizar.</div>"

        abilities_data = character_data.pop("abilities_list", [])
        items_data = character_data.pop("items_list", [])
        
        new_char = Character(**character_data)
        for ab in abilities_data: new_char.abilities_list.append(Ability(**ab))
        for it in items_data: new_char.items_list.append(Item(**it))
            
        session.add(new_char)
        session.commit()
        return "<div style='color:green; font-weight:bold;'>Criado com sucesso!</div>"

@app.delete("/characters/{character_name}", response_class=HTMLResponse)
async def delete_character(character_name: str):
    with Session(engine) as session:
        db_character = session.exec(select(Character).where(Character.character_name == character_name)).first()
        if db_character:
            session.delete(db_character)
            session.commit()
        return ""

@app.get("/api/characters")
def get_all_characters():
    with Session(engine) as session:
        characters = session.exec(select(Character)).all()
        return characters
    
@app.get("/api/characters/{character_name}")
def get_single_character(character_name: str):
    with Session(engine) as session:
        query = select(Character).where(Character.character_name == character_name)
        db_character = session.exec(query).first()
        
        if not db_character:
            raise HTTPException(status_code=404, detail="Personagem não encontrado.")
            
        char_data = db_character.model_dump()
        char_data["abilities_list"] = [ab.model_dump() for ab in db_character.abilities_list]
        char_data["items_list"] = [it.model_dump() for it in db_character.items_list]
        
        return char_data

@app.put("/characters", response_class=HTMLResponse)
async def update_character(character_data: dict):
    with Session(engine) as session:
        char_name = character_data.get("character_name")
        db_character = session.exec(select(Character).where(Character.character_name == char_name)).first()
        
        if not db_character:
            return "<div style='color:red;'>Personagem não encontrado. Crie primeiro.</div>"

        abilities_data = character_data.pop("abilities_list", [])
        items_data = character_data.pop("items_list", [])
        
        for key, value in character_data.items():
            if hasattr(db_character, key):
                setattr(db_character, key, value)
        
        db_character.abilities_list.clear()
        db_character.items_list.clear()
        for ab in abilities_data: db_character.abilities_list.append(Ability(**ab))
        for it in items_data: db_character.items_list.append(Item(**it))
            
        session.add(db_character)
        session.commit()
        return "<div style='color:blue; font-weight:bold;'>Atualizado com sucesso!</div>"

@app.get("/partials/characters", response_class=HTMLResponse)
def get_characters_partial(q: str | None = None):
    with Session(engine) as session:
        if q:
            query = select(Character).where(Character.character_name.ilike(f"%{q}%"))
            characters = session.exec(query).all()
        else:
            characters = session.exec(select(Character)).all()

        if not characters:
            return "<p style='text-align: center; color: #313131; padding: 10px;'>Nenhum personagem encontrado com esse nome.</p>"

        html = ""
        for char in characters:
            html += f"""
            <li class="character-item">
                <span class="character-name">{char.character_name}</span>
                <div>
                    <button class="select-btn" onclick="selecionarPersonagem('{char.character_name}')">Carregar</button>
                    <button style="background-color: #ff4d4d; color: white; border: 2px solid #313131; border-radius: 5px; cursor: pointer; padding: 5px 10px; margin-left: 5px;"
                            hx-delete="/characters/{char.character_name}"
                            hx-target="closest li"
                            hx-swap="outerHTML">Excluir</button>
                </div>
            </li>
            """
        return html
