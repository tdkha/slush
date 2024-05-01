create table users(
	id SERIAL primary key   not null,
    username varchar(255) not null,
    password varchar(255) not null,
    created_at date not null ,
    updated_at date not null,
    state varchar(100) not null DEFAULT 'active' CHECK (state IN ('active','inactive') )
);

create table roles(
	id SERIAL primary key not null,
    title varchar(200)
);

create table user_roles (
    user_id int not null,
    role_id int not null,
    PRIMARY KEY (user_id, role_id),
    foreign key (user_id) references users(id),
    foreign key (role_id) references roles(id)
);

CREATE TABLE developers(
	id SERIAL PRIMARY KEY NOT NULL,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(50) NOT NULL,
	email VARCHAR(255) NOT NULL,
	address text NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE seats
(
	id SERIAL PRIMARY KEY NOT NULL,
	col INT NOT NULL,
	row INT NOT NULL,
	user_id INT,
	state varchar(100) not null DEFAULT 'free' CHECK (state IN ('free','taken') ),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO roles VALUES(1, 'admin');
INSERT INTO roles VALUES(2, 'developer');

INSERT INTO seats (col, row, state) VALUES(1, 1, 'free');
INSERT INTO seats (col, row, state) VALUES(2, 1, 'free');
INSERT INTO seats (col, row, state) VALUES(3, 1, 'free');
INSERT INTO seats (col, row, state) VALUES(4, 1, 'free');
INSERT INTO seats (col, row, state) VALUES(5, 1, 'free');

INSERT INTO seats (col, row, state) VALUES(1, 2, 'free');
INSERT INTO seats (col, row, state) VALUES(2, 2, 'free');
INSERT INTO seats (col, row, state) VALUES(3, 2, 'free');
INSERT INTO seats (col, row, state) VALUES(4, 2, 'free');
INSERT INTO seats (col, row, state) VALUES(5, 2, 'free');
