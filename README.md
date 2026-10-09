# Oleolab · Assessment de madurez del monitor de insumos críticos

**Aplicación:** https://mr-roberth.github.io/Ass_Almacen/

Cuestionario de evaluación orientado a sostener un monitor útil para Compras, Ventas, Finanzas, Almacén y Planeación, con datos confiables de aceites, materiales de empaque, inventarios, Forecast y fechas de llegada.

## Cuestionario actual (octubre de 2026)

Catálogo inicial obtenido de **CRITERIOS!A9:E37** del Google Sheets:
https://docs.google.com/spreadsheets/d/1yGLqGgycMCsg8wpoVaYLzkgkw-bh6KHBZCZFGKlo0lA/edit

- **29 criterios**, **8 elementos**, **4 pilares**.
- **Confiabilidad:** confianza en inventario y en el Forecast (confiabilidad, oportunidad y cambios), necesidades y coberturas.
- **Comunicación:** claridad del monitor para Compras, Ventas y Finanzas, alertas y compromiso de fechas de entrega.
- **Disciplina y competencias:** responsables de actualizar la información, puntualidad y capacidad para actuar.
- **Sostenibilidad:** respaldo del personal, instrucciones, seguimiento y mejora de la práctica.

Respuestas: **No cumple = 0**, **Parcial = 1**, **Cumple = 2**. Los no evaluados no se incluyen en el promedio de madurez (por eso se muestran resultados parciales durante la captura).

## Interfaz

Cuatro pestañas:

1. **Evaluar:** responder por elemento; se muestra la evidencia sugerida debajo de cada pregunta; puedes agregar evidencia, observaciones y acciones. Avance automático por los ocho elementos.
2. **Resultados:** nivel de madurez, KPI, radar de pilares, barras por elemento, descarga de PNG y reporte PDF.
3. **Historial:** consultar y reabrir evaluaciones, CSV y respaldo JSON.
4. **Preguntas:** editor visual de criterios y evidencias. Puedes modificar textos, agregar/eliminar preguntas, agregar/eliminar elementos, restaurar los 29 oficiales, guardar, descartar cambios, exportar e importar el catálogo.

Los cuatro pilares permanecen fijos; los elementos y criterios se pueden personalizar. La configuración se guarda en el **almacenamiento del navegador**. **No se sincroniza automáticamente con el catálogo del Google Sheets ni con otros dispositivos**; utiliza las opciones de exportar/importar JSON. Cada evaluación guarda su propia copia de preguntas para no recalificar la historia cuando cambien los criterios. Las evaluaciones antiguas de 24 o 64 criterios no se eliminan ni se migran si ya fueron respondidas.

## GAS y seguridad

- Backend existente: `gas/Code.gs`
- Base de datos de evaluaciones GAS: https://docs.google.com/spreadsheets/d/1D3iD-qN8fxdMUd7SO60GPexmFecUHXLy3p-C4GvTlZA/edit
- Endpoint desplegado: https://script.google.com/macros/s/AKfycbySBlGPjgi5f8b4pOKwEvaCKBfmjgsi16Hsnj4DM3hE11Iqc5fTyjZNfEjA5lpxJ-CT/exec

**Guardar y sincronizar** almacena la evaluación local y envía su catálogo y sus respuestas dentro del campo `payload_json` a GAS usando `saveBatch`. **Guardar y ver resultados** también intenta enviar a GAS.

El envío puede llegar sin permitir leer su respuesta por **CORS**. En ese caso, la App indica que no puede confirmar el guardado y conserva la copia local; revisar la pestaña `Evaluaciones` de la BD GAS. La recuperación multi-dispositivo también puede bloquearse por CORS. No confundir esa base de datos con el Sheets independiente usado como plantilla de criterios.

No publicar un GAS con datos internos sin autenticación y control de acceso. GitHub Pages es estático y no proporciona identidad por usuario.
