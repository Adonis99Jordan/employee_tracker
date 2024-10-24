import inquirer from 'inquirer';
import 'console.table';

import {viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './query.js';


export async function showMainMenu() {
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
    });
    
    switch (action) {
        case 'View all departments':
            console.table(await viewAllDepartments());
            break;
        case 'View all roles':
            console.table(await viewAllRoles());
            break;
        case 'View all employees':
            console.table(await viewAllEmployees());
            break;
        case 'Add a department':
            const {departmentName} = await inquirer.prompt({
                name: 'departmentName',
                type: 'input',
                message: 'Enter the name of the department:',
            });
            await addDepartment(departmentName);
            console.log(`Added department: ${departmentName}`);
            break;
        case 'Add a role':
            const departments = await viewAllDepartments();
            const { roleTitle, roleSalary, roleDepartmentId} = await inquirer.prompt([
                {name: 'roleTitle', type: 'input', message: 'Enter the title of the role:'},
                {name: 'roleSalary', type: 'input', message: 'Enter the salary of the role:'},
                {
                    name: 'roleDepartmentId',
                    type: 'list',
                    message: 'Select the department for the role:',
                    choices: departments.map(department => ({name: department.name, value: department.id})),
                },
            ]);
            await addRole(roleTitle, parseFloat(roleSalary), roleDepartmentId);
            console.log(`Added role: ${roleTitle}`);
            break;
        case 'Add an employee':
            const roles = await viewAllRoles();
            const employees = await viewAllEmployees();
            const {first_name, last_name, role_id, manager_id} = await inquirer.prompt([
                {name: 'first_name', type: 'input', message: 'Enter the first name of the employee:'},
                {name: 'last_name', type: 'input', message: 'Enter the last name of the employee:'},
                {
                    name: 'role_id',
                    type: 'list',
                    message: 'Select the role for the employee:',
                    choices: roles.map(role => ({name: role.title, value: role.id})),
                },
                {
                    name: 'manager_id',
                    type: 'list',
                    message: 'Select the manager for the employee (if any):',
                    choices: [{name: 'None', value: null}]. concat(employees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id}))),
                },
            ]);
            await addEmployee(first_name, last_name, role_id, manager_id);
            console.log(`Added employee: ${first_name} ${last_name}`);
            break;
        case 'Update an employee role':
            const allEmployees = await viewAllEmployees();
            const allRoles = await viewAllRoles();
            const {employee_id, new_role_id} = await inquirer.prompt([
                {
                    name: 'employee_id',
                    type: 'list',
                    message: 'Select the employee to update:',
                    choices: allEmployees.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id})),
                },
                {
                    name: 'new_role_id',
                    type: 'list',
                    message: 'Select the new role for the employee:',
                    choices: allRoles.map(role => ({name: role.title, value: role.id})),
                },
            ]);
            await updateEmployeeRole(employee_id, new_role_id);
            console.log(`Update employee's role`);
            break;
        case 'Exit':
            console.log('Exiting application...');
            process.exit();
        }

        showMainMenu();
}
