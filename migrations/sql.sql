-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-08-20 10:10:05.2

-- tables
-- Table: Banner
CREATE TABLE Banner (
    id serial  NOT NULL,
    name varchar(200) NOT NULL,
    url varchar(200) NOT NULL,
    menu_id int  NOT NULL,
    status int  NOT NULL,
    position varchar(200) NOT NULL,
    CONSTRAINT Banner_pk PRIMARY KEY (id)
);

-- Table: Category
CREATE TABLE Category (
    id serial  NOT NULL,
    name varchar(200) NOT NULL,
    thumbnail varchar(200) NOT NULL,
    status int  NOT NULL,
    CONSTRAINT Category_pk PRIMARY KEY (id)
);

-- Table: Menu
CREATE TABLE Menu (
    id serial  NOT NULL,
    name varchar(200) NULL,
    priority int  NULL,
    url varchar(200) NOT NULL,
    status int  NOT NULL,
    style varchar(200) NOT NULL,
    CONSTRAINT Menu_pk PRIMARY KEY (id)
);

-- Table: Product
CREATE TABLE Product (
    id serial  NOT NULL,
    sub_category_id int  NOT NULL,
    name varchar(200) NOT NULL,
    code varchar(200) NOT NULL,
    trademark varchar(200) NOT NULL,
    rate float NOT NULL,
    price int  NOT NULL,
    sale int  NOT NULL,
    description varchar(200) NOT NULL,
    content varchar(200) NOT NULL,
    quanlity int  NOT NULL,
    status int  NOT NULL,
    CONSTRAINT Product_pk PRIMARY KEY (id)
);

-- Table: Product_Images
CREATE TABLE Product_Images (
    id serial  NOT NULL,
    product_id int  NOT NULL,
    url varchar(200) NOT NULL,
    status int  NOT NULL,
    priority int  NOT NULL,
    CONSTRAINT Product_Images_pk PRIMARY KEY (id)
);

-- Table: Product_Size
CREATE TABLE Product_Size (
    Product_id int  NOT NULL,
    Size_id int  NOT NULL
);

-- Table: Size
CREATE TABLE Size (
    id serial  NOT NULL,
    name varchar(200) NOT NULL,
    CONSTRAINT Size_pk PRIMARY KEY (id)
);

-- Table: Sub_Category
CREATE TABLE Sub_Category (
    id serial  NOT NULL,
    category_id int  NOT NULL,
    name varchar(200) NOT NULL,
    status int  NOT NULL,
    CONSTRAINT Sub_Category_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: BANNER_MENU (table: Banner)
ALTER TABLE Banner ADD CONSTRAINT BANNER_MENU
    FOREIGN KEY (menu_id)
    REFERENCES Menu (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Product_Images_Product (table: Product_Images)
ALTER TABLE Product_Images ADD CONSTRAINT Product_Images_Product
    FOREIGN KEY (product_id)
    REFERENCES Product (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Product_Size_Product (table: Product_Size)
ALTER TABLE Product_Size ADD CONSTRAINT Product_Size_Product
    FOREIGN KEY (Product_id)
    REFERENCES Product (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Product_Size_Size (table: Product_Size)
ALTER TABLE Product_Size ADD CONSTRAINT Product_Size_Size
    FOREIGN KEY (Size_id)
    REFERENCES Size (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Product_Sub_Category (table: Product)
ALTER TABLE Product ADD CONSTRAINT Product_Sub_Category
    FOREIGN KEY (sub_category_id)
    REFERENCES Sub_Category (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Sub_Category_Category (table: Sub_Category)
ALTER TABLE Sub_Category ADD CONSTRAINT Sub_Category_Category
    FOREIGN KEY (category_id)
    REFERENCES Category (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

