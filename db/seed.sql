INSERT INTO departments (name) VALUES 
    ('Enginerring'),
    ('Human Resources'),
    ('Marketing');


INSERT INTO roles (title, salary, department_id) VALUES 
    ('Software Engineer', 80000, 1),
    ('HR Manager', 60000, 2),
    ('Marketing Specialist', 50000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
    ('Bob', 'Smith', 1, null),
    ('Jane', 'Doe', 2, null),
    ('Frank', 'Wilson', 3, 2);