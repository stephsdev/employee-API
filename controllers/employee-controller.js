const Employee = require("../model/employee");

exports.getAllEmployees = async (req, res, next) => {
    try {
        const [employees, _] = await Employee.findAll();

        res.status(200).json({ count: employees.length, employees });
    } catch (error) {
        next(error);
    }
}

exports.insertNewEmployee = async (req, res, next) => {
    try {
        let employee = new Employee(req.body);
        
        employee = await employee.save();
        console.log("Employee: ", employee);
        res.status(201).json({ message: "Employee added" });
      } catch (error) {
        next(error);
      }
}

exports.getEmployee = async (req, res, next) => {
    try {
        let email = req.params.email;
        const [employee, _] = await Employee.findByEmail(email);
        res.status(200).json({ employee: employee[0] });
    } catch(error) {
        next(error);
    }
}

exports.updateEmployee = async (req, res, next) => {
    try {
        let email = req.params.email;
        let updateValues = await req.body;
        let employee = Employee.findByEmail(email);
        employee = new Employee(employee);
        employee = await employee.updateByEmail(email, updateValues);
        res.status(200).json({ employee: employee });
    } catch(error) {
        next(error);
    }
}

exports.deleteEmployee = async (req, res, next) => {
    try {
        let email = req.params.email;
        let employee = Employee.findByEmail(email);
        employee = new Employee(employee);
        employee = await employee.delete(email);
        res.status(200).json({ employee: employee })
    } catch(error) {
        next(error);
    }
}