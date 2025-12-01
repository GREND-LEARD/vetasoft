-- ============================================
-- Base de Datos Vetasoft - PostgreSQL (Neon)
-- Migrado desde MySQL
-- ============================================

-- Nota: En Neon/PostgreSQL no necesitas CREATE DATABASE, 
-- ya viene con una base de datos por defecto

-- ============================================
-- CONFIGURACIÓN DE SCHEMA
-- ============================================
-- Asegurarse de que el schema public existe
CREATE SCHEMA IF NOT EXISTS public;

-- Establecer el schema de búsqueda (search path)
SET search_path TO public;

-- Dar permisos al schema public (por si acaso)
GRANT ALL ON SCHEMA public TO PUBLIC;

-- ============================================
-- TABLA: Roles de Usuario
-- ============================================
CREATE TABLE roles_usuario (
    rol_id SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: Usuarios
-- ============================================
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL, -- Sin ñ para evitar problemas
    telefono VARCHAR(20),
    direccion VARCHAR(100),
    rol_id INT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (rol_id) REFERENCES roles_usuario(rol_id) ON DELETE RESTRICT
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_usuarios_correo ON usuarios(correo);
CREATE INDEX idx_usuarios_rol ON usuarios(rol_id);

-- ============================================
-- TABLA: Clientes
-- ============================================
CREATE TABLE clientes (
    cliente_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150),
    telefono VARCHAR(20),
    direccion VARCHAR(100),
    fecha_nacimiento DATE,
    documento_id VARCHAR(50) NOT NULL UNIQUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    empleado_id INT,
    FOREIGN KEY (empleado_id) REFERENCES usuarios(usuario_id) ON DELETE SET NULL
);

CREATE INDEX idx_clientes_documento ON clientes(documento_id);
CREATE INDEX idx_clientes_empleado ON clientes(empleado_id);

-- ============================================
-- TABLAS: Especies y Razas
-- ============================================
CREATE TABLE especies (
    especie_id SERIAL PRIMARY KEY,
    nombre_especie VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE razas (
    raza_id SERIAL PRIMARY KEY,
    especie_id INT NOT NULL,
    nombre_raza VARCHAR(50) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (especie_id) REFERENCES especies(especie_id) ON DELETE RESTRICT,
    UNIQUE (especie_id, nombre_raza)
);

-- ============================================
-- TABLA: Animales/Mascotas
-- ============================================
-- Crear ENUM para sexo
CREATE TYPE sexo_animal AS ENUM ('Macho', 'Hembra');

-- Crear ENUM para estado
CREATE TYPE estado_animal AS ENUM ('Activo', 'Adoptado', 'En adopcion');

CREATE TABLE animales (
    animal_id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    raza_id INT NOT NULL,
    edad SMALLINT NOT NULL CHECK (edad BETWEEN 0 AND 150),
    fecha_nacimiento DATE,
    peso DECIMAL(5,2) NOT NULL CHECK (peso > 0),
    sexo sexo_animal NOT NULL,
    descripcion TEXT NOT NULL,
    numero_chip VARCHAR(50) UNIQUE,
    estado estado_animal DEFAULT 'Activo',
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id) ON DELETE RESTRICT,
    FOREIGN KEY (raza_id) REFERENCES razas(raza_id) ON DELETE RESTRICT
);

CREATE INDEX idx_animales_cliente ON animales(cliente_id);
CREATE INDEX idx_animales_estado ON animales(estado);

-- ============================================
-- TABLA: Veterinarios
-- ============================================
CREATE TABLE veterinarios (
    veterinario_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    numero_licencia VARCHAR(50) NOT NULL UNIQUE,
    especialidad VARCHAR(100),
    fecha_contratacion DATE,
    horario_inicio TIME,
    horario_fin TIME,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE RESTRICT
);

CREATE INDEX idx_veterinarios_usuario ON veterinarios(usuario_id);
CREATE INDEX idx_veterinarios_licencia ON veterinarios(numero_licencia);

-- ============================================
-- TABLAS: Estados de Citas y Tipos de Consulta
-- ============================================
CREATE TABLE estado_citas (
    estado_id SERIAL PRIMARY KEY,
    estado_nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MOVIDO AQUÍ (antes de citas)
CREATE TABLE tipo_consulta (
    tipo_consulta_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    costo DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: Citas
-- ============================================
CREATE TABLE citas (
    cita_id SERIAL PRIMARY KEY,
    animal_id INT NOT NULL,
    veterinario_id INT NOT NULL,
    tipo_consulta_id INT NOT NULL,
    fecha_cita TIMESTAMP NOT NULL,
    motivo TEXT,
    estado_id INT NOT NULL,
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_por INT NOT NULL,
    FOREIGN KEY (animal_id) REFERENCES animales(animal_id) ON DELETE RESTRICT,
    FOREIGN KEY (veterinario_id) REFERENCES veterinarios(veterinario_id) ON DELETE RESTRICT,
    FOREIGN KEY (tipo_consulta_id) REFERENCES tipo_consulta(tipo_consulta_id) ON DELETE RESTRICT,
    FOREIGN KEY (estado_id) REFERENCES estado_citas(estado_id) ON DELETE RESTRICT,
    FOREIGN KEY (creado_por) REFERENCES usuarios(usuario_id) ON DELETE RESTRICT
);

CREATE INDEX idx_citas_animal ON citas(animal_id);
CREATE INDEX idx_citas_veterinario ON citas(veterinario_id);
CREATE INDEX idx_citas_tipo_consulta ON citas(tipo_consulta_id);
CREATE INDEX idx_citas_fecha ON citas(fecha_cita);
CREATE INDEX idx_citas_estado ON citas(estado_id);

-- ============================================
-- TABLA: Historial Médico
-- ============================================
CREATE TABLE historial_medico (
    historial_id SERIAL PRIMARY KEY,
    cita_id INT NOT NULL,
    animal_id INT NOT NULL,
    veterinario_id INT NOT NULL,
    tipo_consulta_id INT NOT NULL,
    fecha_consulta TIMESTAMP,
    sintomas TEXT,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT NOT NULL,
    examenes_realizados TEXT,
    medicamentos TEXT,
    proxima_cita TIMESTAMP,
    observaciones TEXT,
    peso DECIMAL(5,2),
    temperatura DECIMAL(4,1),
    frecuencia_cardiaca INT,
    frecuencia_respiratoria INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cita_id) REFERENCES citas(cita_id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES animales(animal_id) ON DELETE RESTRICT,
    FOREIGN KEY (veterinario_id) REFERENCES veterinarios(veterinario_id) ON DELETE RESTRICT,
    FOREIGN KEY (tipo_consulta_id) REFERENCES tipo_consulta(tipo_consulta_id) ON DELETE RESTRICT
);

CREATE INDEX idx_historial_cita ON historial_medico(cita_id);
CREATE INDEX idx_historial_animal ON historial_medico(animal_id);
CREATE INDEX idx_historial_veterinario ON historial_medico(veterinario_id);
CREATE INDEX idx_historial_tipo_consulta ON historial_medico(tipo_consulta_id);

-- ============================================
-- TABLA: Campañas de Donación
-- ============================================
CREATE TABLE campana_donacion (
    campana_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    meta_monto DECIMAL(12,2) NOT NULL CHECK (meta_monto > 0),
    monto_recaudado DECIMAL(12,2) DEFAULT 0 CHECK (monto_recaudado >= 0),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creado_por INT NOT NULL,
    FOREIGN KEY (creado_por) REFERENCES usuarios(usuario_id) ON DELETE RESTRICT,
    CHECK (fecha_fin >= fecha_inicio)
);

CREATE INDEX idx_campana_fechas ON campana_donacion(fecha_inicio, fecha_fin);
CREATE INDEX idx_campana_activo ON campana_donacion(activo);

-- ============================================
-- TABLA: Donaciones
-- ============================================
CREATE TABLE donaciones (
    donacion_id SERIAL PRIMARY KEY,
    campana_id INT NOT NULL,
    nombre_donante VARCHAR(100) NOT NULL,
    correo_donante VARCHAR(100),
    telefono_donante VARCHAR(20),
    monto DECIMAL(10,2) NOT NULL CHECK (monto > 0),
    fecha_donacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pago VARCHAR(50),
    numero_transaccion VARCHAR(100) UNIQUE,
    observaciones TEXT,
    anonimo BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (campana_id) REFERENCES campana_donacion(campana_id) ON DELETE RESTRICT
);

CREATE INDEX idx_donaciones_campana ON donaciones(campana_id);
CREATE INDEX idx_donaciones_fecha ON donaciones(fecha_donacion);

-- ============================================
-- TABLAS: Estado de Adopción y Solicitudes
-- ============================================
CREATE TABLE estado_adopcion (
    estado_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE solicitudes_adopcion (
    solicitud_id SERIAL PRIMARY KEY,
    animal_id INT NOT NULL,
    nombre_solicitante VARCHAR(100) NOT NULL,
    correo_solicitante VARCHAR(100) NOT NULL,
    telefono_solicitante VARCHAR(20) NOT NULL,
    direccion_solicitante VARCHAR(100) NOT NULL,
    experiencia_animales TEXT NOT NULL,
    motivo TEXT NOT NULL,
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    observacion_respuesta TEXT,
    respondido_por INT,
    estado_id INT NOT NULL,
    FOREIGN KEY (animal_id) REFERENCES animales(animal_id) ON DELETE RESTRICT,
    FOREIGN KEY (estado_id) REFERENCES estado_adopcion(estado_id) ON DELETE RESTRICT,
    FOREIGN KEY (respondido_por) REFERENCES usuarios(usuario_id) ON DELETE SET NULL
);

CREATE INDEX idx_solicitudes_animal ON solicitudes_adopcion(animal_id);
CREATE INDEX idx_solicitudes_estado ON solicitudes_adopcion(estado_id);
CREATE INDEX idx_solicitudes_fecha ON solicitudes_adopcion(fecha_solicitud);

-- ============================================
-- TABLA: Vacunas
-- ============================================
CREATE TABLE vacunas (
    vacuna_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    edad_minima_meses INT NOT NULL CHECK (edad_minima_meses >= 0),
    intervalo_meses INT NOT NULL CHECK (intervalo_meses > 0),
    activo BOOLEAN DEFAULT TRUE,
    especie_id INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (especie_id) REFERENCES especies(especie_id) ON DELETE RESTRICT,
    UNIQUE (nombre, especie_id)
);

CREATE INDEX idx_vacunas_especie ON vacunas(especie_id);

-- ============================================
-- TABLA: Historial de Vacunación
-- ============================================
CREATE TABLE historial_vacunacion (
    vacunacion_id SERIAL PRIMARY KEY,
    animal_id INT NOT NULL,
    vacuna_id INT NOT NULL,
    veterinario_id INT NOT NULL,
    fecha_vacunacion DATE NOT NULL,
    lote_vacuna VARCHAR(50) NOT NULL,
    proxima_vacuna DATE,
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (animal_id) REFERENCES animales(animal_id) ON DELETE RESTRICT,
    FOREIGN KEY (vacuna_id) REFERENCES vacunas(vacuna_id) ON DELETE RESTRICT,
    FOREIGN KEY (veterinario_id) REFERENCES veterinarios(veterinario_id) ON DELETE RESTRICT
);

CREATE INDEX idx_historial_vac_animal ON historial_vacunacion(animal_id);
CREATE INDEX idx_historial_vac_fecha ON historial_vacunacion(fecha_vacunacion);
CREATE INDEX idx_historial_vac_proxima ON historial_vacunacion(proxima_vacuna);

-- ============================================
-- COMENTARIOS EN TABLAS (Documentación)
-- ============================================
COMMENT ON TABLE roles_usuario IS 'Roles y permisos de los usuarios del sistema';
COMMENT ON TABLE usuarios IS 'Usuarios del sistema (empleados, veterinarios, administradores)';
COMMENT ON TABLE clientes IS 'Clientes/propietarios de las mascotas';
COMMENT ON TABLE especies IS 'Especies de animales (perro, gato, etc.)';
COMMENT ON TABLE razas IS 'Razas de animales por especie';
COMMENT ON TABLE animales IS 'Mascotas y animales del sistema';
COMMENT ON TABLE veterinarios IS 'Veterinarios registrados en el sistema';
COMMENT ON TABLE citas IS 'Citas médicas programadas';
COMMENT ON TABLE historial_medico IS 'Historial médico de las citas';
COMMENT ON TABLE vacunas IS 'Catálogo de vacunas disponibles';
COMMENT ON TABLE historial_vacunacion IS 'Registro de vacunaciones aplicadas';
COMMENT ON TABLE campana_donacion IS 'Campañas de donación activas';
COMMENT ON TABLE donaciones IS 'Donaciones recibidas';
COMMENT ON TABLE solicitudes_adopcion IS 'Solicitudes de adopción de animales';
