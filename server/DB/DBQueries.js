import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();
let db;

class DB {
    
    static init(dbName, tableName) {
        // if (dbName !== 'string' || tableName !== 'string' || dbName.length < 1 || tableName < 1) 
        //     throw new Error('incorrect type of names')

        this.#createBD(dbName);
        this.#createTable(dbName, tableName);
    }

    static #createBD(name) {
        if (!(typeof name === "string" && name.length > 0)){

            return console.error("Incorrect name for DB");
        }

        const DB_NAME = name;
        let DB_PATH = `./${DB_NAME}.db`

        try {
            db = new sqlite.Database(DB_PATH, (err) => {
                if (err)
                    return console.error(err);
                console.log(`Database ${DB_NAME} has been connected`);
            });
            db.close();
        } catch (e) {
            console.error(e);
        }

    }


    static #createTable(dataBaseName, tableName){

        if (!(typeof tableName === "string" && tableName.length > 0))
            return console.error("Incorrect name for Table");

        const DB_NAME = dataBaseName;
        let DB_PATH = `./${DB_NAME}.db`
        const TABLE_NAME = tableName;

        // let isTableCreated = (db.run(`SELECT name FROM sqlite_master WHERE type='table' AND name='${TABLE_NAME}';`, err =>{
        //     return !!err;
        // }));

        try {
            db.serialize(() => {

                db = new sqlite.Database(DB_PATH, (err) => {
                    if (err)
                        return console.error(err.message);
                    console.log(`Database ${DB_NAME} has been connected`);
                })
                // if Table haven't created before
                // In my mind db.run opens the DB
                .run(`CREATE TABLE ${TABLE_NAME}(id INTEGER PRIMARY KEY AUTOINCREMENT)`, (err) => {
                    if (err)
                        return console.error("Table already created");
                    console.log("Table has been created")
                });
            });
        } catch (e) {
            console.error(e);
        }
        db.close();
    }


    static removeTable(dataBaseName, tableName){

        let DB_PATH = `./${dataBaseName}.db`

        db = new sqlite.Database(DB_PATH, (err) => {
            if (err)
                return console.error(err.message);
            console.log(`Database ${dataBaseName} has not been removed`);
        });

        db.run(`DROP TABLE IF EXISTS ${tableName};`, (err) => {
            if (err)
                return console.error(err.message);
            console.log(`Table ${tableName} has been removed`)
        });
    }


    static addColsInTable(dataBaseName, tableName, colsNames){
        // удалить параметр colsNames, добавить метод getColNames
        let DB_PATH = `./${dataBaseName}.db`

        try {
            db = new sqlite.Database(DB_PATH, (err) => {
                if (err)
                    return console.error(err.message);
                console.log(`Database ${dataBaseName} has been connected`);
            })

            for (let i = 0; i < colsNames.length; i++) {
                db.run(`ALTER TABLE ${tableName} ADD COLUMN ${colsNames[i]};`)
            }
        } catch (e) {
            console.error(e);
        }
    }

    static addElementsInTable(dataBaseName, tableName, colNames, elements){
        // Избавиться от параметра colNames

        let DB_PATH = `./${dataBaseName}.db`
        db = new sqlite.Database(DB_PATH)

        db.run(`INSERT INTO ${tableName}(${colNames}) VALUES(` + '?,'.repeat(elements.length-1) + '?)', elements, function(err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid: ${this.lastID}`);
        });
    }


    static removeElementFromTable(dataBaseName, tableName, removedElement){
        let DB_PATH = `./${dataBaseName}.db`
        db = new sqlite.Database(DB_PATH)

        try {
            db.run(`DELETE FROM ${tableName} WHERE name = '${removedElement}';`, (err) => {
                if (err)
                    console.error(err.message);
                console.log(`Element ${removedElement} has been removed`);
            })
        } catch (e) {
            console.error(e);
        }
    }

    static clearTable(dataBaseName, tableName){
        let DB_PATH = `./${dataBaseName}.db`
        db = new sqlite.Database(DB_PATH)

        try {
            db.run(`DELETE FROM ${tableName};`);
        } catch (e) {
            return console.error(e);
        }
        console.log(`${tableName} has been cleared`)
    }

}

export default DB