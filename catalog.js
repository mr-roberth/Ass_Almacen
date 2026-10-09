/* Catálogo editable del Assessment Oleolab.
   Los cuatro pilares permanecen fijos para comparar resultados en el tiempo.
   Las preguntas y elementos se editan desde la propia aplicación. */
const DEFAULT_CATALOG=[
["Confiabilidad",[
 ["Registro oportuno",[
 "¿Se realizaron al menos 95% de las actualizaciones obligatorias dentro del plazo establecido? (Verificar bitácora de cortes)",
 "¿Al menos 95% de los movimientos se registró antes del cierre del turno? (Verificar registros y horarios)",
 "¿Al menos 98% de los registros permite identificar a la persona responsable? (Verificar historial de capturas)"
 ]],
 ["Validación de datos",[
 "¿Al menos 98% de los registros muestreados coincide con la evidencia documental o física? (Muestreo)",
 "¿Se revisó el 100% de las diferencias críticas antes de emitir el reporte? (Registro de incidencias)",
 "¿Se resolvió al menos 90% de los errores detectados dentro del plazo comprometido? (Seguimiento)"
 ]]
]],
["Comunicación",[
 ["Cambios y alertas",[
 "¿Al menos 95% de los cambios relevantes se comunicó a las áreas afectadas antes del siguiente corte? (Avisos fechados)",
 "¿Al menos 90% de los riesgos críticos se escaló antes de afectar la operación? (Bitácora de alertas)",
 "¿Al menos 90% de las decisiones relevantes tiene fecha y destinatarios registrados? (Minutas o avisos)"
 ]],
 ["Coordinación y acuerdos",[
 "¿Al menos 90% de los acuerdos entre áreas incluye responsable y fecha compromiso? (Minutas)",
 "¿Al menos 90% de los compromisos interáreas se cerró dentro del plazo acordado? (Seguimiento)",
 "¿Al menos 90% de los pendientes abiertos recibió seguimiento documentado durante el periodo? (Bitácora)"
 ]]
]],
["Disciplina y competencias",[
 ["Ejecución y responsabilidad",[
 "¿Al menos 95% de las rutinas operativas se ejecutó en la fecha y hora establecidas? (Registro de ejecución)",
 "¿El 100% de las actividades críticas tiene titular y suplente designados? (Matriz de responsabilidades)",
 "¿Al menos 90% de las desviaciones asignadas se atendió dentro del plazo establecido? (Control de pendientes)"
 ]],
 ["Competencia y autonomía",[
 "¿Al menos 90% del personal responsable aprobó una evaluación práctica vigente? (Registro de capacitación)",
 "¿Al menos 90% de las personas evaluadas puede interpretar alertas y actuar sin ayuda? (Prueba observada)",
 "¿Al menos 95% de las capturas es realizado por el responsable asignado? (Historial de usuarios)"
 ]]
]],
["Sostenibilidad",[
 ["Continuidad del proceso",[
 "¿El 100% de las actividades críticas cuenta con instructivo vigente y accesible? (Revisión documental)",
 "¿Las ausencias críticas del periodo fueron cubiertas por suplentes competentes sin suspender rutinas? (Bitácora de turnos)",
 "¿Al menos 90% de los relevos documentó la entrega de pendientes? (Registro de entrega-recepción)"
 ]],
 ["Aprendizaje y mejora",[
 "¿Al menos 90% de los incumplimientos relevantes tiene causa documentada? (Análisis de desviaciones)",
 "¿Al menos 90% de las acciones correctivas cerradas cuenta con verificación de efectividad? (Seguimiento)",
 "¿Se redujo la recurrencia de las principales causas respecto del periodo anterior? (Análisis comparativo)"
 ]]
]]
];
const CATALOG_KEY="oleolab_assessment_catalog_v1";
function validCatalog(c){
 if(!Array.isArray(c)||c.length!==4||c.length>4)return false;
 if(c.some((p,i)=>!Array.isArray(p)||p[0]!==DEFAULT_CATALOG[i][0]||!Array.isArray(p[1])||p[1].length<1||p[1].length>12))return false;
 return c.every(p=>p[1].every(e=>Array.isArray(e)&&typeof e[0]==="string"&&e[0].trim().length>0&&e[0].length<=120&&Array.isArray(e[1])&&e[1].length>=1&&e[1].length<=25&&e[1].every(q=>typeof q==="string"&&q.trim().length>=5&&q.length<=700)));
}
function normalizeCatalog(c){return validCatalog(c)?JSON.parse(JSON.stringify(c)):JSON.parse(JSON.stringify(DEFAULT_CATALOG))}
