const db = require("../config/db");
// Employee Class to handle interactions with the database
class Employee {
    // this too much - maybe we don't need the slack user id since slack api has lookup by email method
    constructor(slack_user_id, lname, fname, email, phone, years_employed, annual_leave, sick_leave, personal_day, title, manager_email) {
        this.slack_user_id = slack_user_id;
        this.lname = lname;
        this.fname = fname;
        this.email = email;
        this.phone = phone;
        this.years_employed = years_employed;
        this.annual_leave = annual_leave;
        this.sick_leave = sick_leave;
        this.personal_day = personal_day;
        this.title = title;
        this.manager_email = manager_email;
    }
    // handles posts for adding new employees to the database
    async save() {
        let sql = `
            INSERT INTO employees(
                slack_user_id, 
                lname, 
                fname, 
                email, 
                phone, 
                years_employed, 
                annual_leave, 
                sick_leave, 
                personal_day, 
                title, 
                manager_email
            )
            VALUES(
                '${this.slack_user_id}',
                '${this.lname}',
                '${this.fname}',
                '${this.email}',
                '${this.phone}',
                ${this.years_employed},
                ${this.annual_leave},
                ${this.sick_leave},
                ${this.personal_day},
                '${this.title}',
                '${this.manager_email}'
            )
        `;

        const [newEmployee, _] = await db.execute(sql);
        
        return newEmployee;
    }
    // handles updates to emplyees in the database; set values must be accurate for type and match the columns as they appear in db
    async updateByEmail(email, setVals = {}) {
        let setColumnsArray = []; // empty array to store the list of values formatted correctly for sql
        for (const column in setVals) {
            if (typeof setVals[column] === 'number') { // if the value is a number, format as a number
                setColumnsArray.push(`${column} = ${setVals[column]}`)
            } else { // otherwise format as string (with quotes); 
                setColumnsArray.push(`${column} = '${setVals[column]}'`); // remember the quotes on string type, values w/o return sql suntax errors!
            }
        }

        let sql = `UPDATE employees SET ${setColumnsArray.join(', ')} WHERE email = '${email}'`;
        console.log(sql);

        const [updatedEmployee, _] = await db.execute(sql); // submit mysql query to db

        return updatedEmployee; // return what was done
    }

    async deleteByEmail(email) {
        let sql =  `DELETE * FROM employees WHERE email = '${email};`;

        const [deletedEmployee, _] = await db.execute(sql);

        return deletedEmployee;
    }

    static findAll() {
        let sql = "SELECT * FROM employees;";

        return db.execute(sql);
    }

    static findByEmail(email) {
        let sql = `SELECT * FROM employees WHERE email = '${email}';`;

        return db.execute(sql);
    }

}

module.exports = Employee;