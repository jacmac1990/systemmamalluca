CREATE TABLE user(
    id_user CHAR(11) NOT NULL,  
    nombre CHAR(45) NOT NULL,
    apellido CHAR(45) NOT NULL,    
    PRIMARY KEY(id_user);
);

CREATE TABLE tours(
    id_tours INT(11),
    name_tours CHAR(45),
    PRIMARY KEY(id_tours)
);

CREATE TABLE reservation(
    id_reservation CHAR(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
    date_reservation DATE NOT NULL,
    day_reservation DATE NOT NULL,
    id_tours INT(11) NOT NULL,
    phone INT(11),
    num_of_adults INT(11),
    num_of_childrens INT(11),
    transfers INT(11),
    PRIMARY KEY(id_reservation),
    FOREIGN KEY ()
);



