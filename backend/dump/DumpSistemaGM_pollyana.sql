create database aula;
use aula;
CREATE TABLE `cadastro` ( 
  `idCadastro` INT AUTO_INCREMENT NOT NULL,
  `nome` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `telefone` VARCHAR(20) NOT NULL,
  `cpf` VARCHAR(20) NOT NULL,
  `endereco` VARCHAR(250) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idCadastro`)
);

drop database cadastro;

create database sistemaGM;
use sistemaGM;
CREATE TABLE `cadastro` ( 
  `idCadastro` INT AUTO_INCREMENT NOT NULL,
  `nome` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `telefone` VARCHAR(20) NOT NULL,
  `cpf` VARCHAR(20) NOT NULL,
  `endereco` VARCHAR(250) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idCadastro`)
);

CREATE TABLE `fornecedores` ( 
  `idFornecedor` INT AUTO_INCREMENT NOT NULL,
  `representanteImpresa` varchar(70) not null,
  `telefoneRepresentante` varchar(20) not null,
  `cargoRepresentante`varchar(50) not null,
  `cpfRepresentante` varchar(20) not null,
  `nomeImpresa` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `telefoneImpresa` VARCHAR(20) NOT NULL,
  `cnpj` VARCHAR(20) NOT NULL,
  `endereco` VARCHAR(250) NOT NULL,
  `siteImpresa` VARCHAR(200) ,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idFornecedor`)
);

alter table `fornecedores`
modify `siteImpresa` VARCHAR(200);

CREATE TABLE `clientes` ( 
  `idCliente` INT AUTO_INCREMENT NOT NULL,
  `representanteImpresa` varchar(70) not null,
  `telefoneRepresentante` varchar(20) not null,
  `cargoRepresentante`varchar(50) not null,
  `cpfRepresentante` varchar(20) not null,
  `nomeImpresa` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `telefoneImpresa` VARCHAR(20) NOT NULL,
  `cnpj` VARCHAR(20) NOT NULL,
  `endereco` VARCHAR(250) NOT NULL,
  `siteImpresa` VARCHAR(200) ,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idCliente`)
);


CREATE TABLE `contasReceber` ( 
  `idcontaReceber` INT AUTO_INCREMENT NOT NULL,
  `clasificacao` varchar(100) not null,
  `valorReceber` decimal(60,2)  not null,
  `vencimento` date not null,
  `empresa` varchar(100) not null,
  `contaBancaria` varchar(70) not null,
  `descricao` VARCHAR(150) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `valorRecebido` decimal(60,2) NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idcontaReceber`)
);

insert into contasReceber (clasificacao, valorReceber, vencimento, empresa, contaBancaria, descricao, status, valorRecebido)
values ('Receita com produto', '1345.38', '20240613', 'Indústria mecânica Perez', 'E01 - Banco do Brasil', 'Documento 328 - Parcela 3 de 3', 'Pendente', '0'),
('Receita com produto', '1345.98', '20240613', 'Indústria mecânica Perez', 'E61 - Banco do Brasil', 'Documento 328 - Parcela 1 de 3', 'Pendente', '0'),
('Receita com produto', '3230.76', '20240619', 'Grazzimetal - Indústria Metalúrgica	', 'E65 - Banco do Brasil', 'Documento 328 - Parcela 2 de 3', 'Pendente', '0'),
('Receita com produto', '1792.22', '20240923', 'Control - Indústria Metalúrgica', 'E54 - Banco do Brasil', 'Documento 328 - Parcela 4 de 9', 'Baixado', '1792.22'),
('Receita com produto', '1638.74', '20240613', 'Magneti Marelli Cofap - Indústria Metalúrgica', 'E07 - Banco do Brasil', 'Documento 328 - Parcela 3 de 3', 'Pendente', '0'),
('Receita com produto', '2729.52', '20240613', 'Metalúrgica Nel', 'E45 - Banco do Brasil', 'Documento 328 - Parcela 6 de 7', 'Pendente', '0'),
('Receita com produto', '1207.23', '20240729', 'Metalúrgica Nel', 'E45 - Banco do Brasil', 'Documento 328 - Parcela 5 de 5', 'Pendente', '0'),
('Receita com produto', '1268.92', '20240603', 'DANA | Sistemas de Transmissão', 'E28 - Banco do Brasil', 'Documento 328 - Parcela 5 de 5', 'Baixado', '1268.92'),
('Receita com produto', '2332.98', '20241013', 'Schaeffler Brasil', 'E98 - Banco do Brasil', 'Documento 328 - Parcela 2 de 5', 'Pendente', '0'),
('Receita com produto', '3000.00', '20240613', 'Schaeffler Brasil', 'E98 - Banco do Brasil', 'Documento 328 - Parcela 2 de 2', 'Pendente', '0'),
('Receita com produto', '1098.54', '20240613', 'Schaeffler Brasil', 'E98 - Banco do Brasil', 'Documento 328 - Parcela 8 de 6', 'Baixado', '1098.54'),
('Receita com produto', '1629.32', '20240928', 'Magneti Marelli Cofap - Indústria Metalúrgica', 'E07 - Banco do Brasil', 'Documento 328 - Parcela 3 de 3', 'Baixado', '1629.32'),
('Receita com produto', '1541.11', '20240928', 'Indústria mecânica Perez', 'E01 - Banco do Brasil', 'Documento 328 - Parcela 3 de 4', 'Pendente', '0'),
('Receita com produto', '2893.78', '20240928', 'Magneti Marelli Cofap - Indústria Metalúrgica', 'E07 - Banco do Brasil', 'Documento 328 - Parcela 4 de 4', 'Pendente', '0'),
('Receita com produto', '1984.52', '20240928', 'Indústria mecânica Perez', 'E01 - Banco do Brasil', 'Documento 328 - Parcela 1 de 3', 'Pendente', '0');


CREATE TABLE `contasPagar` ( 
  `idcontaPagar` INT AUTO_INCREMENT NOT NULL,
  `clasificacao` varchar(100) not null,
  `valorPagar` decimal(60,2)  not null,
  `vencimento` date not null,
  `empresa` varchar(100) not null,
  `contaBancaria` varchar(70) not null,
  `descricao` VARCHAR(150) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `valorPago` decimal(60,2) NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`idcontaPagar`)
);

insert into contasPagar (clasificacao, valorPagar, vencimento, empresa, contaBancaria, descricao, status, valorPago)
values ('Receita com produto', '1345.38', '20240613', 'Indústria mecânica Perez', 'E01 - Banco do Brasil', 'Documento 328 - Parcela 3 de 3', 'Pago', '1345.38'),
('Receita com produto', '1792.22', '20240923', 'Control - Indústria Metalúrgica', 'E54 - Banco do Brasil', 'Documento 328 - Parcela 4 de 9', 'Pendente', '0'),
('Receita com produto', '1638.74', '20240613', 'Magneti Marelli Cofap - Indústria Metalúrgica', 'E07 - Banco do Brasil', 'Documento 328 - Parcela 3 de 3', 'Pendente', '0'),
('Receita com produto', '2729.52', '20240613', 'Metalúrgica Nel', 'E45 - Banco do Brasil', 'Documento 328 - Parcela 6 de 7', 'Pendente', '0'),
('Receita com produto', '1207.23', '20240729', 'Metalúrgica Nel', 'E45 - Banco do Brasil', 'Documento 328 - Parcela 5 de 5', 'Pendente', '0'),
('Receita com produto', '1268.92', '20240603', 'DANA | Sistemas de Transmissão', 'E28 - Banco do Brasil', 'Documento 328 - Parcela 5 de 5', 'Pendente', '0'),
('Receita com produto', '3000.00', '20240613', 'Schaeffler Brasil', 'E98 - Banco do Brasil', 'Documento 328 - Parcela 2 de 2', 'Pendente', '0'),
('Receita com produto', '1098.54', '20240613', 'Schaeffler Brasil', 'E98 - Banco do Brasil', 'Documento 328 - Parcela 8 de 6', 'Baixado', '1098.54'),
('Receita com produto', '1629.32', '20240928', 'Magneti Marelli Cofap - Indústria Metalúrgica', 'E07 - Banco do Brasil', 'Documento 328 - Parcela 3 de 3', 'Pago', '1629.32'),
('Receita com produto', '1541.11', '20240928', 'Indústria mecânica Perez', 'E01 - Banco do Brasil', 'Documento 328 - Parcela 3 de 4', 'Pendente', '0'),
('Receita com produto', '2893.78', '20240928', 'Magneti Marelli Cofap - Indústria Metalúrgica', 'E07 - Banco do Brasil', 'Documento 328 - Parcela 4 de 4', 'Pendente', '0'),
('Receita com produto', '1984.52', '20240928', 'Indústria mecânica Perez', 'E01 - Banco do Brasil', 'Documento 328 - Parcela 1 de 3', 'Pendente', '0');


SELECT * FROM contasPagar
WHERE status = 'Pendente';
