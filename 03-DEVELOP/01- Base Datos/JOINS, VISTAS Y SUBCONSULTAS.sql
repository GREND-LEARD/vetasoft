use vetasoft;

-- =====================================================
-- SECCIÓN 1: 5 Inner join
-- =====================================================
-- 1.inner join paciente con fecha motivo y estado 
select p.nombre as Paciente,c.fecha_cita,c.motivo,e.Estado_nombre as Estado
from citas c
join pacientes p on c.paciente=p.Pacientes_id
join estado_citas e on c.estado=e.estado_id;

-- 2.inner join de donaciones relacionado a su campaña

select d.nombre_donante , d.fecha_donacion,d.monto,f.nombre 
From donaciones d
join fin_donacion f on d.Fin=f.Fin_donacion;

-- 3.inner join mascotas y su solicitud

select p.nombre as Mascota,e.nombre as Estado,s.solicitud_id,s.nombre_solicitante,s.motivo,s.fecha_solicitud  
from solicitudes s
join pacientes p on s.paciente = p.pacientes_id
join estado_adopcion e on s.Estado =e.Estado_id;

-- 4.inner join historial medico por paciente

select h.historial_id,h.diagnostico,h.fecha_creación,p.nombre as Paciente,u.nombre as veterinario
from historial h
join citas c on h.cita=c.cita_id  
join pacientes p on c.Paciente=p.Pacientes_id
join veterinarios v on c.veterinario=v.Veterinario_id
join usuarios u on v.usuario=u.usuario_id;

-- 5.inner join pacientes con su respectiva vacuna

select p.nombre as Paciente,p.edad,h.fecha_vac,h.lote_vac,h.prox_vacuna,u.nombre as veterinario ,va.nombre as vacuna
from historial_vac h 
join pacientes p on h.paciente=p.pacientes_id 
join vacunas va on h.vacuna=va.Vacuna_id
join veterinarios v on h.Veterinario=v.Veterinario_id 
join usuarios u on v.usuario=u.Usuario_id;


-- =====================================================
-- SECCIÓN 2: 5 Right join
-- =====================================================


-- 1.right join todas especies con pacientes relacionados

select e.nombre_especie as especie,p.nombre as mascota 
from pacientes p 
right join razas r on p.Raza = r.Raza_id
right join especies e on r.especie=e.Especie_id;

-- 2.Right join todos los pacientes tengan o no cita

select p.pacientes_id,p.nombre as Paciente , c.cita_id, c.fecha_cita,c.motivo
from citas c
Right join pacientes p on c.Paciente=p.Pacientes_id
;

-- 3.uso Right join y left join para todos los paciente con vacuna o no

select	p.pacientes_id ,p.nombre as Paciente ,va.nombre as vacuna, h.fecha_vac,h.prox_vacuna ,h.lote_vac 
from historial_vac h
Right join pacientes p on h.Paciente = p.Pacientes_id
left join vacunas va on h.vacuna = va.vacuna_id;

-- 4.uso Right join muestre todas las campañas tengan donaciones o no

select f.nombre as Campaña ,f.meta_monto as Meta ,f.monto_recaudado as Recaudo ,d.nombre_donante as donante ,
d.monto,d.metodo_pago
from donaciones d 
Right join fin_donacion f on d.fin =f.Fin_donacion;

-- 5.Right join Todos los pacientes que tengan o no historial medico

select p.pacientes_id,p.nombre as paciente, h.historial_id,h.diagnostico,h.tratamiento
from historial h
Right join citas c on h.cita=c.Cita_id
Right join pacientes p on c.Paciente=p.Pacientes_id;


-- =====================================================
-- SECCIÓN 3: 5 Left join
-- =====================================================


-- 1.left join clientes con o sin masconta 
select c.cliente_id,c.nombre,p.nombre as mascota
from clientes c
left join pacientes p on c.Cliente_id=p.Cliente;

-- 2.left join mostrar mascotas tengan o no tengan solicitudas de adopcion
select p.nombre,s.solicitud_id
from pacientes p 
left join solicitudes s on s.Paciente=p.Pacientes_id;

-- 3. left join especies con o sin razas

select e.nombre_especie,r.nombre_raza 
from especies e 
left join razas r on e.especie_id=r.especie;

-- 4.left join donaciones por campaña
select f.fin_donacion,f.nombre as campaña ,d.donacion_id,d.nombre_donante,d.monto
 from fin_donacion f 
 left join donaciones d on f.fin_donacion= d.fin;
 
 -- 5.Uso Right join y Left join para todos los paciente con vacuna o no

select	p.pacientes_id ,p.nombre as Paciente ,va.nombre as vacuna, h.fecha_vac,h.prox_vacuna ,h.lote_vac 
from historial_vac h
Right join pacientes p on h.Paciente = p.Pacientes_id
left join vacunas va on h.vacuna = va.vacuna_id;
 
 -- =====================================================
-- SECCIÓN 4: Subconsultas
-- ======================================================
-- 1. subconsulta pacientes con mas de dos citas

select p.nombre, p.pacientes_id
from pacientes p
where (
select count(*)
from citas c 
where c.paciente=p.Pacientes_id)>2;

-- 2. subconsulta veterinarios con citas en el ultimo mes

select v.veterinario_id
from veterinarios v
where v.veterinario_id in (
select distinct c.veterinario
from citas c
where c.Fecha_cita>= date_sub(curdate(),
interval 1 month));

-- 3. subconsulta citas con valor menor al promedio (Más barata)
SELECT c.consulta_id, c.valor
FROM consultas c
WHERE c.valor < (
    SELECT AVG(c2.valor)
    FROM consultas c2
);

-- 4. Mascotas con peso mayor al promedio general

SELECT p.Pacientes_id, p.Nombre, p.Peso
FROM Pacientes p
WHERE p.Peso > (
    SELECT AVG(p2.Peso)
    FROM Pacientes p2
);


-- 5. Clientes con sólo una mascota

SELECT cl.cliente_id, cl.nombre
FROM clientes cl
WHERE cl.cliente_id IN (
    SELECT p.cliente
    FROM pacientes p
    GROUP BY p.cliente
    HAVING COUNT(*) = 1
);

 -- =====================================================
-- SECCIÓN 5: Vistas
-- ======================================================

-- 1.vista para mostrar las campañas activas

create view campañas_activas AS
    SELECT 
        f.Fin_donacion AS Fin_donacion,
        f.Nombre AS nombre,
        f.Meta_monto AS meta_monto,
        f.Monto_recaudado AS monto_recaudado
    FROM
        fin_donacion f
    WHERE
        f.Activo = 1;
        
	select*from campañas_activas;
        
-- 2.vista de los datos publicos de veterinarios
create view vista_publica AS
    SELECT 
        u.Nombre AS veterinario,
        u.Correo AS correo,
        u.Telefono AS telefono,
        v.Especialidad AS especialidad
    FROM usuarios u
        JOIN veterinarios v ON v.Usuario = u.Usuario_id
        JOIN roles_usuario r ON u.Rol = r.Rol_id
    WHERE
        r.Rol_id <> 5;
        
select*from vista_publica;

-- 3.vista veterinarios con los pacientes que han atenido
 CREATE OR REPLACE VIEW vista_veterinarios_pacientes_lista AS
SELECT
  v.Veterinario_id,
  u.Nombre AS veterinario,
  COUNT(c.Cita_id) AS total_citas,
  GROUP_CONCAT(DISTINCT p.Pacientes_id) AS pacientes_ids
FROM Veterinarios v
JOIN Usuarios u ON v.Usuario = u.Usuario_id
LEFT JOIN Citas c ON v.Veterinario_id = c.Veterinario
LEFT JOIN Pacientes p ON c.Paciente = p.Pacientes_id
GROUP BY v.Veterinario_id, u.Nombre;

select*from vista_veterinarios_pacientes_lista;

    
-- 4. vista de las solicitudes de adopcion que se encuentren en estado pendiente

create view solicitudes_pendientes as
select  s.nombre_solicitante, s.correo_solicitante, s.telefono_solicitante, s.fecha_solicitud, e.nombre
from solicitudes s
join estado_adopcion e on s.estado=e.estado_id
where s.estado in (1,2,6); 

select*from solicitudes_pendientes;

-- 5. vista de reporte resumido del costo de citas/consultas 

Create view costo_citas as
select p.pacientes_id, p.nombre,
sum(t.valor) as Total_pagado,
count(c.cita_id) as Numero_citas
from pacientes p
join citas c on p.pacientes_id=c.paciente
join consultas t on c.tipo_consulta=t.consulta_id
group by p.pacientes_id, p.nombre
order by total_pagado desc;

select*from costo_citas;
