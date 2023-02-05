
DROP TABLE transaction;
DROP TABLE product;
DROP TABLE vendor;
DROP TABLE destination;
DROP TABLE travel_type;
DROP TABLE supplier;
DROP TABLE customer;

-- CREATE TABLE statements for the Travel_DB, 03 February, 2023.
-- Created by Ruslan Kalashnikov.

CREATE OR REPLACE TABLE Customer (
  customer_id 		VARCHAR(50) PRIMARY KEY,
  first_name  		VARCHAR(30) NOT NULL,
  last_name  		VARCHAR(300) NOT NULL,
  street_address 	VARCHAR(155),
  city 				VARCHAR(30),
  state 			CHAR(2),
  cust_phone 			VARCHAR(12) NOT NULL,
  email 			VARCHAR(30)
);

INSERT INTO
  Customer (customer_id, first_name, last_name, street_address, city, state, cust_phone, email)
VALUES
  ('1234567892345678987643', 'Ruslan', 'Kalashnikov', '378 Hope Loop', 'Eugene', 'OR', '916-595-9706', 'rjandson1@hotmail.com'),
  ('1234567892345678987644', 'Timofej', 'Kalashnikov', '7136 Stanford Oak Dr', 'Sacramento', 'CA', '916-833-6050', 'timandlyuba@hotmail.com')
;


CREATE OR REPLACE TABLE Destination (
  destination_id 	CHAR(3) PRIMARY KEY,
  destination_name 	VARCHAR(50)
);

INSERT INTO
  Destination (destination_id, destination_name)
VALUES
  ('VNO', 'Lithuania'),
  ('N/A', 'not available')
;


CREATE OR REPLACE TABLE Travel_Type (
  type_id 			VARCHAR(50) PRIMARY KEY
);

INSERT INTO
  Travel_Type (type_id)
VALUES
  ('activity'),
  ('adjustment'),
  ('car'),
  ('change'),
  ('cruise'),
  ('date change'),
  ('exchange'),
  ('fee'),
  ('flight'),
  ('hotel'),
  ('insurance'),
  ('misc'),
  ('n/a'),
  ('package'),
  ('rail'),
  ('rebate'),
  ('service fee'),
  ('tour'),
  ('transfers'),
  ('travel credit'),
  ('xnl fee')
;


CREATE OR REPLACE TABLE Supplier (
  supplier_id 			CHAR(3) PRIMARY KEY,
  supplier_name 		VARCHAR(50) NOT NULL,
  supplier_phone		VARCHAR(12) NOT NULL
);

INSERT INTO
  Supplier (supplier_id, supplier_name, supplier_phone)
VALUES
  ('TPI', 'Travel Planners Intl', '407-331-3888'),
  ('AAG', 'AA Group Dept', '800-433-1790'),
  ('AFR', 'Airfare.com', '000-000-0000'),
  ('ALL', 'All About Hawaii', '000-000-0000'),
  ('DAL', 'Delta Airlines', '800-221-1212'),
  ('EXP', 'Expedia.com', '866-925-7718'),
  ('GOG', 'GOGO Vacations', '201-934-3500'),
  ('HAL', 'Holland America Cruises', '877-932-4259'),
  ('JST', 'Just Fly', '000-000-0000'),
  ('JTB', 'Jet Blue Airlines', '800-538-2583'),
  ('KYK', 'Kayak.com', 'n/a'),
  ('ORB', 'Orbitz.com', '000-000-0000'),
  ('PIC', 'Picasso Travel', '310-645-4400'),
  ('PLS', 'Pleasant Holidays', '866-247-6659'),
  ('PRC', 'Princess Cruises', '800-774-6237'),
  ('RHW', 'Russian Hawaii', '000-000-0000'),
  ('TBD', 'To Be Determined', '000-000-0000'),
  ('UAT', 'United Tours', '000-000-0000'),
  ('USV', 'US Vacations', '000-000-0000'),
  ('VAY', 'Vayama.com', '000-000-0000'),
  ('VEX', 'Vacation Express', '800-309-4717')
;


CREATE OR REPLACE TABLE Vendor (
  vendor_id 			CHAR(3) PRIMARY KEY,
  vendor_name 			VARCHAR(50) NOT NULL
);

INSERT INTO
  Vendor (vendor_id, vendor_name)
VALUES
  ('DLV', 'Delta Vacations'),
  ('FUN', 'Funjet Vacations'),
  ('APL', 'Apple Vacations'),
  ('WNV', 'Southwest Vacations'),
  ('VEX', 'Vacation Express'),
  ('UAV', 'United Vacations'),
  ('AAV', 'American Airlines Vacations'),
  ('ALZ', 'Allianz Insurance'),
  ('BED', 'Bedsonline'),
  ('UAA', 'United Airlines'),
  ('LHA', 'Lufthansa Airlines'),
  ('TKA', 'Turkish Airlines'),
  ('KLM', 'KLM Airlines'),
  ('DLA', 'Delta Airlines'),
  ('SUA', 'Aeroflot Airlines'),
  ('WNA', 'Southwest Airlines'),
  ('SKA', 'Scandinavian Airlines'),
  ('OSA', 'Austrian Airlines'),
  ('UAL', 'United Airlines'),
  ('TBD', 'To Be Determind')
;


CREATE OR REPLACE TABLE Product (
  product_id 			INT PRIMARY KEY AUTO_INCREMENT,
  fk_destination_id 		CHAR(3) NOT NULL,
  fk_type_id 			VARCHAR(50) NOT NULL,
  fk_vendor_id 			CHAR(3) NOT NULL,
  fk_supplier_id 		CHAR(3) NOT NULL,
  size_of_party			INT NOT NULL,
  party_info  		VARCHAR(300),
  product_cost			FLOAT NOT NULL,
  product_comm			FLOAT NOT NULL,
  is_comm_received		CHAR(1) NOT NULL,
  travel_start_date		DATE NOT NULL,
  travel_end_date		DATE,
  CONSTRAINT `prod_destination_id`
    FOREIGN KEY (fk_destination_id) REFERENCES Destination (destination_id),
  CONSTRAINT `prod_type_id`
    FOREIGN KEY (fk_type_id) REFERENCES Travel_Type (type_id),
  CONSTRAINT `prod_vendor_id`
    FOREIGN KEY (fk_vendor_id) REFERENCES Vendor (vendor_id),
  CONSTRAINT `prod_supplier_id`
    FOREIGN KEY (fk_supplier_id) REFERENCES Supplier (supplier_id)
);

INSERT INTO
  Product (fk_destination_id, fk_type_id, fk_vendor_id, fk_supplier_id, size_of_party, party_info, product_cost, product_comm, is_comm_received, travel_start_date, travel_end_date)
VALUES
  ('VNO', 'Flight', 'DLV','TPI', 1, 'n/a', 777.77, 55.99, 'N', '2021-12-05', NULL),
  ('VNO', 'Flight', 'FUN', 'TPI', 1, 'n/a', 2000, 100, 'N', '2021-10-25', NULL)
;


CREATE OR REPLACE TABLE Transaction (
  transation_id 		INT PRIMARY KEY AUTO_INCREMENT,
  fk_customer_id 		VARCHAR(50) NOT NULL,
  fk_product_id 		INT NOT NULL,
  transaction_type		CHAR(2) NOT NULL,
  transaction_amount	FLOAT NOT NULL,
  transaction_date		DATE NOT NULL,
  CONSTRAINT `trans_customer_id`
    FOREIGN KEY (fk_customer_id) REFERENCES Customer (customer_id),
  CONSTRAINT `trans_product_id`
    FOREIGN KEY (fk_product_id) REFERENCES Product (product_id)
);

INSERT INTO
  Transaction (fk_customer_id, fk_product_id, transaction_type, transaction_amount, transaction_date)
VALUES
  ('1234567892345678987643', 1, 'CC', 777.77, '2021-06-10'),
  ('1234567892345678987644', 2, 'CC', 2000, '2021-07-07')
;






















