
INSERT INTO roles_usuario (nombre_rol, descripcion, activo) VALUES
  ('Administrador', 'Acceso completo al sistema, gestión de usuarios y configuración', TRUE),
  ('Veterinario', 'Acceso a consultas médicas, historiales y gestión de citas', TRUE),
  ('Recepcionista', 'Gestión de citas, clientes y registro de animales', TRUE),
  ('Vendedor', 'Gestión de campañas de donación y solicitudes de adopción', TRUE)
ON CONFLICT (nombre_rol) DO NOTHING;


INSERT INTO estado_citas (estado_nombre, descripcion, activo) VALUES
  ('Pendiente', 'Cita programada, esperando confirmación', TRUE),
  ('Confirmada', 'Cita confirmada por el cliente', TRUE),
  ('En Curso', 'Consulta en progreso', TRUE),
  ('Completada', 'Consulta finalizada exitosamente', TRUE),
  ('Cancelada', 'Cita cancelada por el cliente o veterinaria', TRUE),
  ('No Asistió', 'Cliente no se presentó a la cita', TRUE)
ON CONFLICT (estado_nombre) DO NOTHING;


INSERT INTO estado_adopcion (nombre, descripcion, activo) VALUES
  ('Pendiente', 'Solicitud recibida, en espera de revisión', TRUE),
  ('En Revisión', 'Solicitud siendo evaluada por el equipo', TRUE),
  ('Aprobada', 'Solicitud aprobada, pendiente de entrega del animal', TRUE),
  ('Rechazada', 'Solicitud rechazada', TRUE),
  ('Completada', 'Adopción completada y animal entregado', TRUE),
  ('Cancelada', 'Solicitud cancelada por el solicitante', TRUE)
ON CONFLICT (nombre) DO NOTHING;


INSERT INTO especies (nombre_especie, descripcion, activo) VALUES
  ('Perro', 'Canis lupus familiaris', TRUE),
  ('Gato', 'Felis catus', TRUE),
  ('Ave', 'Aves domésticas', TRUE),
  ('Roedor', 'Pequeños mamíferos roedores', TRUE),
  ('Reptil', 'Reptiles domésticos', TRUE)
ON CONFLICT (nombre_especie) DO NOTHING;
 

INSERT INTO tipo_consulta (nombre, descripcion, costo, activo) VALUES
  ('Consulta General', 'Revisión médica general', 50000.00, TRUE),
  ('Vacunación', 'Aplicación de vacunas', 30000.00, TRUE),
  ('Cirugía Menor', 'Procedimientos quirúrgicos menores', 150000.00, TRUE),
  ('Cirugía Mayor', 'Procedimientos quirúrgicos mayores', 500000.00, TRUE),
  ('Emergencia', 'Atención de emergencia veterinaria', 100000.00, TRUE),
  ('Control Prenatal', 'Control de animales en gestación', 60000.00, TRUE),
  ('Desparasitación', 'Tratamiento antiparasitario', 25000.00, TRUE),
  ('Esterilización', 'Procedimiento de esterilización', 200000.00, TRUE)
ON CONFLICT (nombre) DO NOTHING;


INSERT INTO razas (especie_id, nombre_raza, descripcion, activo) VALUES
  (1, 'Mestizo', 'Perro cruzado de diferentes razas', TRUE),
  (1, 'Labrador Retriever', 'Raza amigable y activa', TRUE),
  (1, 'Golden Retriever', 'Raza amigable ideal para familias', TRUE),
  (1, 'Pastor Alemán', 'Raza inteligente y leal', TRUE),
  (1, 'Bulldog Francés', 'Raza pequeña de compañía', TRUE),
  (1, 'Chihuahua', 'Raza muy pequeña', TRUE),
  (1, 'Poodle', 'Raza inteligente hipoalergénica', TRUE),
  (1, 'Beagle', 'Raza cazadora amigable', TRUE),
  (1, 'Husky Siberiano', 'Raza de trabajo resistente al frío', TRUE),
  (1, 'Pitbull', 'Raza fuerte y leal', TRUE)
ON CONFLICT (especie_id, nombre_raza) DO NOTHING;

INSERT INTO razas (especie_id, nombre_raza, descripcion, activo) VALUES
  (2, 'Mestizo', 'Gato cruzado de diferentes razas', TRUE),
  (2, 'Siamés', 'Gato vocal y social', TRUE),
  (2, 'Persa', 'Gato de pelo largo y tranquilo', TRUE),
  (2, 'Maine Coon', 'Raza grande y amigable', TRUE),
  (2, 'Angora', 'Gato de pelo largo y sedoso', TRUE),
  (2, 'Bengalí', 'Gato con apariencia salvaje', TRUE),
  (2, 'Ragdoll', 'Gato dócil y relajado', TRUE),
  (2, 'Británico de pelo corto', 'Gato robusto y tranquilo', TRUE)
ON CONFLICT (especie_id, nombre_raza) DO NOTHING;

INSERT INTO vacunas (nombre, descripcion, edad_minima_meses, intervalo_meses, activo, especie_id) VALUES
  ('Parvovirus', 'Vacuna contra parvovirus canino', 2, 12, TRUE, 1),
  ('Moquillo', 'Vacuna contra moquillo canino', 2, 12, TRUE, 1),
  ('Rabia', 'Vacuna antirrábica obligatoria', 3, 12, TRUE, 1),
  ('Hepatitis', 'Vacuna contra hepatitis infecciosa', 2, 12, TRUE, 1),
  ('Polivalente', 'Vacuna múltiple (parvovirus, moquillo, hepatitis)', 2, 12, TRUE, 1)
ON CONFLICT (nombre, especie_id) DO NOTHING;

INSERT INTO vacunas (nombre, descripcion, edad_minima_meses, intervalo_meses, activo, especie_id) VALUES
  ('Triple Felina', 'Vacuna contra rinotraqueitis, calicivirus y panleucopenia', 2, 12, TRUE, 2),
  ('Rabia', 'Vacuna antirrábica obligatoria', 3, 12, TRUE, 2),
  ('Leucemia Felina', 'Vacuna contra leucemia felina (FeLV)', 2, 12, TRUE, 2)
ON CONFLICT (nombre, especie_id) DO NOTHING;
