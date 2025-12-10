-- =====================================================
-- Descripción: 20 INSERT por cada tabla + 5 UPDATE + 5 DELETE + 5 SELECT
-- Base de datos: Vetasoft (Sistema veterinario)
-- =====================================================

USE Vetasoft;

-- =====================================================
-- SECCIÓN 1: INSERTAR 20 REGISTROS POR CADA TABLA
-- =====================================================

-- TABLA 1: Roles_Usuario (20 registros)
INSERT INTO Roles_Usuario (Nombre_rol, Descripcion) VALUES
('Administrador', 'Usuario con acceso completo al sistema'),
('Veterinario ', 'Veterinario con más de 10 años de experiencia'),
('Administrador fundacion', 'Encargado de los procesos administrativos de la fundacion'),
('Director medico', 'Encargado de cordinar y supervisar las actividades clinicas y administrativas'),
('Cliente', 'Usuario de la aplicacion'),
('Medico tratante', 'Especialista en cuidados de enfermería');

-- TABLA 2: Usuarios (20 registros)
INSERT INTO Usuarios (Nombre, Correo, Contraseña, Telefono, Direccion, Rol) VALUES
('María González', 'maria.gonzalez@vetasoft.com', 'admin123', '3001234567', 'Calle 123 #45-67, Bogotá', 1),
('Carlos Rodríguez', 'carlos.rodriguez@vetasoft.com', 'vet123', '3109876543', 'Carrera 78 #12-34, Bogotá', 2),
('Ana Martínez', 'ana.martinez@vetasoft.com', 'vet456', '3151122334', 'Avenida 56 #89-12, Bogotá', 3),
('Luis Hernández', 'luis.hernandez@vetasoft.com', 'recep123', '3205566778', 'Calle 90 #23-45, Bogotá', 2),
('Sofia López', 'sofia.lopez@vetasoft.com', 'asist123', '3009988776', 'Carrera 34 #67-89, Usme', 4),
('Roberto Silva', 'roberto.silva@vetasoft.com', 'cont123', '3154433221', 'Avenida 12 #45-67, Bogotá', 6),
('Carmen Ruiz', 'carmen.ruiz@vetasoft.com', 'ger123', '3106677889', 'Calle 78 #90-12, Bogotá', 2),
('Diego Morales', 'diego.morales@vetasoft.com', 'enf123', '3201122334', 'Carrera 45 #67-89, Soacha', 2),
('Fernando Castro', 'fernando.castro@vetasoft.com', 'cir123', '3157788990', 'Avenida 23 #45-67, Bosa', 4),
('Patricia Vega', 'patricia.vega@vetasoft.com', 'anes123', '3002233445', 'Calle 67 #89-12, Despensa', 6),
('Miguel Torres', 'miguel.torres@vetasoft.com', 'radio123', '3118899776', 'Carrera 89 #34-56, Teusaquillo', 5),
('Claudia Ramírez', 'claudia.ramirez@vetasoft.com', 'lab123', '3229988665', 'Avenida 45 #78-90, Kennedy', 5),
('Andrés Jiménez', 'andres.jimenez@vetasoft.com', 'farm123', '3335544332', 'Calle 56 #23-45, Ciudad bolivar', 5),
('Isabella García', 'isabella.garcia@vetasoft.com', 'nutr123', '3441122998', 'Carrera 12 #67-89, El dorado', 5),
('Javier Mendoza', 'javier.mendoza@vetasoft.com', 'eto123', '3556677443', 'Avenida 78 #34-56, Bogota', 5),
('Natalia Herrera', 'natalia.herrera@vetasoft.com', 'pel123', '3667788554', 'Calle 90 #12-34, Ciudad verde', 5),
('Oscar Delgado', 'oscar.delgado@vetasoft.com', 'cuid123', '3778899665', 'Carrera 23 #56-78, Villa del rio', 5),
('Liliana Ortiz', 'liliana.ortiz@vetasoft.com', 'limp123', '3889900776', 'Avenida 34 #89-12, Alqueria', 5),
('Héctor Vargas', 'hector.vargas@vetasoft.com', 'seg123', '3990011887', 'Calle 45 #67-90, El campin', 5),
('Mónica Cruz', 'monica.cruz@vetasoft.com', 'vol123', '3001122998', 'Carrera 56 #78-12, Chapinero', 5);

-- TABLA 3: Clientes (20 registros)
-- 
-- INSERT INTO Clientes (Nombre, Telefono, Correo, Direccion)
-- SELECT Nombre, Telefono, Correo, Direccion
-- FROM Usuarios
-- WHERE Rol = 5;
INSERT INTO clientes (nombre, correo, telefono,Dirección, FechaNacimiento, documento_id)
VALUES 
('Miguel Torres', 'miguel.torres@vetasoft.com', '3001234567', 'Avenida 12 #45-67, Pereira', '1985-03-15', '12345678'),
('Carlos Rodríguez', 'carlos.rodriguez@vetasoft.com','3109876543', 'Calle 78 #90-12, Manizales', '1990-07-22', '87654321'),
('Andrés Moreno', 'andres.moreno@email.com', '3201122334', 'Carrera 45 #67-89, Ibagué', '1988-11-10', '11223344'),
('Camila Torres', 'camila.torres@email.com', '3157788990', 'Avenida 23 #45-67, Neiva', '1992-05-18', '44332211'),
('Roberto Sánchez', 'roberto.sanchez@email.com', '3002233445', 'Calle 67 #89-12, Villavicencio', '1987-09-03', '55667788'),
('Diana Ramírez', 'diana.ramirez@email.com', '3118899776', 'Carrera 89 #34-56, Armenia', '1991-12-28', '99887766'),
('Felipe Castillo', 'felipe.castillo@email.com', '3229988665', 'Avenida 45 #78-90, Popayán', '1989-04-14', '33445566'),
('Valentina Ruiz', 'valentina.ruiz@email.com', '3335544332', 'Calle 56 #23-45, Pasto', '1993-08-07', '77889900'),
('Santiago Pérez', 'santiago.perez@email.com', '3441122998', 'Carrera 12 #67-89, Tunja', '1986-01-25', '22334455'),
('Alejandra López', 'alejandra.lopez@email.com', '3556677443', 'Avenida 78 #34-56, Valledupar', '1994-06-12', '66778899'),
('Mauricio Vargas', 'mauricio.vargas@email.com', '3667788554', 'Calle 90 #12-34, Montería', '1983-10-30', '11335577'),
('Paola Herrera', 'paola.herrera@email.com', '3778899665', 'Carrera 23 #56-78, Sincelejo', '1995-02-17', '99113355'),
('Germán Castro', 'german.castro@email.com', '3889900776', 'Avenida 34 #89-12, Riohacha', '1984-07-09', '44556677'),
('Lorena Mendoza', 'lorena.mendoza@email.com', '3990011887', 'Calle 45 #67-90, Florencia', '1996-11-23', '88990011'),
('Nicolás Silva', 'nicolas.silva@email.com', '3001122998', 'Carrera 56 #78-12, Mocoa', '1982-05-05', '22446688'),
('Beatriz Ortega', 'beatriz.ortega@email.com', '3112233009', 'Avenida 67 #90-23, Leticia', '1997-09-15', '55779911'),
('Esteban Guerrero', 'esteban.guerrero@email.com', '3223344110', 'Calle 78 #12-45, Mitú', '1981-03-28', '33557799'),
('Adriana Rojas', 'adriana.rojas@email.com', '3334455221', 'Carrera 89 #34-67, Inírida', '1998-12-06', '77991133'),
('Julián Morales', 'julian.morales@email.com', '3445566332', 'Avenida 90 #56-89, Puerto Carreño', '1980-08-19', '11337755'),
('Carolina Delgado', 'carolina.delgado@email.com', '3556677443', 'Calle 12 #78-01, San José del Guaviare','1999-04-02', '99115533');

-- TABLA 4: Especies (20 registros)
INSERT INTO Especies (Nombre_Especie, Descripcion) VALUES
('Canino', 'Perros domésticos y salvajes de todas las razas'),
('Felino', 'Gatos domésticos y salvajes de todas las razas'),
('Ave', 'Aves domésticas, exóticas y de corral'),
('Roedor', 'Hamsters, conejos, cobayas y similares'),
('Reptil', 'Serpientes, iguanas, tortugas y lagartos'),
('Pez', 'Peces de acuario y ornamentales'),
('Equino', 'Caballos, yeguas, potros y similares'),
('Bovino', 'Vacas, toros, terneros y similares'),
('Porcino', 'Cerdos domésticos y de granja'),
('Caprino', 'Cabras y chivos domésticos'),
('Ovino', 'Ovejas y carneros domésticos'),
('Anfibio', 'Ranas, sapos y salamandras'),
('Primate', 'Monos y primates exóticos'),
('Marsupial', 'Zarigüeyas y similares'),
('Mustelido', 'Hurones y comadrejas'),
('Lagomorfo', 'Conejos y liebres'),
('Quiróptero', 'Murciélagos'),
('Arácnido', 'Tarántulas y arañas exóticas'),
('Insecto', 'Insectos como mascotas exóticas'),
('Molusco', 'Caracoles y babosas como mascotas');

-- TABLA 5: Razas (20 registros)
INSERT INTO Razas (Especie, Nombre_raza, Descripcion) VALUES
(1, 'Golden Retriever', 'Perro grande, amigable, activo y excelente para familias'),
(1, 'Bulldog Francés', 'Perro pequeño, tranquilo, cariñoso y de compañía'),
(1, 'Pastor Alemán', 'Perro grande, inteligente, leal y de trabajo'),
(1, 'Chihuahua', 'Perro muy pequeño, valiente y territorial'),
(1, 'Labrador', 'Perro grande, amigable, inteligente y trabajador'),
(2, 'Persa', 'Gato de pelo largo, temperamento tranquilo y elegante'),
(2, 'Siamés', 'Gato elegante, vocal, inteligente y social'),
(2, 'Maine Coon', 'Gato grande, peludo, amigable y robusto'),
(2, 'British Shorthair', 'Gato mediano, tranquilo y de pelo corto'),
(2, 'Bengalí', 'Gato exótico con manchas tipo leopardo'),
(3, 'Canario', 'Ave pequeña cantora, amarilla y doméstica'),
(3, 'Periquito', 'Ave pequeña, colorida y muy social'),
(3, 'Cacatúa', 'Ave grande, blanca, inteligente y longeva'),
(3, 'Agapornis', 'Ave pequeña, colorida y muy cariñosa'),
(4, 'Conejo Holandés', 'Conejo doméstico de tamaño mediano y orejas erectas'),
(4, 'Hamster Dorado', 'Roedor pequeño, dorado y muy activo'),
(4, 'Cobaya', 'Roedor mediano, social y dócil'),
(5, 'Iguana Verde', 'Reptil grande, verde y herbívoro'),
(6, 'Goldfish', 'Pez dorado ornamental muy popular'),
(7, 'Caballo Criollo', 'Caballo resistente y adaptado al clima tropical');
describe pacientes;
-- TABLA 6: Pacientes (20 registros)
INSERT INTO Pacientes (Cliente, Nombre, Raza, Edad, FechaNacimiento, Peso, Sexo, Descripcion,  Estado) VALUES
(1, 'Max', 1, 3, '2021-05-15', 25.50, 'Macho', 'Golden Retriever muy activo y juguetón','Paciente'),
(1, 'Luna', 6, 2, '2022-03-10', 4.20, 'Hembra', 'Gata persa muy tranquila y cariñosa','Inactivo'),
(2, 'Rocky', 2, 1, '2023-01-20', 8.75, 'Macho', 'Bulldog francés muy sociable','Paciente'),
(3, 'Bella', 3, 5, '2019-08-05', 28.30, 'Hembra', 'Pastor alemán muy protectora', 'Activo'),
(4, 'Pío', 11, 1, '2023-06-12', 0.025, 'Macho', 'Canario amarillo muy cantarín', 'Paciente'),
(5, 'Toby', 5, 4, '2020-09-22', 30.00, 'Macho', 'Labrador chocolate muy obediente','Activo'),
(6, 'Mimi', 7, 3, '2021-11-08', 5.80, 'Hembra', 'Gata siamés muy vocal y elegante','Paciente'),
(7, 'Bruno', 4, 2, '2022-07-14', 2.10, 'Macho', 'Chihuahua valiente y pequeño',  'En adopción'),
(8, 'Nala', 8, 6, '2018-12-03', 7.50, 'Hembra', 'Maine Coon gigante y peluda', 'En adopción'),
(9, 'Rex', 3, 7, '2017-04-18', 32.20, 'Macho', 'Pastor alemán veterano y sabio','Inactivo'),
(10, 'Kiwi', 12, 2, '2022-10-25', 0.045, 'Macho', 'Periquito verde muy juguetón', 'Activo'),
(11, 'Coco', 13, 8, '2016-06-07', 1.20, 'Hembra', 'Cacatúa blanca muy inteligente',  'Inactivo'),
(12, 'Bunny', 15, 3, '2021-02-28', 1.80, 'Hembra', 'Coneja holandesa muy dócil', 'Paciente'),
(13, 'Speedy', 16, 1, '2023-09-15', 0.120, 'Macho', 'Hamster dorado muy activo',  'Paciente'),
(14, 'Pepa', 17, 2, '2022-12-01', 0.850, 'Hembra', 'Cobaya tricolor muy sociable',  'Paciente'),
(15, 'Verde', 18, 4, '2020-08-10', 2.30, 'Macho', 'Iguana verde grande y tranquila', 'Paciente'),
(16, 'Goldie', 19, 1, '2023-05-20', 0.015, 'Hembra', 'Goldfish naranja muy activa',  'Adoptado'),
(17, 'Thunder', 20, 12, '2012-03-12', 450.00, 'Macho', 'Caballo criollo fuerte y resistente',  'Adoptado'),
(18, 'Amor', 14, 3, '2021-07-30', 0.040, 'Hembra', 'Agapornis colorida muy cariñosa', 'Adoptado'),
(19, 'Shadow', 9, 5, '2019-11-11', 6.10, 'Macho', 'British Shorthair gris muy tranquilo','Adoptado');

-- TABLA 7: Veterinarios (20 registros)
INSERT INTO Veterinarios (Usuario, Numero_licencia, Especialidad, Fecha_contratación, Horario_inicio, Hortario_fin) VALUES
(2, 'VET001', 'Medicina General', '2020-01-15', '08:00:00', '16:00:00'),
(3, 'VET002', 'Medicina Felina', '2021-03-10', '14:00:00', '22:00:00'),
(9, 'VET003', 'Cirugía General', '2019-06-20', '07:00:00', '15:00:00'),
(10, 'VET004', 'Anestesiología', '2020-09-05', '09:00:00', '17:00:00'),
(11, 'VET005', 'Radiología', '2021-11-12', '10:00:00', '18:00:00'),
(2, 'VET006', 'Medicina Canina', '2018-02-28', '08:00:00', '16:00:00'),
(3, 'VET007', 'Dermatología', '2022-01-08', '12:00:00', '20:00:00'),
(9, 'VET008', 'Cardiología', '2019-10-15', '06:00:00', '14:00:00'),
(10, 'VET009', 'Neurología', '2021-05-22', '11:00:00', '19:00:00'),
(11, 'VET010', 'Oftalmología', '2020-12-03', '13:00:00', '21:00:00'),
(2, 'VET011', 'Oncología', '2018-08-17', '08:00:00', '16:00:00'),
(3, 'VET012', 'Endocrinología', '2022-04-11', '15:00:00', '23:00:00'),
(9, 'VET013', 'Ortopedia', '2019-12-25', '07:00:00', '15:00:00'),
(10, 'VET014', 'Medicina Exótica', '2021-07-08', '09:00:00', '17:00:00'),
(11, 'VET015', 'Urgencias', '2020-03-19', '18:00:00', '06:00:00'),
(2, 'VET016', 'Medicina Preventiva', '2018-11-30', '08:00:00', '16:00:00'),
(3, 'VET017', 'Nutrición Animal', '2022-06-14', '10:00:00', '18:00:00'),
(9, 'VET018', 'Cirugía Plástica', '2019-09-02', '12:00:00', '20:00:00'),
(10, 'VET019', 'Medicina Geriátrica', '2021-02-16', '08:00:00', '16:00:00'),
(11, 'VET020', 'Medicina Deportiva', '2020-07-23', '14:00:00', '22:00:00');

-- TABLA 8: Estado_citas (20 registros)
INSERT INTO Estado_citas (Estado_Nombre, Descripcion) VALUES
('Programada', 'Cita agendada pendiente de atención'),
('Confirmada', 'Cita confirmada por el cliente'),
('En Curso', 'Cita siendo atendida actualmente'),
('Completada', 'Cita finalizada exitosamente'),
('Cancelada Cliente', 'Cita cancelada por el cliente'),
('Cancelada Veterinaria', 'Cita cancelada por la veterinaria'),
('No Show', 'Cliente no se presentó a la cita'),
('Reprogramada', 'Cita movida a otra fecha y hora'),
('En Espera', 'Cliente esperando ser atendido'),
('Pausada', 'Cita temporalmente suspendida'),
('Urgente', 'Cita de emergencia prioritaria'),
('Consulta Virtual', 'Consulta realizada por videollamada'),
('Seguimiento', 'Cita de control post-tratamiento'),
('Segunda Opinión', 'Consulta para confirmar diagnóstico'),
('Pre-Quirúrgica', 'Evaluación antes de cirugía'),
('Post-Quirúrgica', 'Control después de cirugía'),
('Vacunación', 'Cita específica para vacunas'),
('Desparasitación', 'Cita para tratamiento antiparasitario'),
('Eutanasia', 'Procedimiento de sacrificio humanitario'),
('Necropsia', 'Examen post-mortem');

-- TABLA 9: Consultas (20 registros)
INSERT INTO Consultas (Nombre, Descripcion, Valor) VALUES
('Consulta General', 'Revisión médica básica del paciente', 50000),
('Vacunación', 'Aplicación de vacunas preventivas', 35000),
('Cirugía Menor', 'Procedimientos quirúrgicos ambulatorios', 150000),
('Urgencias', 'Atención de emergencias médicas', 80000),
('Cirugía Mayor', 'Procedimientos quirúrgicos complejos', 300000),
('Consulta Especializada', 'Consulta con veterinario especialista', 75000),
('Rayos X', 'Diagnóstico por imágenes radiográficas', 120000),
('Ecografía', 'Diagnóstico por ultrasonido', 100000),
('Análisis de Sangre', 'Exámenes de laboratorio sanguíneos', 60000),
('Desparasitación', 'Tratamiento contra parásitos internos y externos', 25000),
('Esterilización', 'Cirugía de castración o ovariohisterectomía', 200000),
('Limpieza Dental', 'Profilaxis dental bajo anestesia', 180000),
('Consulta Domiciliaria', 'Atención veterinaria en el hogar', 90000),
('Hospitalización Día', 'Internación por 24 horas', 150000),
('Hospitalización Prolongada', 'Internación por más de 24 horas por día', 200000),
('Eutanasia', 'Sacrificio humanitario', 120000),
('Cremación', 'Servicio de cremación individual', 250000),
('Microchip', 'Implantación de chip de identificación', 45000),
('Certificado Salud', 'Emisión de certificado veterinario', 30000),
('Peluquería', 'Servicio de estética y aseo', 40000);

-- TABLA 10: citas (20 registros)
INSERT INTO citas (Paciente, Veterinario, Fecha_cita, Motivo, Estado, Observaciones, Creado_por, Tipo_consulta) VALUES
(1, 1, '2024-01-15 10:00:00', 'Revisión general anual', 4, 'Paciente en excelente estado de salud', 4, 1),
(2, 2, '2024-01-16 14:30:00', 'Vacunación triple felina', 4, 'Vacuna aplicada correctamente sin reacciones', 4, 2),
(3, 3, '2024-01-17 09:15:00', 'Esterilización programada', 4, 'Cirugía exitosa, recuperación normal', 4, 11),
(4, 1, '2024-01-18 11:00:00', 'Consulta por cojera en pata trasera', 3, 'Evaluando posible lesión ligamentaria', 4, 1),
(5, 4, '2024-01-19 15:45:00', 'Revisión de ave cantora', 4, 'Ave en buen estado, recomendaciones nutricionales', 5, 1),
(6, 1, '2024-01-20 08:30:00', 'Vacunación antirrábica', 1, 'Cita programada para la próxima semana', 5, 2),
(7, 2, '2024-01-21 16:20:00', 'Consulta dermatológica', 2, 'Cita confirmada por el cliente', 5, 6),
(8, 5, '2024-01-22 12:10:00', 'Rayos X por posible fractura', 4, 'Fractura descartada, solo contusión', 5, 7),
(9, 3, '2024-01-23 13:40:00', 'Cirugía de tumor benigno', 4, 'Tumor removido exitosamente', 5, 5),
(10, 1, '2024-01-24 09:50:00', 'Control post-quirúrgico', 4, 'Recuperación excelente, sin complicaciones', 5, 1),
(11, 6, '2024-01-25 14:15:00', 'Consulta de medicina exótica', 1, 'Primera consulta para ave exótica', 7, 6),
(12, 2, '2024-01-26 11:25:00', 'Limpieza dental programada', 1, 'Procedimiento programado bajo anestesia', 7, 12),
(13, 7, '2024-01-27 10:35:00', 'Consulta por problemas digestivos', 4, 'Tratamiento exitoso, mejoría notable', 7, 1),
(14, 1, '2024-01-28 15:00:00', 'Desparasitación rutinaria', 4, 'Tratamiento completo aplicado', 7, 10),
(15, 8, '2024-01-29 08:45:00', 'Ecografía abdominal', 4, 'Órganos internos normales', 7, 8),
(16, 2, '2024-01-30 16:30:00', 'Consulta por cambios de comportamiento', 3, 'Evaluación etológica en proceso', 7, 1),
(17, 9, '2024-02-01 12:00:00', 'Consulta domiciliaria', 4, 'Atención en casa exitosa', 8, 13),
(18, 1, '2024-02-02 09:20:00', 'Implantación de microchip', 4, 'Chip implantado correctamente', 8, 18),
(19, 10, '2024-02-03 14:10:00', 'Certificado de salud para viaje', 4, 'Certificado emitido, animal apto', 8, 19),
(20, 2, '2024-02-04 11:40:00', 'Servicio de peluquería', 4, 'Aseo completo realizado', 8, 20);

-- TABLA 11: Historial (20 registros)
INSERT INTO Historial (Cita, Sintomas, Diagnostico, Tratamiento, Examenes, Medicamentos, Peso, Temperatura, Frecuencia_cardiaca) VALUES
(1, 'Sin síntomas aparentes', 'Estado de salud excelente', 'Continuar con alimentación balanceada', 'Examen físico completo', 'Ninguno', 25.50, 38.5, 80),
(2, 'Sin síntomas', 'Paciente sano para vacunación', 'Vacuna triple felina aplicada', 'Revisión pre-vacunación', 'Vacuna triple felina', 4.20, 38.2, 120),
(3, 'Ninguno para cirugía electiva', 'Paciente apto para esterilización', 'Esterilización exitosa', 'Exámenes pre-quirúrgicos', 'Anestesia y antibióticos', 8.75, 38.0, 90),
(4, 'Cojera intermitente', 'Distensión ligamentaria leve', 'Reposo y antiinflamatorios', 'Palpación y movilidad', 'Meloxicam 5mg', 28.30, 38.7, 85),
(5, 'Plumaje opaco', 'Deficiencia nutricional leve', 'Cambio de dieta y suplementos', 'Examen físico completo', 'Complejo vitamínico', 0.025, 40.5, 180),
(9, 'Masa palpable en abdomen', 'Tumor benigno lipoma', 'Resección quirúrgica completa', 'Biopsia y histopatología', 'Antibióticos post-quirúrgicos', 7.50, 38.3, 95),
(10, 'Sin síntomas post-cirugía', 'Recuperación excelente', 'Continuar cuidados post-operatorios', 'Revisión de suturas', 'Continuar antibióticos', 7.45, 38.1, 92),
(13, 'Vómito y diarrea', 'Gastroenteritis aguda', 'Dieta blanda y probióticos', 'Examen clínico y palpación', 'Probióticos y dieta', 1.75, 38.9, 110),
(14, 'Sin síntomas', 'Presencia de parásitos intestinales', 'Desparasitación completa', 'Examen coprológico', 'Ivermectina', 0.115, 38.4, 200),
(15, 'Distensión abdominal leve', 'Órganos abdominales normales', 'Observación y dieta controlada', 'Ecografía abdominal', 'Ninguno', 0.840, 38.6, 130),
(17, 'Dificultad para transportar', 'Animal sano, estrés por transporte', 'Consulta domiciliaria exitosa', 'Examen físico en casa', 'Sedante leve', 450.00, 37.8, 45),
(18, 'Sin síntomas', 'Animal sano para identificación', 'Microchip implantado correctamente', 'Examen pre-implantación', 'Anestesia local', 0.040, 40.2, 175),
(19, 'Sin síntomas', 'Animal apto para viajar', 'Certificación de salud emitida', 'Examen completo para viaje', 'Ninguno', 6.10, 38.0, 100),
(20, 'Pelaje largo y enredado', 'Necesidad de aseo profesional', 'Peluquería completa realizada', 'Revisión de piel y pelaje', 'Champú medicado', 6.05, 38.1, 98),
(8, 'Claudicación severa', 'Contusión muscular', 'Reposo y fisioterapia', 'Radiografías normales', 'Antiinflamatorios', 2.08, 38.8, 140),
(12, 'Halitosis y sarro dental', 'Enfermedad periodontal grado II', 'Limpieza dental bajo anestesia', 'Examen oral completo', 'Antibióticos pre y post', 1.18, 38.5, 160),
(16, 'Agresividad reciente', 'Posible dolor dental', 'Evaluación comportamental', 'Examen neurológico básico', 'Ninguno por ahora', 2.25, 38.4, 125),
(6, 'Sin síntomas', 'Animal sano para vacunación', 'Pendiente aplicación vacuna', 'Examen pre-vacunación', 'Pendiente', 30.20, 38.3, 78),
(7, 'Picazón y enrojecimiento', 'Dermatitis alérgica leve', 'Tratamiento tópico y dieta', 'Raspado cutáneo', 'Corticoides tópicos', 5.85, 38.6, 115),
(11, 'Letargo y pérdida apetito', 'Estrés por cambio ambiente', 'Adaptación gradual', 'Examen físico normal', 'Estimulante del apetito', 0.042, 40.8, 185);

-- TABLA 12: Fin_donacion (20 registros)
INSERT INTO Fin_donacion (Nombre, Descripcion, Meta_monto, Fecha_inicio, Fecha_fin, Creado_por) VALUES
('Cirugías de Emergencia', 'Fondos para cirugías de animales sin hogar', 5000000, '2024-01-01', '2024-06-30', 1),
('Vacunación Masiva', 'Campaña de vacunación gratuita en barrios', 2000000, '2024-02-01', '2024-04-30', 1),
('Esterilización Gratuita', 'Programa de control de natalidad', 3000000, '2024-03-01', '2024-08-31', 1),
('Alimentación Callejeros', 'Comida para animales de la calle', 1500000, '2024-01-15', '2024-12-31', 1),
('Medicamentos Huérfanos', 'Tratamientos para animales abandonados', 2500000, '2024-02-15', '2024-07-15', 1),
('Refugio Temporal', 'Construcción de albergue para animales', 8000000, '2024-04-01', '2024-12-31', 1),
('Educación Animal', 'Campañas educativas sobre cuidado animal', 1000000, '2024-05-01', '2024-10-31', 1),
('Rescate Urgente', 'Fondo para rescates de emergencia', 3500000, '2024-01-01', '2024-12-31', 1),
('Adopción Responsable', 'Promoción de adopciones responsables', 800000, '2024-06-01', '2024-11-30', 1),
('Medicina Preventiva', 'Campañas de prevención y chequeos', 1800000, '2024-03-15', '2024-09-15', 1),
('Animales Exóticos', 'Atención especializada para fauna exótica', 4000000, '2024-07-01', '2024-12-31', 1),
('Rehabilitación', 'Centro de rehabilitación para animales heridos', 6000000, '2024-02-01', '2024-12-31', 1),
('Transporte Animal', 'Vehículo para rescates y traslados', 2200000, '2024-08-01', '2024-12-31', 1),
('Equipos Médicos', 'Adquisición de equipos veterinarios', 5500000, '2024-04-15', '2024-12-31', 1),
('Capacitación Personal', 'Entrenamiento del equipo veterinario', 1200000, '2024-09-01', '2024-12-31', 1),
('Laboratorio Análisis', 'Equipamiento de laboratorio clínico', 3800000, '2024-05-15', '2024-12-31', 1),
('Cirugía Especializada', 'Equipos para cirugías complejas', 4500000, '2024-06-15', '2024-12-31', 1),
('Farmacia Veterinaria', 'Stock de medicamentos esenciales', 2800000, '2024-10-01', '2024-12-31', 1),
('Cuidados Intensivos', 'Unidad de cuidados intensivos', 7000000, '2024-03-01', '2024-12-31', 1),
('Bienestar Animal', 'Programa integral de bienestar', 3200000, '2024-11-01', '2024-12-31', 1);

-- TABLA 13: Donaciones (20 registros)
INSERT INTO Donaciones (Fin, Nombre_donante, Correo_donante, Telefono_donante, Monto, Metodo_pago, Número_Transacción) VALUES
(1, 'Juan Pérez', 'juan.perez@email.com', '3001111111', 100000, 'Transferencia', 'TXN001'),
(1, 'María Rodríguez', 'maria.rodriguez@email.com', '3002222222', 250000, 'Tarjeta Crédito', 'TXN002'),
(2, 'Carlos González', 'carlos.gonzalez@email.com', '3003333333', 50000, 'Efectivo', 'TXN003'),
(3, 'Ana López', 'ana.lopez@email.com', '3004444444', 150000, 'Transferencia', 'TXN004'),
(1, 'Pedro Martínez', 'pedro.martinez@email.com', '3005555555', 75000, 'Tarjeta Débito', 'TXN005'),
(4, 'Laura Herrera', 'laura.herrera@email.com', '3006666666', 30000, 'Efectivo', 'TXN006'),
(2, 'Roberto Silva', 'roberto.silva@email.com', '3007777777', 80000, 'Transferencia', 'TXN007'),
(5, 'Carmen Ruiz', 'carmen.ruiz@email.com', '3008888888', 200000, 'Tarjeta Crédito', 'TXN008'),
(1, 'Diego Morales', 'diego.morales@email.com', '3009999999', 120000, 'PSE', 'TXN009'),
(6, 'Patricia Vega', 'patricia.vega@email.com', '3000000000', 500000, 'Transferencia', 'TXN010'),
(3, 'Miguel Torres', 'miguel.torres@email.com', '3011111111', 90000, 'Efectivo', 'TXN011'),
(7, 'Claudia Ramírez', 'claudia.ramirez@email.com', '3012222222', 60000, 'Tarjeta Débito', 'TXN012'),
(2, 'Andrés Jiménez', 'andres.jimenez@email.com', '3013333333', 45000, 'Transferencia', 'TXN013'),
(8, 'Isabella García', 'isabella.garcia@email.com', '3014444444', 300000, 'Tarjeta Crédito', 'TXN014'),
(4, 'Javier Mendoza', 'javier.mendoza@email.com', '3015555555', 25000, 'Efectivo', 'TXN015'),
(1, 'Natalia Herrera', 'natalia.herrera@email.com', '3016666666', 180000, 'PSE', 'TXN016'),
(9, 'Oscar Delgado', 'oscar.delgado@email.com', '3017777777', 70000, 'Transferencia', 'TXN017'),
(5, 'Liliana Ortiz', 'liliana.ortiz@email.com', '3018888888', 110000, 'Tarjeta Débito', 'TXN018'),
(10, 'Héctor Vargas', 'hector.vargas@email.com', '3019999999', 85000, 'Efectivo', 'TXN019'),
(1, 'Mónica Cruz', 'monica.cruz@email.com', '3020000000', 95000, 'Tarjeta Crédito', 'TXN020');

-- TABLA 14: Estado_adopcion (20 registros)
INSERT INTO Estado_adopcion (Nombre, Descripcion) VALUES
('Pendiente', 'Solicitud recibida, en proceso de revisión inicial'),
('En Revisión', 'Documentos siendo evaluados por el equipo'),
('Entrevista Programada', 'Cita agendada para entrevista personal'),
('Entrevista Realizada', 'Entrevista completada, esperando decisión'),
('Visita Domiciliaria', 'Programada inspección del hogar'),
('Aprobada', 'Solicitud aprobada, proceso de adopción iniciado'),
('Rechazada Documentos', 'Solicitud rechazada por documentación incompleta'),
('Rechazada Entrevista', 'Solicitud rechazada tras entrevista'),
('Rechazada Visita', 'Solicitud rechazada tras visita domiciliaria'),
('En Período Prueba', 'Animal en casa del adoptante por período prueba'),
('Completada', 'Adopción finalizada exitosamente'),
('Devuelta', 'Animal devuelto por el adoptante'),
('Cancelada Adoptante', 'Adoptante canceló el proceso'),
('Cancelada Veterinaria', 'Veterinaria canceló por incumplimiento'),
('En Seguimiento', 'Adopción completada, en seguimiento post-adopción'),
('Reubicación', 'Animal reubicado con otro adoptante'),
('En Espera', 'Adoptante en lista de espera para animal específico'),
('Proceso Legal', 'Proceso detenido por asuntos legales'),
('Animal No Disponible', 'Animal ya no disponible para adopción'),
('Requisitos Adicionales', 'Solicita documentación o requisitos adicionales');

-- TABLA 15: solicitudes (20 registros)
INSERT INTO solicitudes (Paciente, Nombre_solicitante, Correo_solicitante, Telefono_solicitante, Direccion_solicitante, Experiencia_animales, Motivo, Tiene_mascotas, Tiene_patio, Estado, respondido_por, Observacion_rta) VALUES
(5, 'Andrea López', 'andrea.lopez@email.com', '3004444444', 'Calle 50 #25-30, Bogotá', 'He tenido aves por 5 años', 'Quiero darle un hogar amoroso', 0, 1, 11, 1, 'Adopción completada exitosamente'),
(11, 'Fernando Castro', 'fernando.castro@email.com', '3021111111', 'Carrera 20 #15-45, Medellín', 'Experiencia con aves exóticas 10 años', 'Busco compañía para mi otra ave', 1, 0, 6, 1, 'Excelente perfil, adopción aprobada'),
(13, 'Patricia Vega', 'patricia.vega@email.com', '3022222222', 'Avenida 30 #60-80, Cali', 'Primera mascota, mucha investigación previa', 'Quiero aprender a cuidar un conejo', 0, 1, 5, 2, 'Programada visita domiciliaria'),
(14, 'Miguel Torres', 'miguel.torres@email.com', '3023333333', 'Calle 40 #25-50, Barranquilla', 'He tenido roedores toda mi vida', 'Busco un hámster activo', 1, 0, 4, 2, 'Entrevista realizada, muy buen candidato'),
(15, 'Claudia Ramírez', 'claudia.ramirez@email.com', '3024444444', 'Carrera 15 #35-70, Bucaramanga', 'Sin experiencia pero muy motivada', 'Quiero una mascota tranquila', 0, 1, 3, 3, 'Programada entrevista para el viernes'),
(16, 'Andrés Jiménez', 'andres.jimenez@email.com', '3025555555', 'Avenida 45 #80-12, Pereira', 'Tengo reptiles hace 8 años', 'Busco una iguana adulta', 1, 1, 11, 1, 'Adopción exitosa, seguimiento programado'),
(17, 'Isabella García', 'isabella.garcia@email.com', '3026666666', 'Calle 55 #20-40, Manizales', 'Trabajo en acuarismo hace 15 años', 'Quiero expandir mi acuario', 1, 0, 8, 3, 'Rechazada: espacio insuficiente'),
(18, 'Javier Mendoza', 'javier.mendoza@email.com', '3027777777', 'Carrera 25 #50-75, Ibagué', 'Propietario de establo', 'Necesito un caballo de trabajo', 1, 1, 6, 1, 'Aprobado: excelentes instalaciones'),
(19, 'Natalia Herrera', 'natalia.herrera@email.com', '3028888888', 'Avenida 60 #30-55, Neiva', 'He criado aves por 12 años', 'Busco una pareja para mi agapornis', 1, 1, 10, 2, 'Período prueba iniciado'),
(20, 'Oscar Delgado', 'oscar.delgado@email.com', '3029999999', 'Calle 65 #40-85, Villavicencio', 'Amante de los gatos hace 20 años', 'Quiero un gato tranquilo y mayor', 1, 0, 15, 1, 'Adopción completada, seguimiento mensual'),
(1, 'Liliana Ortiz', 'liliana.ortiz@email.com', '3030000000', 'Carrera 35 #65-20, Armenia', 'Primera mascota, curso de entrenamiento', 'Quiero un perro grande y protector', 0, 1, 2, 2, 'Documentos en revisión'),
(2, 'Héctor Vargas', 'hector.vargas@email.com', '3031111111', 'Avenida 70 #45-60, Popayán', 'He rescatado gatos callejeros', 'Busco un gato que necesite cuidados especiales', 1, 1, 7, 3, 'Rechazada: documentos incompletos'),
(3, 'Mónica Cruz', 'monica.cruz@email.com', '3032222222', 'Calle 75 #25-45, Pasto', 'Experiencia con perros de rescate', 'Quiero dar una segunda oportunidad', 1, 1, 11, 1, 'Adopción exitosa, excelente match'),
(4, 'Gabriel Ruiz', 'gabriel.ruiz@email.com', '3033333333', 'Carrera 40 #55-80, Tunja', 'Entrenador canino profesional', 'Busco un perro para entrenar', 1, 1, 9, 3, 'Rechazada: visita domiciliaria negativa'),
(6, 'Valeria Moreno', 'valeria.moreno@email.com', '3034444444', 'Avenida 80 #35-65, Valledupar', 'Veterinaria especialista en felinos', 'Quiero un gato con necesidades especiales', 1, 0, 6, 1, 'Aprobada: perfil profesional excelente'),
(7, 'Santiago Pérez', 'santiago.perez@email.com', '3035555555', 'Calle 85 #50-25, Montería', 'He tenido gatos siameses 15 años', 'Busco una gata siamés joven', 1, 1, 13, 2, 'Cancelada: cambio de ciudad'),
(8, 'Alejandra Torres', 'alejandra.torres@email.com', '3036666666', 'Carrera 45 #70-15, Sincelejo', 'Criadora amateur de chihuahuas', 'Quiero un chihuahua para reproducción', 1, 1, 14, 3, 'Cancelada: fines comerciales no permitidos'),
(9, 'Mauricio Silva', 'mauricio.silva@email.com', '3037777777', 'Avenida 90 #40-85, Riohacha', 'Experiencia con gatos grandes', 'Busco un Maine Coon adulto', 1, 1, 12, 1, 'Animal devuelto: incompatibilidad'),
(10, 'Paola Castro', 'paola.castro@email.com', '3038888888', 'Calle 95 #30-55, Florencia', 'Trabajo con animales de rescate', 'Quiero un perro senior para cuidados paliativos', 1, 1, 18, 2, 'Proceso legal: verificación de identidad'),
(12, 'Germán López', 'german.lopez@email.com', '3039999999', 'Carrera 50 #60-90, Mocoa', 'Especialista en medicina aviar', 'Busco una cacatúa para investigación ética', 1, 0, 17, 1, 'En lista de espera: perfil muy específico');

-- TABLA 16: Vacunas (20 registros)
INSERT INTO Vacunas (nombre, Descripcion, Especie, Edad_min, Intervalo_meses) VALUES
('Triple Canina', 'Vacuna contra distemper, hepatitis y parvovirus', 1, 2, 12),
('Antirrábica Canina', 'Vacuna contra la rabia para perros', 1, 3, 12),
('Triple Felina', 'Vacuna contra rinotraqueitis, calicivirus y panleucopenia', 2, 2, 12),
('Antirrábica Felina', 'Vacuna contra la rabia para gatos', 2, 3, 12),
('Bordetella Canina', 'Vacuna contra tos de las perreras', 1, 3, 6),
('Leucemia Felina', 'Vacuna contra virus de leucemia felina', 2, 3, 12),
('Parvovirus Canino', 'Vacuna específica contra parvovirus', 1, 2, 12),
('Coronavirus Canino', 'Vacuna contra coronavirus entérico', 1, 6, 12),
('Giardia Canina', 'Vacuna contra giardiasis', 1, 4, 6),
('Polivalente Canina', 'Vacuna múltiple 8 en 1', 1, 2, 12),
('Rinotraqueitis Felina', 'Vacuna específica contra herpesvirus', 2, 2, 12),
('Calicivirus Felino', 'Vacuna contra calicivirus', 2, 2, 12),
('Panleucopenia Felina', 'Vacuna contra parvovirus felino', 2, 2, 12),
('Clamidiosis Felina', 'Vacuna contra Chlamydia felis', 2, 4, 12),
('Mixomatosis Conejos', 'Vacuna contra mixomatosis en conejos', 16, 2, 6),
('Enfermedad Hemorrágica', 'Vacuna para conejos contra RHDV', 16, 3, 12),
('Newcastle Aves', 'Vacuna contra enfermedad de Newcastle', 3, 1, 6),
('Viruela Aviar', 'Vacuna contra viruela en aves', 3, 2, 12),
('Polivalente Equina', 'Vacuna múltiple para caballos', 7, 6, 12),
('Tétanos Equino', 'Vacuna antitetánica para équidos', 7, 4, 12);

-- TABLA 17: Historial_Vac (20 registros)
INSERT INTO Historial_Vac (Paciente, Vacuna, Veterinario, Fecha_Vac, Lote_vac, Prox_vacuna, Observaciones) VALUES
(1, 1, 1, '2024-01-10', '2024-01-05', '2025-01-10', 'Primera vacuna anual, sin reacciones adversas'),
(2, 3, 2, '2024-01-16', '2024-01-10', '2025-01-16', 'Vacuna triple felina aplicada correctamente'),
(3, 1, 3, '2023-12-15', '2023-12-10', '2024-12-15', 'Refuerzo anual, paciente en excelente estado'),
(4, 2, 1, '2023-11-20', '2023-11-15', '2024-11-20', 'Vacuna antirrábica, próximo refuerzo programado'),
(6, 10, 1, '2024-02-01', '2024-01-25', '2025-02-01', 'Vacuna polivalente 8 en 1, primera aplicación'),
(7, 4, 2, '2024-01-25', '2024-01-20', '2025-01-25', 'Antirrábica felina, sin complicaciones'),
(8, 1, 3, '2024-02-05', '2024-02-01', '2025-02-05', 'Triple canina, cachorro en crecimiento'),
(9, 6, 2, '2023-10-10', '2023-10-05', '2024-10-10', 'Vacuna leucemia felina, gata de alto riesgo'),
(10, 5, 1, '2024-01-30', '2024-01-25', '2024-07-30', 'Bordetella, refuerzo semestral'),
(11, 17, 14, '2024-02-10', '2024-02-05', '2024-08-10', 'Newcastle aves, primera aplicación'),
(12, 18, 14, '2023-12-01', '2023-11-25', '2024-12-01', 'Viruela aviar, refuerzo anual'),
(13, 15, 14, '2024-01-20', '2024-01-15', '2024-07-20', 'Mixomatosis, protocolo semestral'),
(14, 16, 14, '2024-02-15', '2024-02-10', '2025-02-15', 'RHDV conejos, primera dosis'),
(15, 15, 14, '2023-11-05', '2023-11-01', '2024-05-05', 'Mixomatosis, segunda dosis del año'),
(17, 19, 20, '2023-08-15', '2023-08-10', '2024-08-15', 'Polivalente equina, caballo de trabajo'),
(18, 17, 14, '2024-01-05', '2024-01-01', '2024-07-05', 'Newcastle, ave joven'),
(19, 12, 2, '2023-09-20', '2023-09-15', '2024-09-20', 'Calicivirus felino, gato adulto'),
(20, 11, 2, '2024-02-20', '2024-02-15', '2025-02-20', 'Rinotraqueitis, primera vacuna'),
(1, 2, 1, '2024-02-25', '2024-02-20', '2025-02-25', 'Antirrábica canina, refuerzo anual'),
(3, 5, 3, '2024-01-12', '2024-01-08', '2024-07-12', 'Bordetella, perro de alta exposición');

-- =====================================================
-- SECCIÓN 2: ACTUALIZAR DATOS (5 UPDATE)
-- =====================================================

-- 1. Actualizar información de contacto de un cliente
UPDATE Clientes 
SET Telefono = '3209999999', 
    Correo = 'pedro.jimenez.nuevo@email.com',
    Dirección = 'Nueva Avenida 15 #60-80, Pereira'
WHERE Cliente_id = 1;

-- 2. Actualizar estado de una cita y agregar observaciones
UPDATE citas 
SET Estado = 4, 
    Observaciones = 'Cita completada satisfactoriamente, paciente respondió excelente al tratamiento'
WHERE Cita_id = 4;

-- 3. Actualizar peso y descripción de una mascota después de consulta
UPDATE Pacientes 
SET Peso = 26.20, 
    Descripcion = 'Golden Retriever muy activo, ha ganado peso saludablemente después del tratamiento'
WHERE Pacientes_id = 1;
describe pacientes;
-- 4. Actualizar monto recaudado en campaña de donación
UPDATE Fin_donacion 
SET Monto_recaudado = (
    SELECT SUM(Monto) 
    FROM Donaciones 
    WHERE Fin = Fin_donacion
)
WHERE Fin_donacion BETWEEN 1 AND 10;

-- 5. Actualizar horario y especialidad de un veterinario
UPDATE Veterinarios 
SET Horario_inicio = '07:00:00', 
    Hortario_fin = '15:00:00', 
    Especialidad = 'Medicina General y Cirugía Menor'
WHERE Veterinario_id = 1;

-- =====================================================
-- SECCIÓN 3: ELIMINAR DATOS (5 DELETE)
-- =====================================================

-- 1. Eliminar citas canceladas por el cliente
DELETE FROM Historial 
WHERE Cita IN (
    SELECT Cita_id 
    FROM citas 
    WHERE Estado = 5 AND Fecha_cita < '2024-01-01'
);
SET SQL_SAFE_UPDATES = 0;
describe historial;
describe citas;

DELETE FROM citas 
WHERE Estado = 5 AND Fecha_cita < '2024-01-01';

-- 2. Eliminar donaciones duplicadas o erróneas (menores a 20000)
DELETE FROM Donaciones 
WHERE Monto < 20000 AND Metodo_pago = 'Efectivo';

-- 3. Eliminar solicitudes de adopción rechazadas hace más de 6 meses
DELETE FROM solicitudes 
WHERE Estado IN (7, 8, 9) 
    AND Fecha_solicitud < DATE_SUB(CURDATE(), INTERVAL 6 MONTH);

-- 4. Eliminar usuarios inactivos sin registros asociados
DELETE FROM Usuarios 
WHERE Usuario_id IN (18, 19, 20) 
    AND Activo = 0 
    AND Usuario_id NOT IN (
        SELECT DISTINCT Usuario FROM Veterinarios
        UNION 
        SELECT DISTINCT Empleado_id FROM Clientes WHERE Empleado_id IS NOT NULL
        UNION
        SELECT DISTINCT Creado_por FROM citas
    );

-- 5. Eliminar especies sin razas asociadas

-- 1. Eliminar historiales de vacunación antiguos sin referencias críticas
DELETE FROM Historial_Vac 
WHERE Fecha_Vac < '2023-01-01' 
    AND Paciente IN (
        SELECT Pacientes_id 
        FROM Pacientes 
        WHERE Estado = 'Adoptado'
    );
describe pacientes;

-- =====================================================
-- SECCIÓN 4: CONSULTAS SELECT (5 SELECT)
-- =====================================================

-- 1. SELECT: Información completa de pacientes con datos del dueño y veterinario
SELECT 
    p.Nombre AS 'Mascota',
    p.Edad,
    p.Peso,
    p.Sexo,
    r.Nombre_raza AS 'Raza',
    e.Nombre_Especie AS 'Especie',
    c.Nombre AS 'Dueño',
    c.Telefono AS 'Teléfono Dueño',
    c.Correo AS 'Email Dueño',
    p.Estado AS 'Estado Paciente',
    p.Numero_chip AS 'Microchip',
    p.Fecha_Ingreso AS 'Fecha Registro'
FROM Pacientes p
INNER JOIN Razas r ON p.Raza_id = r.Raza_id
INNER JOIN Especies e ON r.Especie = e.Especie_id
INNER JOIN Clientes c ON p.Cliente_id = c.Cliente_id
WHERE p.Estado = 'Paciente'
ORDER BY p.Nombre;
-- 2.Mostrar mobre y edad de animal
select nombre,edad from pacientes;
-- 3.Mostrar nombre y sexo de los animales Macho
select nombre,sexo from pacientes where sexo="Macho";
-- 4.Mostrar nombre fecha de ingreso por edad de manera decendiente
select nombre,fecha_ingreso from pacientes 
order by edad desc; 
-- 5. Mostrar pacientes ingresados en el ultimo mes
select nombre,fecha_ingreso from pacientes where fecha_ingreso >= now()-interval 1 month;

