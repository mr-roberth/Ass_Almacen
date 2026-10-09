/* Oleolab · Assessment de sostenibilidad del monitor de insumos críticos para Compras
 * Base sugerida: 4 pilares, 8 elementos, 24 preguntas naturales y verificables.
 * Las metas exactas deben acordarse por proceso; las respuestas requieren evidencias.
 * Un catálogo personalizado no se sobrescribe automáticamente.
 */
const PREVIOUS_DEFAULT_CATALOG=[
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

const DEFAULT_CATALOG=[
["Confiabilidad",[
 ["Confianza en el inventario",[
  "¿Las existencias de aceites y materiales de empaque que aparecen en el monitor coinciden con los conteos físicos revisados? (Conteos cíclicos y diferencias)",
  "¿Se registran a tiempo las entradas, salidas y consumos para que Compras consulte un inventario actualizado? (Fechas de movimientos y último corte)",
  "¿Las diferencias de inventario que pueden cambiar una compra se aclaran antes de compartir el monitor? (Ajustes y aclaraciones documentadas)"
 ]],
 ["Necesidades y cobertura",[
  "¿Las necesidades de aceites y materiales de empaque parten del plan de producción vigente y de los consumos por producto? (Plan y cálculo de materiales)",
  "¿Se consideran el inventario disponible, los materiales comprometidos y las entregas pendientes al calcular lo que falta comprar? (Cálculo de cobertura)",
  "¿El monitor permite saber qué material puede faltar, cuánto se necesita y para qué fecha? (Revisión de materiales críticos)"
 ]]
]],
["Comunicación",[
 ["Información útil para Compras",[
  "¿Compras recibe el monitor de insumos críticos en la fecha acordada, sin tener que solicitarlo? (Registro de envío)",
  "¿Compras puede distinguir cuáles aceites o materiales de empaque requieren atención inmediata y por qué? (Revisión conjunta del monitor)",
  "¿Se avisa oportunamente cuando cambia una necesidad, una existencia o una fecha que afecta las decisiones de compra? (Avisos y actualizaciones)"
 ]],
 ["Seguimiento de materiales críticos",[
  "¿Cada material con riesgo de faltar tiene un responsable y una acción de seguimiento definida? (Lista de pendientes)",
  "¿Compras y Planeación revisan si las fechas prometidas de entrega alcanzan para cubrir la necesidad? (Fechas de compra y llegada)",
  "¿Los acuerdos sobre faltantes, compras y entregas se revisan hasta confirmar su cierre? (Seguimiento con responsables y fechas)"
 ]]
]],
["Disciplina y competencias",[
 ["Rutinas y responsabilidades",[
  "¿Está claro quién actualiza los inventarios, quién confirma las llegadas y quién valida el monitor antes de enviarlo? (Responsables definidos)",
  "¿Las personas realizan las actualizaciones y revisiones en los horarios acordados, sin depender de recordatorios constantes? (Historial de cortes)",
  "¿Cuando aparece una alerta de faltante, queda registrado quién la atendió y qué acción tomó? (Bitácora de alertas)"
 ]],
 ["Capacidad para actuar",[
  "¿El personal de Almacén sabe comprobar las existencias de aceites y materiales de empaque y explicar las diferencias encontradas? (Verificación práctica)",
  "¿Las personas encargadas saben interpretar necesidades, coberturas y fechas de reabastecimiento para tomar decisiones? (Ejemplo práctico)",
  "¿Almacén, Planeación y Compras saben identificar un dato dudoso y a quién acudir antes de usarlo? (Caso práctico o incidencia real)"
 ]]
]],
["Sostenibilidad",[
 ["Continuidad de la práctica",[
  "¿Hay personas de respaldo que sepan actualizar, validar y compartir el monitor cuando falta el responsable habitual? (Prueba o sustitución real)",
  "¿Los pasos para actualizar inventarios, revisar riesgos y entregar el monitor están documentados y al alcance del equipo? (Guía vigente)",
  "¿El monitor se sigue entregando completo y a tiempo durante ausencias, cambios de turno o periodos de alta carga? (Historial de entregas)"
 ]],
 ["Aprendizaje y mejora",[
  "¿Se revisan las diferencias de inventario y los faltantes que el monitor no logró anticipar? (Casos analizados)",
  "¿Los problemas repetidos generan acciones con responsable y fecha, en lugar de resolverse solo de momento? (Plan de acciones)",
  "¿Se verifica que las mejoras ayudan a reducir diferencias de inventario, compras urgentes o faltantes imprevistos? (Comparación entre periodos)"
 ]]
]]
];
const CATALOG_KEY="oleolab_assessment_catalog_v1";
function validCatalog(c){
 if(!Array.isArray(c)||c.length!==4)return false;
 if(c.some((p,i)=>!Array.isArray(p)||p[0]!==DEFAULT_CATALOG[i][0]||!Array.isArray(p[1])||p[1].length<1||p[1].length>12))return false;
 return c.every(p=>p[1].every(e=>Array.isArray(e)&&typeof e[0]==="string"&&e[0].trim().length>0&&e[0].length<=120&&Array.isArray(e[1])&&e[1].length>=1&&e[1].length<=25&&e[1].every(q=>typeof q==="string"&&q.trim().length>=5&&q.length<=700)));
}
function normalizeCatalog(c){return validCatalog(c)?JSON.parse(JSON.stringify(c)):JSON.parse(JSON.stringify(DEFAULT_CATALOG))}
function isPreviousDefault(c){return JSON.stringify(c)===JSON.stringify(PREVIOUS_DEFAULT_CATALOG)}
function upgradeUntouchedDefault(c){return isPreviousDefault(c)?JSON.parse(JSON.stringify(DEFAULT_CATALOG)):c}
