use vetasoft;

-- =====================================================
-- SECCIÓN 1: Procedimientos
-- =====================================================

-- procedimiento para creacion de usuarios 

DELIMITER $$
CREATE PROCEDURE sp_registrar_usuario (
    IN p_nombre VARCHAR(100),
    IN p_correo VARCHAR(100),
    IN p_contrasena VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_direccion VARCHAR(150),
    IN p_rol INT
)
BEGIN
    INSERT INTO Usuarios (Nombre, Correo, Contraseña, Telefono, Direccion, Rol)
    VALUES (p_nombre, p_correo, p_contrasena, p_telefono, p_direccion, p_rol);
END $$
DELIMITER ;

CALL sp_registrar_usuario(
    'Juan Pérez',
    'juanperez@mail.com',
    'clave123',
    '3001234567',
    'Calle 123 Bogotá',
    1
);

select*from Usuarios;


-- Procedimiento para Creacion de pacientes 
DROP PROCEDURE IF EXISTS sp_registrar_paciente;
DELIMITER $$
CREATE PROCEDURE sp_registrar_paciente (
    IN p_nombre VARCHAR(100),
    IN p_especie INT,     
    IN p_raza INT,
    IN p_edad INT,
    IN p_dueno_id INT
)
BEGIN
    INSERT INTO Pacientes (Nombre, Raza, Edad, Cliente)
    VALUES (p_nombre, p_raza, p_edad, p_dueno_id);
END $$
DELIMITER ;
drop procedure sp_registrar_paciente;

CALL sp_registrar_paciente(
    'Firulais',
    2,   -- p_especie (no se usa en este INSERT)
    3,   -- p_raza
    5,   -- p_edad
    7    -- p_dueno_id (id del cliente)
);
select*from pacientes;


select*from pacientes;


-- Procedimiento para Agendamiento de Citas 

DROP PROCEDURE IF EXISTS sp_agendar_cita;
DELIMITER $$
CREATE PROCEDURE sp_agendar_cita (
    IN p_paciente INT,
    IN p_veterinario INT,
    IN p_fecha DATETIME,
    IN p_motivo TEXT,
    IN p_estado INT,        
    IN p_creado_por INT,    
    IN p_tipo_consulta INT  
)
BEGIN
    INSERT INTO Citas (Paciente, Veterinario, Fecha_cita, Motivo, Estado, Creado_por, Tipo_consulta)
    VALUES (p_paciente, p_veterinario, p_fecha, p_motivo, p_estado, p_creado_por, p_tipo_consulta);
END $$
DELIMITER ;

CALL sp_agendar_cita(
    1,
    2,
    '2025-10-01 09:00:00',
    'Consulta general',
    1,
    1,
    3
);

select*from citas;



-- Procedimiento para Vacunas Aplicadas 

DELIMITER $$
CREATE PROCEDURE sp_registrar_vacuna (
    IN p_paciente INT,
    IN p_vacuna INT,
    IN p_veterinario INT,
    IN p_fecha DATE,
    IN p_lote VARCHAR(50),
    IN p_prox DATE,
    IN p_observaciones VARCHAR(200)
)
BEGIN
    INSERT INTO Historial_Vac (Paciente, Vacuna, Veterinario, Fecha_Vac, Lote_vac, Prox_vacuna, Observaciones)
    VALUES (p_paciente, p_vacuna, p_veterinario, p_fecha, p_lote, p_prox, p_observaciones);
END $$
DELIMITER ;

CALL sp_registrar_vacuna(
    1,   -- paciente
    2,   -- vacuna
    3,   -- veterinario
    '2025-09-20',
    'LOTE-XYZ',
    '2026-09-20',
    'Sin complicaciones'
);

select*from historial_vac;


-- Procedimiento para revisar El historial Clinico de un paciente 

DELIMITER $$
CREATE PROCEDURE sp_historial_paciente (
    IN p_paciente INT
)
BEGIN
    SELECT 'Cita' AS Tipo, Fecha_cita AS Fecha, Motivo AS Detalle, Estado
    FROM Citas
    WHERE Paciente = p_paciente
    
    UNION ALL
    
    SELECT 'Vacuna' AS Tipo, Fecha_Vac AS Fecha, Observaciones AS Detalle, NULL AS Estado
    FROM Historial_Vac
    WHERE Paciente = p_paciente
    
    ORDER BY Fecha DESC;
END $$
DELIMITER ;

CALL sp_historial_paciente(1);


-- Procedimiento para actualizar usuarios 

DELIMITER $$
CREATE PROCEDURE sp_actualizar_usuario (
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_contrasena VARCHAR(100),
    IN p_rol INT,
    IN p_correo VARCHAR(150),
    IN p_telefono VARCHAR(20),
    IN p_direccion VARCHAR(100)
)
BEGIN
    UPDATE Usuarios
    SET 
        Nombre      = p_nombre,
        Contraseña  = p_contrasena, -- encriptado
        Rol         = p_rol,
        Correo      = p_correo,
        Telefono    = p_telefono,
        Direccion   = p_direccion
    WHERE Usuario_id = p_id;
END$$
DELIMITER ;

CALL sp_actualizar_usuario(
  1,                          -- Usuario_id
  'Administrador Actualizado',-- Nombre
  'ClaveNueva2025',           -- Contraseña
  1,                          -- Rol (Administrador)
  'admin.nuevo@mail.com',     -- Correo
  '3119998888',               -- Teléfono
  'Av. Nueva #123 Bogotá'     -- Dirección
);

select*from usuarios;


-- =====================================================
-- SECCIÓN 2: Funciones
-- =====================================================

-- Proxima cita de un paciente 

DELIMITER $$
CREATE FUNCTION fn_proxima_cita(p_paciente_id INT)
RETURNS DATETIME
DETERMINISTIC
BEGIN
    DECLARE prox DATETIME;
    SELECT MIN(Fecha_cita) INTO prox
    FROM Citas
    WHERE Paciente = p_paciente_id AND Estado = 1; -- 1 = Pendiente
    RETURN prox;
END $$
DELIMITER ;

SELECT fn_proxima_cita(1) AS Proxima_Cita;


-- Especie del paciente 

DELIMITER $$
CREATE function fn_especie_nombre(p_especie_id INT)
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
    DECLARE nombre VARCHAR(100);
    SELECT Nombre_especie INTO nombre
    FROM Especies
    WHERE Especie_id = p_especie_id
    LIMIT 1;
    RETURN nombre;
END $$
DELIMITER ;

SELECT fn_especie_nombre(1) AS Nombre_Especie;


-- contacto del dueño del paciente 

DELIMITER $$
CREATE FUNCTION fn_contacto_dueno(p_paciente_id INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE telefono VARCHAR(20);
    SELECT c.Telefono INTO telefono
    FROM Pacientes p
    JOIN Clientes c ON p.Cliente = c.Cliente_id
    WHERE p.Pacientes_id = p_paciente_id;
    RETURN telefono;
END $$
DELIMITER ;

SELECT fn_contacto_dueno(1) AS Telefono_Dueno;


-- Total vacunas de un paciente 

DELIMITER $$
CREATE FUNCTION fn_total_vacunas(p_paciente_id INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total
    FROM Historial_Vac
    WHERE Paciente = p_paciente_id;
    RETURN total;
END $$
DELIMITER ;

SELECT fn_total_vacunas(1) AS Total_Vacunas;


-- Ultima Vacuna aplicada al paciente 

DELIMITER $$
CREATE FUNCTION fn_ultima_vacuna(paciente_id INT)
RETURNS DATE
DETERMINISTIC
BEGIN
    DECLARE ultima DATE;
    SELECT MAX(Fecha_Vac) INTO ultima
    FROM Historial_Vac
    WHERE Paciente = paciente_id;
    RETURN ultima;
END $$
DELIMITER ;

SELECT fn_ultima_vacuna(1) AS Ultima_Vacuna;



-- =====================================================
-- SECCIÓN 3: Triggers
-- =====================================================

-- Evitar agendamiento de citas en una fecha anterior 

DELIMITER $$
CREATE TRIGGER trg_citas_before_insert
BEFORE INSERT ON Citas
FOR EACH ROW
BEGIN
  IF NEW.Fecha_cita < NOW() THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede agendar una cita en una fecha anterior a hoy';
  END IF;
END$$
DELIMITER ;


-- Eliminar citas si se elimina un paciente 

DELIMITER $$
CREATE TRIGGER trg_pacientes_after_delete
AFTER DELETE ON Pacientes
FOR EACH ROW
BEGIN
  DELETE FROM Citas 
  WHERE Paciente = OLD.Pacientes_id;
END$$
DELIMITER ;

-- Generar proxima vacuna 

DROP TRIGGER IF EXISTS trg_vacunas_before_insert;
DELIMITER $$
CREATE TRIGGER trg_vacunas_before_insert
BEFORE INSERT ON Historial_Vac
FOR EACH ROW
BEGIN
  SET NEW.Prox_vacuna = DATE_ADD(NEW.Fecha_Vac, INTERVAL 1 YEAR);
END$$
DELIMITER ;


-- Contador de citas por paciente 

DELIMITER $$
CREATE TRIGGER trg_citas_after_insert
AFTER INSERT ON Citas
FOR EACH ROW
BEGIN
  UPDATE Pacientes
  SET total_citas = COALESCE(total_citas,0) + 1
  WHERE Pacientes_id = NEW.Paciente;
END$$
DELIMITER ;

-- Trigger validación monto de recaudado

DELIMITER $$
CREATE TRIGGER trg_donaciones_after_insert
AFTER INSERT ON Donaciones
FOR EACH ROW
BEGIN
  UPDATE Monto_Donaciones
  SET Monto_total = Monto_total + NEW.Monto
  WHERE Monto_id = 1;
END$$
DELIMITER ;



-- =====================================================
-- SECCIÓN 4: Encriptación
-- =====================================================

-- Encriptacion de contraseña al momento de ingresar el usuario 

DELIMITER $$

CREATE TRIGGER trg_usuarios_before_insert
BEFORE INSERT ON Usuarios
FOR EACH ROW
BEGIN
  SET NEW.Contraseña = SHA2(NEW.Contraseña, 256);
END$$

DELIMITER ;

-- Encriptacion de contraseña al momento de actualizar el usuario 

DELIMITER $$

CREATE TRIGGER trg_usuarios_before_update
BEFORE UPDATE ON Usuarios
FOR EACH ROW
BEGIN
  IF NEW.Contraseña <> OLD.Contraseña THEN
    SET NEW.Contraseña = SHA2(NEW.Contraseña, 256);
  END IF;
END$$

DELIMITER ;



-- Encriptacion de contraseñas en la tabla de usuarios. Se usa el SHA2, Ya que es el mas recomendado dado a la longitud de caracteres que se generan al momento de la encriptacion
UPDATE Usuarios
SET Contraseña = SHA2(Contraseña, 256);
Select * from Usuarios 
