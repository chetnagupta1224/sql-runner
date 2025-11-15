import sqlite3

conn = sqlite3.connect("sql_runner.db")
cur = conn.cursor()

# Drop tables if already exist
cur.execute("DROP TABLE IF EXISTS Shippings;")
cur.execute("DROP TABLE IF EXISTS Orders;")
cur.execute("DROP TABLE IF EXISTS Customers;")

# Create Customers
cur.execute("""
CREATE TABLE Customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    country TEXT
);
""")

# Insert sample Customers
cur.execute("""
INSERT INTO Customers VALUES
(1, 'Alice', 30, 'USA'),
(2, 'Bob', 25, 'India'),
(3, 'Charlie', 29, 'UK'),
(4, 'Daisy', 35, 'Canada');
""")

# Create Orders
cur.execute("""
CREATE TABLE Orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    product TEXT,
    amount INTEGER,
    FOREIGN KEY(customer_id) REFERENCES Customers(id)
);
""")

# Insert Orders
cur.execute("""
INSERT INTO Orders VALUES
(1, 1, 'Laptop', 1200),
(2, 2, 'Phone', 800),
(3, 3, 'Keyboard', 150),
(4, 1, 'Mouse', 40);
""")

# Create Shippings
cur.execute("""
CREATE TABLE Shippings (
    id INTEGER PRIMARY KEY,
    order_id INTEGER,
    status TEXT,
    FOREIGN KEY(order_id) REFERENCES Orders(id)
);
""")

# Insert Shippings
cur.execute("""
INSERT INTO Shippings VALUES
(1, 1, 'Delivered'),
(2, 2, 'In Transit'),
(3, 3, 'Pending'),
(4, 4, 'Delivered');
""")

conn.commit()
conn.close()

print("Database created successfully!")
