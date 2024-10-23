import client from '../config/connection.js';

export async function viewAllDepartments() {
    const result = client.query('SELECT * FROM departments');
    return (await result).rows;
}

export async function viewAllRoles() {
    const result = await client.query(`
    SELECT 
    roles.id, roles.title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments ON roles.department_id = departments.id
    `);
    return result.rows;
}

export async function viewAllEmployees() {
    const result = await client.query(`
    SELECT
    employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', 
    managers.last_name) AS manager
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    `);
    return result.rows;
}

export async function addDepartment(name: string) {
    await client.query('INSERT INTO departments (name) VALUES ($1)', [name]);
}

export async function addRole(title: string, salary: number, department_id: number) {
    await client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
}

export async function addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number | null) {
    await client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
}

export async function updateEmployeeRole(employee_id: number, role_id: number) {
    await client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
}