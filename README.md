# 🏰 Ironia do Medo - Character Sheet 🐉

## 💬 Important content

This project is a massive evolution of my original [RPG-Character-Sheet](https://github.com/LuMaPro/RPG-Character-Sheet). 

It has been completely refactored into a modern Full-Stack application! Here are the main new features and upgrades implemented:

* **FastAPI Backend:** A robust, fully functional REST API handling all core logic and routing.
* **SQLModel & SQLite:** Migrated from plain JSON data to a relational database, perfectly handling complex 1-to-Many relationships (like dynamic Items and Abilities).
* **HTMX Integration:** Replaced heavy Vanilla JavaScript `fetch` requests with HTMX. This achieved a seamless, SPA-like experience using pure HTML attributes for all CRUD operations.
* **Live Search:** Implemented real-time character filtering that queries the database interactively using HTMX triggers.
* **Smart Draft System:** Blended frontend `localStorage` with the backend database, auto-saving user progress as a "draft" to ensure no data is lost before the final save.

## 🧾 Credits

The RPG Ironia do Medo was designed by my friend Thiago Montenegro and inspired by the Ordem Paranormal system.

https://ordemparanormal.fandom.com/wiki/Ordem_Paranormal

## 🔍 General Overview

Create your own character with unique abilities and items. This character sheet is designed to help you easily organize your character's stats, skills and items in a clear and intuitive layout.

## ⚙️ How to run

This project runs on a FastAPI backend and requires a Python environment to work locally. Follow these steps to set it up:

**1. Clone or download the repository, then open your terminal in the project folder.**

**2. Create and activate a virtual environment:**

For **Linux/macOS**:
> ```bash
> python3 -m venv --without-pip .venv
> source .venv/bin/activate
> ```

For **Windows**:
> ```powershell
> python3 -m venv --without-pip .venv
> .venv\Scripts\Activate.ps1
> ```

**3. Install dependencies and run the application:**

> ```bash
> wget [https://bootstrap.pypa.io/get-pip.py](https://bootstrap.pypa.io/get-pip.py) && python3 get-pip.py
> touch requirements.txt
> echo "fastapi[standard]" > requirements.txt
> pip install -r requirements.txt
> fastapi dev
> ```

Once the server is running, open your web browser and go to `http://127.0.0.1:8000` to access the application!

## 👤 Author

- Lucas Martins Próspero
