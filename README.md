# Assessment de Madurez · Oleolab

Aplicación de evaluación de la práctica de cumplimiento del Forecast vinculada a Almacén y Planeación, con el diseño visual de Oleolab.

**App:** https://mr-roberth.github.io/Ass_Almacen/

## Dinámica simplificada (basada en CI4KASH_ASSMT)

- Tres pestañas: **Nueva evaluación**, **Evaluaciones** y **Dashboard**.
- Cuestionario guiado: 4 pilares, 16 elementos y 64 criterios, uno por uno con respuestas **Cumple (2), Parcial (1), No cumple (0)** y evidencia/observación/acción opcionales.
- Selección entre evaluaciones y resumen ejecutivo con radar por pilar y barras horizontales por elemento.
- **Exportación PNG individual** de cada gráfica, **informe PDF** con resumen, gráficas y detalle de todos los criterios; CSV consolidado y respaldo JSON.
- Se reutiliza el logo Oleolab que se encuentra en `mr-roberth/Pruebas/assets/oleolab-logo.png`, no uno redibujado.
- El catálogo de criterios y los ID de respuesta originales de la app se conservan. La información guardada con versiones anteriores en este navegador no se elimina.

## Almacenamiento y conexión

- Google Sheets: https://docs.google.com/spreadsheets/d/1D3iD-qN8fxdMUd7SO60GPexmFecUHXLy3p-C4GvTlZA/edit
- Código backend: `gas/Code.gs`
- GAS desplegado: https://script.google.com/macros/s/AKfycbySBlGPjgi5f8b4pOKwEvaCKBfmjgsi16Hsnj4DM3hE11Iqc5fTyjZNfEjA5lpxJ-CT/exec

El botón **Guardar evaluación** registra localmente y envía al GAS. Debido a restricciones CORS de Apps Script desde GitHub Pages, un envío `no-cors` **no confirma recepción** aunque pueda llegar a Sheets. Verifica la pestaña `Evaluaciones`. La recuperación desde GAS puede fallar por la misma razón. Se necesita una integración autenticada sin CORS para lecturas multi-dispositivo confiables; no exponemos los datos mediante JSONP público.

## Calificación

Para los criterios evaluados: 0 = No cumple, 1 = Parcial y 2 = Cumple. Los no evaluados se excluyen temporalmente del promedio. **Pilar, elemento y madurez global** se calculan como puntos obtenidos divididos entre dos veces el número de criterios evaluados, por 100. Los niveles son Inicial (0–25), Básico (>25–50), Estandarizado (>50–75), Controlado (>75–90), Sostenible (>90–100). El cumplimiento real del Forecast es una métrica independiente.

## Seguridad

El repositorio estático de GitHub Pages no proporciona autenticación de usuario. **No publicar el despliegue GAS con acceso público sin controles adicionales si los datos son internos.** Los datos descargados deben protegerse conforme a las políticas de la organización.

