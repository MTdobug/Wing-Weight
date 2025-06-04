CREATE DATABASE wwapp;
use wwapp;
CREATE TABLE Produtor (
    id_produtor INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(100) NOT NULL,
    cpf_cnpj VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20)
);

CREATE TABLE Granja (
    id_granja INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(100) NOT NULL,
    localizacao VARCHAR(150),
    proprietario_id INT FOREIGN KEY REFERENCES Produtor(id_produtor)
);

CREATE TABLE Galpao (
    id_galpao INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(100) NOT NULL,
    granja_id INT FOREIGN KEY REFERENCES Granja(id_granja)
);

CREATE TABLE Balanca (
    id_balanca INT PRIMARY KEY IDENTITY(1,1),
    codigo_vinculo VARCHAR(50) UNIQUE NOT NULL,
    granja_id INT FOREIGN KEY REFERENCES Granja(id_granja)
);

CREATE TABLE Lote (
    id_lote INT PRIMARY KEY IDENTITY(1,1),
    descricao VARCHAR(100),
    data_inicio DATE,
    data_fim DATE,
    granja_id INT FOREIGN KEY REFERENCES Granja(id_granja)
);

CREATE TABLE RegistroPeso (
    id_registro INT PRIMARY KEY IDENTITY(1,1),
    lote_id INT FOREIGN KEY REFERENCES Lote(id_lote),
    balanca_id INT FOREIGN KEY REFERENCES Balanca(id_balanca),
    data_hora DATETIME,
    peso_kg DECIMAL(10,2)
);

CREATE TABLE RegistroAmbiental (
    id_registro INT PRIMARY KEY IDENTITY(1,1),
    id_galpao INT FOREIGN KEY REFERENCES Galpao(id_galpao),
    data_hora DATETIME,
    temperatura DECIMAL(5,2),
    umidade DECIMAL(5,2),
    co2 DECIMAL(6,2)
);

CREATE TABLE USUARIO (
  id INT PRIMARY KEY IDENTITY(1,1),
  login VARCHAR(50) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL,
  tipo VARCHAR(20) DEFAULT 'produtor',
  produtor_id INT FOREIGN KEY REFERENCES Produtor(id_produtor)
);
