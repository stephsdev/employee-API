const db = require("../config/db");

// User class for handling interactions with user table (or create if it doesn't exist)
class User {
    constructor(fields = {}) {
        this.name = fields.name;
        this.email = fields.email;
        this.password = fields.password;
        this.schema = 
        `
            CREATE TABLE IF NOT EXISTS Users (
                id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(30),
                email VARCHAR(255),
                password VARCHAR(255)
            )
        `;
    }
    // Create the User table using the class construcotr schema
    async createIfNotExists(schema) {
        db.execute(schema);
    }
    // Runs the check to create the db if it doesn't exist and then inserts the new user
    async save() {
        await this.createIfNotExists(this.schema);
        let sql = 
        `
            INSERT INTO Users (
                name,
                email,
                password
            )
            Values (
                '${this.name}',
                '${this.email}',
                '${this.password}'
            )
        `;
        const [newUser, _] = await db.execute(sql);
        return newUser;
    }
}
/* Exmaple of creating a new User from the class ~~~~~~~~
let newUser = new User({ name: 'Jen', email: 'jen@dummy.com', password: 'poopbutt2' });
newUser.save().then(resp => console.log(resp)).catch(error => console.log(error));
*/