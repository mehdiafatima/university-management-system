#! /usr/bin/env node
import inquirer from "inquirer";
// creating student class
class Student {
    static counter;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = Student.counter++;
        this.courses = [];
        this.balance = 5000;
    }
    // Method to enroll students in a class
    enroll_Courses(course) {
        this.courses.push(course);
    }
    // Method to view student balance
    view_Balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    // Method to pay student tution fees
    pay_Fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid sucessfully for ${this.name}`);
    }
    // Method to display student status
    show_status() {
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`courses : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}
// Student manager to manage students
class manage_Student {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add new students
    add_Student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added sucessfully student ID: ${student.id} `);
    }
    // Method to enroll students in a course
    enroll_Students(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_Courses(course);
            console.log(`${student} enrolled in ${course} sucessfully!`);
        }
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_Balance();
        }
        else {
            console.log("Student not found. Please enter a correct student ID ");
        }
    }
    // Method to pay student fee
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_Fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID ");
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find((student) => student.id === student_id);
    }
}
// Main function to run this code
async function main() {
    console.log("Welcome to 'MehdiaFatimaFaizi' - Student Management System");
    console.log("-".repeat(50));
    let student_manager = new manage_Student();
    // Using While Loop to keep my program ruuning 
    while (true) {
        let choice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "Select an option ",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case to handle user the choices 
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name"
                    }]);
                student_manager.add_Student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([{
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "Course",
                        type: "Input",
                        message: "Enter a Course Name"
                    }
                ]);
                student_manager.enroll_Students(course_input.Student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([{
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }]);
                student_manager.view_student_balance(balance_input.Student_id);
                break;
            case "Pay Student Fees":
                let Fees_input = await inquirer.prompt([{
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter a Amount to pay"
                    }
                ]);
                student_manager.pay_student_fees(Fees_input.Student_id, Fees_input.amount);
                break;
            case "Show Student Status":
                let status_input = await inquirer.prompt([{
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }]);
                student_manager.add_Student(status_input.Student.id);
                break;
            case "Exit":
                console.log("Exiting.......");
                process.exit();
        }
    }
}
;
// Calling a main function
main();
