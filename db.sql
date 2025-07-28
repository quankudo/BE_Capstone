CREATE DATABASE IF NOT EXISTS RestaurantDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE RestaurantDB;

-- Cities
CREATE TABLE Cities (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL
);

-- Districts
CREATE TABLE Districts (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    IdCity INT NOT NULL,
    FOREIGN KEY (IdCity) REFERENCES Cities(Id)
);

-- Users
CREATE TABLE Users (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    IdDistrict INT,
    Role VARCHAR(50),
    FOREIGN KEY (IdDistrict) REFERENCES Districts(Id)
);

-- TypeRestaurants
CREATE TABLE TypeRestaurants (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    ImageUrl VARCHAR(255)
);

-- Restaurants
CREATE TABLE Restaurants (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(150) NOT NULL,
    Website VARCHAR(255),
    Status BOOLEAN DEFAULT TRUE,
    Email VARCHAR(150),
    `Desc` TEXT,
    GoodReviews INT,
    BadReviews INT,
    RateScore DECIMAL(10,2),
    ImageUrl VARCHAR(255),
    Latitude DOUBLE,
    Longitude DOUBLE,
    PhoneNumber VARCHAR(20),
    OpenTime TIME,
    CloseTime TIME,
    IdDistrict INT,
    IdUser INT,
    FOREIGN KEY (IdUser) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdDistrict) REFERENCES Districts(Id)
);

-- TypeDishes
CREATE TABLE TypeDishes (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    ImageUrl VARCHAR(255)
);

-- Dishes
CREATE TABLE Dishes (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Status BOOLEAN DEFAULT TRUE,
    Name VARCHAR(100),
    `Desc` TEXT,
    ImageUrl VARCHAR(255),
    Price DECIMAL(10,2),
    IdTypeDish INT,
    GoodReviews INT,
    BadReviews INT,
    RateScore DECIMAL(10,2),
    IdRes INT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IdTypeDish) REFERENCES TypeDishes(Id),
    FOREIGN KEY (IdRes) REFERENCES Restaurants(Id)
);

-- EvaluateRestaurants
CREATE TABLE EvaluateRestaurants (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdUser INT,
    Comment TEXT,
    Status BOOLEAN DEFAULT TRUE,
    IdRes INT,
    TypeReview BOOLEAN,
    ScoreStar INT CHECK (ScoreStar BETWEEN 1 AND 5),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (IdUser) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdRes) REFERENCES Restaurants(Id)
);

-- EvaluateDishes
CREATE TABLE EvaluateDishes (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdUser INT,
    Comment TEXT,
    Status BOOLEAN DEFAULT TRUE,
    IdDish INT,
    TypeReview BOOLEAN,
    ScoreStar INT CHECK (ScoreStar BETWEEN 1 AND 5),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (IdUser) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdDish) REFERENCES Dishes(Id)
);

-- FavoriteRestaurants
CREATE TABLE FavoriteRestaurants (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdUser INT,
    IdRes INT,
    FOREIGN KEY (IdUser) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdRes) REFERENCES Restaurants(Id)
);

-- FavoriteDishes
CREATE TABLE FavoriteDishes (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdUser INT,
    IdDish INT,
    FOREIGN KEY (IdUser) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdDish) REFERENCES Dishes(Id)
);

-- Blogs
CREATE TABLE Blogs (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255),
    `Desc` TEXT,
    Created DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status BOOLEAN DEFAULT TRUE,
    IdUser INT,
    FOREIGN KEY (IdUser) REFERENCES Users(Id)
);

-- Tags
CREATE TABLE Tags (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100)
);

-- Blogs_Tags (many-to-many)
CREATE TABLE Blogs_Tags (
    TagId INT,
    BlogId INT,
    PRIMARY KEY (TagId, BlogId),
    FOREIGN KEY (TagId) REFERENCES Tags(Id),
    FOREIGN KEY (BlogId) REFERENCES Blogs(Id)
);

-- ImageBlogs
CREATE TABLE ImageBlogs (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    ImageUrl VARCHAR(255),
    IdBlog INT,
    FOREIGN KEY (IdBlog) REFERENCES Blogs(Id)
);

-- CommentBlogs
CREATE TABLE CommentBlogs (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Comment TEXT,
    IdUser INT,
    Status BOOLEAN DEFAULT TRUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IdBlog INT,
    FOREIGN KEY (IdBlog) REFERENCES Blogs(Id),
    FOREIGN KEY (IdUser) REFERENCES Users(Id)
);

-- Notifications
CREATE TABLE Notifications (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdUser INT,
    Content TEXT,
    IsRead BOOLEAN DEFAULT FALSE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IdUser) REFERENCES Users(Id) ON DELETE CASCADE
);
