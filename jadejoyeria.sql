CREATE IF NOT EXISTS jadejoyeria DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; 
USE `jadejoyeria` ;

CREATE TABLE IF NOT EXISTS `jadejoyeria`.`clientes` (
  `idcliente` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(3),
  PRIMARY KEY (`idcliente`, `user`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `jadejoyeria`.`ventas` (
  `idventas` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL,
  `total` VARCHAR(45) NULL,
  `clientes_idcliente` INT NOT NULL,
  `clientes_user` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idventas`),
  INDEX `fk_ventas_clientes1_idx` (`clientes_idcliente` ASC, `clientes_user` ASC) VISIBLE,
  CONSTRAINT `fk_ventas_clientes1`
    FOREIGN KEY (`clientes_idcliente` , `clientes_user`)
    REFERENCES `jadejoyeria`.`clientes` (`idcliente` , `user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `jadejoyeria`.`productos` (
  `idproductos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `valor` INT NULL,
  `cantidad` INT NULL,
  `foto` VARCHAR(45) NULL,
  PRIMARY KEY (`idproductos`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `jadejoyeria`.`detalleVenta` (
  `productos_idproductos` INT NOT NULL,
  `ventas_idventas` INT NOT NULL,
  INDEX `fk_table1_productos_idx` (`productos_idproductos` ASC) VISIBLE,
  INDEX `fk_table1_ventas1_idx` (`ventas_idventas` ASC) VISIBLE,
  CONSTRAINT `fk_table1_productos`
    FOREIGN KEY (`productos_idproductos`)
    REFERENCES `jadejoyeria`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_ventas1`
    FOREIGN KEY (`ventas_idventas`)
    REFERENCES `jadejoyeria`.`ventas` (`idventas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `jadejoyeria`.`administradores` (
  `idAdmin` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`idAdmin`))
ENGINE = InnoDB;
