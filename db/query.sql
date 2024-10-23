\c employee_tracker_db



SELECT 
    id AS department_id,
    name AS department_name
FROM departments;


SELECT
    roles.id AS role_id,
    roles.title AS role_title,
    roles.salary AS role_salary,
    department.name AS department_name
FROM roles
JOIN departments
    ON roles.department_id = department.id;

SELECT
    employees.id AS employee_id,
    employee.first_name AS employee_first_name,
    employee.last_name AS employee_last_name,
    roles.title AS role_title,
    department.name AS department_name,
     role.salary AS role_salary,
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name
FROM employees
JOIN roles 
    ON employees.role_id = roles.id
Join departments
    ON roles.department_id = department.id
LEFT JOIN employees AS managers
    ON employees.manager_id = manager.id;


INSERT INTO departments (name) VALUES ('New Department');

INSERT INTO roles (title, salary, department_id) VALUES ('New Role', 70000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, null);

UPDATE employees SET role_id = 2 WHERE id = 1;