# Assessment de madurez · Oleolab

**App en línea:** https://mr-roberth.github.io/Ass_Almacen/

Assessment operativo de almacenes con especial atención a factores humanos y evidencia verificable. Basado en la dinámica de `CI4KASH_ASSMT` y con el logo Oleolab desde `mr-roberth/Pruebas/assets/oleolab-logo.png`.

## Cuestionario actualizado · Monitor de insumos críticos para Compras

El objetivo del assessment no es auditar solamente una aplicación: es evaluar si Almacén y Planeación pueden **entregar periódicamente a Compras un monitor útil y confiable** que anticipe faltantes de **aceites y materiales de empaque** a partir del inventario y las necesidades de producción.

- **Confiabilidad:** confianza en el inventario, actualización de movimientos, diferencias físicas, necesidades y cobertura.
- **Comunicación:** envío del monitor a Compras, alertas comprensibles y seguimiento a materiales críticos.
- **Disciplina y competencias:** responsables claros, actualizaciones a tiempo y capacidad real del personal para identificar errores e interpretar alertas.
- **Sostenibilidad:** suplentes, continuidad en ausencias y aprendizaje ante diferencias de inventario o compras urgentes.

Se mantienen **4 pilares, 8 elementos y 24 criterios**, redactados de forma natural y con fuentes de evidencia sugeridas (conteos, historial, avisos, compromisos, pruebas prácticas). No se imponen porcentajes arbitrarios; el evaluador puede definir metas por criterio en la pestaña Editar criterios.

Las evaluaciones anteriores y los catálogos personalizados no se sobrescriben. Al abrir una evaluación histórica se usan las preguntas que tenía al guardarse; los nuevos cuestionarios llevan una copia del catálogo vigente. El cuestionario inicial anterior se migra automáticamente al nuevo si no había sido personalizado; para cargar el nuevo en un navegador con cambios propios, se puede usar **Editar criterios → Restablecer 24 iniciales → Guardar criterios**. No se modifica una evaluación respondida al hacer esto.

## Versión anterior · 24 criterios iniciales

- **4 pilares:** Confiabilidad, Comunicación, Disciplina y competencias, Sostenibilidad
- **8 elementos:** dos por pilar
- **24 criterios:** tres por elemento, cada uno ofrece una pregunta natural y evidencia para comprobarla
- Se conservan las calificaciones 0 = No cumple, 1 = Parcial, 2 = Cumple. **Sin evaluar** no se contabiliza en el porcentaje, por lo que los resultados con respuestas pendientes son provisionales.
- Para evaluar objetivamente, el criterio **Cumple** exige alcanzar la meta indicada con registros verificables; la aplicación ofrece campo de evidencia, observación y acción y muestra el grado de documentación de las respuestas.
- La vista de evaluación continúa avanzando elemento por elemento; mantiene Dashboard, radar de pilares, barras de elementos, criterios analíticos, PDF, PNG y CSV.

### Editor de preguntas dentro de la web

Abrir pestaña **Editar criterios**: cambiar el nombre de elementos, modificar el texto de cada pregunta o umbral, agregar o quitar criterios, y agregar o quitar elementos. Los cuatro pilares se mantienen para comparaciones homogéneas. Pulsar **Guardar criterios**.

El catálogo editable se guarda en el navegador del dispositivo. Puedes exportar/importar un JSON de preguntas para moverlo a otro dispositivo, o respaldarlo junto con el historial en **Evaluaciones → Respaldo JSON**. Restaurar las 24 iniciales no borra evaluaciones anteriores.

**Versionado histórico:** cada evaluación nueva guarda una copia completa de su catálogo. Las evaluaciones anteriores de 64 criterios se siguen mostrando y calculando con sus preguntas antiguas (aunque no incorporaran aún la propiedad `catalog`). Cuando modificas el catálogo, solo se usa en evaluaciones nuevas; las evaluaciones ya calificadas no se reescriben.

## Almacenamiento

- Google Sheets: https://docs.google.com/spreadsheets/d/1D3iD-qN8fxdMUd7SO60GPexmFecUHXLy3p-C4GvTlZA/edit
- GAS: `gas/Code.gs`
- URL desplegada: https://script.google.com/macros/s/AKfycbySBlGPjgi5f8b4pOKwEvaCKBfmjgsi16Hsnj4DM3hE11Iqc5fTyjZNfEjA5lpxJ-CT/exec

Los registros de evaluaciones incluyen su catálogo propio dentro de `payload_json`, compatible con el GAS ya desplegado. El **catálogo de edición** es local y no se sincroniza automáticamente entre navegadores: se comparte exportando/importando el JSON. El guardado de evaluaciones intenta enviar a GAS, pero algunos navegadores impiden leer la respuesta por CORS; consulta Sheets para confirmar recepción. La recuperación desde GAS también puede estar restringida por CORS.

## Seguridad

No habilitar acceso anónimo al GAS para información interna sin autenticación efectiva. GitHub Pages por sí solo no autentica usuarios; proteger las evaluaciones y sus respaldos.
