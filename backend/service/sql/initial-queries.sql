-- =========================
-- Customers tables
-- =========================

CREATE TABLE IF NOT EXISTS customer_identifier (
  customer_id SERIAL PRIMARY KEY,
  customer_email VARCHAR(255) UNIQUE NOT NULL,
  customer_phone_number VARCHAR(255) NOT NULL,
  customer_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_info (
  customer_info_id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  customer_first_name VARCHAR(255) NOT NULL,
  customer_last_name VARCHAR(255) NOT NULL,
  active_customer_status INTEGER NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
);

CREATE TABLE IF NOT EXISTS customer_vehicle_info (
  vehicle_id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  vehicle_year INTEGER NOT NULL,
  vehicle_make VARCHAR(255) NOT NULL,
  vehicle_model VARCHAR(255) NOT NULL,
  vehicle_type VARCHAR(255) NOT NULL,
  vehicle_mileage INTEGER NOT NULL,
  vehicle_tag VARCHAR(255) NOT NULL,
  vehicle_serial VARCHAR(255) NOT NULL,
  vehicle_color VARCHAR(255) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
);

-- =========================
-- Company tables
-- =========================

CREATE TABLE IF NOT EXISTS company_roles (
  company_role_id SERIAL PRIMARY KEY,
  company_role_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS common_services (
  service_id SERIAL PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL,
  service_description TEXT
);

-- =========================
-- Employee tables
-- =========================

CREATE TABLE IF NOT EXISTS employee (
  employee_id SERIAL PRIMARY KEY,
  employee_email VARCHAR(255) UNIQUE NOT NULL,
  active_employee INTEGER NOT NULL,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_info (
  employee_info_id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  employee_first_name VARCHAR(255) NOT NULL,
  employee_last_name VARCHAR(255) NOT NULL,
  employee_phone VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS employee_pass (
  employee_pass_id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  employee_password_hashed VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

CREATE TABLE IF NOT EXISTS employee_role (
  employee_role_id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  company_role_id INTEGER NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
);

-- =========================
-- Orders tables
-- =========================

CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  vehicle_id INTEGER NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active_order INTEGER NOT NULL,
  order_hash VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id)
);

CREATE TABLE IF NOT EXISTS order_info (
  order_info_id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  order_total_price INTEGER NOT NULL,
  estimated_completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completion_date TIMESTAMP,
  additional_request TEXT,
  notes_for_internal_use TEXT,
  notes_for_customer TEXT,
  additional_requests_completed INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE IF NOT EXISTS order_services (
  order_service_id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  service_completed INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (service_id) REFERENCES common_services(service_id)
);

CREATE TABLE IF NOT EXISTS order_status (
  order_status_id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  order_status INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- =========================
-- Default roles
-- =========================

INSERT INTO company_roles (company_role_name)
VALUES ('Employee'), ('Manager'), ('Admin')
ON CONFLICT DO NOTHING;

-- =========================
-- Admin account
-- =========================

INSERT INTO employee (employee_email, active_employee)
VALUES ('admin@admin.com', 1)
ON CONFLICT DO NOTHING;

INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES (1, 'Admin', 'Admin', '555-555-5555')
ON CONFLICT DO NOTHING;

-- password = 123456
INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES (1, '$2b$10$B6yvl4hECXploM.fCDbXz.brkhmgqNlawh9ZwbfkFX.F3xrs.15Xi')
ON CONFLICT DO NOTHING;

INSERT INTO employee_role (employee_id, company_role_id)
VALUES (1, 3)
ON CONFLICT DO NOTHING;