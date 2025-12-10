drop database vetasoft;
create database Vetasoft;
use vetasoft;

# Creación tablas fuertes

create table Roles_Usuario(
Rol_id int auto_increment not null primary key,
Nombre_rol varchar (100) not null unique,
Descripcion text,
Fecha_creacion datetime default now(),
Activo bit default 1
);

create table Estado_adopcion(
Estado_adopcion_id int auto_increment not null primary key,
Nombre_estado varchar (50) not null unique,
Descripcion text,
Activo bit default 1);

create table Estado_citas(
Estado_citas_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
Nombre_estado_cita varchar (50) not null unique,
Descripcion TEXT, 
Activo bit default 1
);

create table TipoConsulta(
Consulta_id int auto_increment not null primary key,
Nombre_tipo varchar (50) not null unique,
Descripcion text,
Costo decimal (10,2),
Activo bit default 1
);

create table Especies(
Especie_id int auto_increment not null primary key,
Nombre_Especie varchar (50) not null unique,
Descripcion text,
Activo bit default 1
);

                # Creacion tabla debiles:

# Creación tabla usuarios

create table Usuarios(
Usuario_id int auto_increment not null primary key,
Nombre varchar (100) not null,
Email varchar (150) not null unique,
Passwordhash varchar (255) not null,
Telefono varchar (20) not null,
Direccion varchar (255),
Fecha_registro datetime default now(),
Ultimo_acceso datetime,
Activo bit default 1,
Rol int not null,
foreign key (Rol) references Roles_usuario(Rol_id));

# Creación tabla de clientes

create table Clientes(
Cliente_id int auto_increment not null primary key,
Nombre varchar (100) not null,
Email varchar (150),
Telefono varchar (20), 
Dirección varchar (100),
Fecha_nacimiento date,
Documento_identidad varchar (50) not null unique,
Fecha_registro datetime default now(),
Activo bit default 1,
Empleado_id int,
foreign key (Empleado_id) references Usuarios (Usuario_id));

# Creación tabla razas

create table Razas (
Raza_id int auto_increment not null primary key,
Nombre_raza varchar (50),
Descripcion text,
Activo bit default 1,
Especie int not null,
foreign key (Especie) references Especies (Especie_id));

# Creación tabla Mascotas/Animales

create table Animales(
Animales_id int auto_increment not null primary key,
Nombre varchar (50) not null, 
Edad TINYINT UNSIGNED NOT NULL CHECK (edad BETWEEN 0 AND 150),
Fecha_nacimiento date,
Peso decimal (5,2) not null,
Sexo ENUM('Macho', 'Hembra') not null,
Color varchar (100),
Descripcion text not null,
Número_chip varchar (50),
Estado_adopcion ENUM("Paciente", "Adoptado", "En adopción"),
Fecha_ingreso datetime default now(),
Activo  bit default 1,
Cliente int not null,
Raza int not null,
foreign key (cliente) references Clientes(Cliente_id),
foreign key (Raza) references Razas(Raza_id));

# Creación tabla veterinarios

create table Veterinarios(
Veterinario_id int auto_increment not null primary key,
Numero_licencia varchar (50) unique not null,
Especialidad varchar (100),
Fecha_contratacion date,
Horario_inicio time,
Hortario_fin time,
Activo bit default 1,
Usuario int not null,
foreign key (Usuario) references Usuarios(Usuario_id));

# Creación citas

create table citas(
Cita_id int auto_increment not null primary key,
Fecha_cita datetime not null,
Duracion_minutos integer,
Motivo text,
Observaciones text,
Fecha_creación datetime default now(),
Veterinario int not null, 
Creado_por int not null,
Animales int not null,
Estado int not null,
foreign key (Veterinario) references Veterinarios(Veterinario_id),
foreign key (Creado_por) references Usuarios(Usuario_id),
foreign key (Animales) references Animales(Animales_id),
foreign key (Estado) references Estado_citas(Estado_citas_id));


# Historiales medicos

create table Historiales_medicos(
Historial_id int auto_increment not null primary key,
Sintomas text,
Diagnostico text not null, 
Tratamiento text not null,
Examenes_realizados text,
Medicamentos text,
Proxima_cita datetime,
Observaciones text,
Peso decimal (5,2),
Temperatura decimal (4,1), 
Frecuencia_cardiaca int,
Frecuencia_respiratoria int,
Fecha_Creación datetime default now(),
Cita int not null,
veterinario int not null,
Tipo_consulta int not null,
Animal int not null,
foreign key (cita) references citas(cita_id),
foreign key (veterinario) references veterinarios(veterinario_id),
foreign key (Tipo_consulta)references TipoConsulta(consulta_id),
foreign key (Animal) references Animales(Animales_id));

# Campañas de donación

create table campanas_donacion(
campana_donacion int auto_increment not null primary key,
Nombre_campana varchar (50) not null,
Descripcion text,
Meta_monto decimal (12,2),
Monto_recaudado decimal (12,2) default 0,
Fecha_inicio date not null,
Fecha_fin date not null,
Fecha_creacion datetime default now(),
Activo bit default 1,
Creado_por int not null,
foreign key (Creado_por) references Usuarios(Usuario_id));

# Tabla donaciones

create table Donaciones(
Donacion_id int auto_increment not null primary key,
Nombre_donante varchar (50) not null,
Email_donante varchar (100),
Telefono_donante varchar (20),
Monto decimal (10,2) not null,
Fecha_donacion datetime default now(),
Metodo_pago Varchar (50),
Número_Transacción varchar (100),
Observaciones text,
Anonimo bit default 0,
campanaDonacion int not null,
foreign key (campanaDonacion) references campanas_donacion(campana_donacion));

# solicitudes de adopción

create table solicitudes_adopcion(
Solicitud_id int auto_increment not null primary key,
Nombre_solicitante varchar (50) not null,
Email_solicitante varchar (100) not null,
Telefono_solicitante varchar (20) not null,
Direccion_solicitante varchar(100) not null,
Experiencia_animales text not null,
Motivo_adopcion text not null,
Fecha_solicitud datetime default now(),
Fecha_respuesta datetime,
Observacion_respuesta text not null,
Animales int not null,
respondido_por int not null,
Estado int not null, 
foreign key (Animales) references Animales (Animales_id),
foreign key (respondido_por) references Usuarios(Usuario_id),
foreign key (Estado) references Estado_adopcion(Estado_adopcion_id));

# Creación tabla vacunas

create table Vacunas(
Vacuna_id int auto_increment not null primary key,
nombre_vacuna varchar (50) not null,
Descripcion text,
Edad_minima_meses int not null,
Intervalo_meses int not null,
Activo bit default 1,
Especie int not null,
foreign key (Especie) references Especies (Especie_id));

# Creación tabla historial vacunacion 

Create table Historial_Vacunacion(
Vacunacion_id int auto_increment not null primary key,
Fecha_Vacunacion date not null,
Lote_vacuna date not null,
Proxima_vacuna date,
Observaciones text,
Fecha_registro datetime default now(),
Vacuna int not null, 
Veterinario int not null,
Animales int not null,
foreign key (Animales)references Animales(Animales_id),
foreign key (Vacuna) references Vacunas(Vacuna_id),
foreign key (Veterinario) references Veterinarios(Veterinario_id));

# Tabla Usuarios
CREATE INDEX idx_usuarios_Email ON Usuarios(Email);
CREATE INDEX idx_usuarios_rol ON Usuarios(Rol);
CREATE INDEX idx_usuarios_activo ON Usuarios(Activo);
CREATE INDEX idx_usuarios_fecha_registro ON Usuarios(Fecha_registro);
# Tabla Clientes
CREATE INDEX idx_clientes_empleado ON Clientes(Empleado_id);
CREATE INDEX idx_clientes_documento ON Clientes(Documento_identidad);
CREATE INDEX idx_clientes_activo ON Clientes(Activo);
CREATE INDEX idx_clientes_nombre ON Clientes(Nombre);
# Tabla Razas
CREATE INDEX idx_razas_especie ON Razas(Especie);
CREATE INDEX idx_razas_nombre ON Razas(Nombre_raza);
# Tabla Animales (Mascotas)
CREATE INDEX idx_Animales_cliente ON Animales(Cliente);
CREATE INDEX idx_Animales_raza ON Animales(Raza);
CREATE INDEX idx_Animales_estado ON Animales(Estado_adopcion);
CREATE INDEX idx_Animales_nombre ON Animales(Nombre);
CREATE INDEX idx_Animales_chip ON Animales(Número_chip);
# Tabla Veterinarios
CREATE INDEX idx_veterinarios_usuario ON Veterinarios(Usuario);
CREATE INDEX idx_veterinarios_licencia ON Veterinarios(Numero_licencia);
CREATE INDEX idx_veterinarios_activo ON Veterinarios(Activo);
# Tabla Citas
CREATE INDEX idx_citas_Animales ON citas(Animales);
CREATE INDEX idx_citas_veterinario ON citas(Veterinario);
CREATE INDEX idx_citas_fecha ON citas(Fecha_cita);
CREATE INDEX idx_citas_estado ON citas(Estado);

CREATE INDEX idx_citas_creado_por ON citas(Creado_por);
# Tabla Historial Médico
CREATE INDEX idx_historial_cita ON Historiales_medicos(Cita);
CREATE INDEX idx_historial_fecha ON Historiales_medicos(Fecha_Creación);
# Secciones de Donaciones
CREATE INDEX idx_campana_donacion_activo ON campanas_donacion(Activo);
CREATE INDEX idx_fin_donacion_fechas ON campanas_donacion(Fecha_inicio, Fecha_fin);
CREATE INDEX idx_fin_donacion_creado_por ON campanas_donacion(Creado_por);

CREATE INDEX idx_donaciones_fin ON Donaciones(campanaDonacion);
CREATE INDEX idx_donaciones_fecha ON Donaciones(Fecha_donacion);
CREATE INDEX idx_donaciones_donante ON Donaciones(Nombre_donante);
# Adopciones
CREATE INDEX idx_solicitudes_Animales ON solicitudes_adopcion(Animales);
CREATE INDEX idx_solicitudes_estado ON solicitudes_adopcion(Estado);
CREATE INDEX idx_solicitudes_fecha ON solicitudes_adopcion(Fecha_solicitud);
CREATE INDEX idx_solicitudes_respondido_por ON solicitudes_adopcion(respondido_por);
# Vacunas
CREATE INDEX idx_vacunas_especie ON Vacunas(Especie);
CREATE INDEX idx_vacunas_activo ON Vacunas(Activo);

CREATE INDEX idx_historial_vac_Animales ON Historial_Vacunacion(Animales);
CREATE INDEX idx_historial_vac_vacuna ON Historial_Vacunacion(Vacuna);
CREATE INDEX idx_historial_vac_veterinario ON Historial_Vacunacion(Veterinario);
CREATE INDEX idx_historial_vac_fecha ON Historial_Vacunacion(Fecha_Vacunacion);
CREATE INDEX idx_historial_vac_prox ON Historial_Vacunacion(Proxima_vacuna);