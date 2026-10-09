# Assessment de Madurez y Sostenibilidad del Forecast

App web para Grupo Oleolab: **4 pilares · 16 elementos · 64 criterios**.

## Uso

Abrir `index.html` o habilitar **GitHub Pages** desde Settings → Pages → Deploy from a branch → `main` / `/ (root)`.

- Capturar periodo, área, responsable, fecha y cumplimiento real del Forecast.
- Calificar cada criterio: **No cumple (0)**, **Parcial (1)**, **Cumple (2)**, o **Sin evaluar**.
- Radar de madurez por pilar; barras horizontales por elemento; tabla editable con evidencia, observaciones y acciones.
- Crear múltiples evaluaciones, recuperarlas desde el historial, descargar **CSV** consolidado (una fila por criterio y evaluación) y respaldar/importar **JSON**.
- Sin GAS, los datos quedan en `localStorage` de ese navegador: no es almacenamiento central ni multiusuario.

## Backend Google Apps Script + Google Sheets

1. Abrir la hoja ya creada: **[BD_Assessment_Forecast_Oleolab](https://docs.google.com/spreadsheets/d/1D3iD-qN8fxdMUd7SO60GPexmFecUHXLy3p-C4GvTlZA/edit)** (pestaña `Evaluaciones`, encabezados listos).
2. En el Sheets, abrir **Extensiones → Apps Script** y pegar completo `gas/Code.gs` en `Código.gs` (reemplazar el contenido inicial), luego guardar. **La ID ya está escrita en el código; no hay que configurar propiedades.**
3. **Implementar → Nueva implementación → Aplicación web**; ejecutar como la cuenta propietaria y escoger acceso compatible con los usuarios autorizados según la configuración de Workspace; conceder permisos.
4. Copiar la URL que termina en `/exec` y pegarla en la configuración de la app. Probar **Sincronizar con GAS** o **Recuperar del GAS**.

### Consideraciones importantes

- **Google Sheets está creado y preconfigurado y su ID está integrada en Code.gs**, pero el backend todavía no está desplegado. La autorización de Google, la URL final y la configuración de permisos requieren acciones del propietario.
- Apps Script puede presentar restricciones **CORS/redirecciones en navegadores** al consumir el servicio desde GitHub Pages. Si falla la conexión, utilizar un proxy/API autorizado o alojar la interfaz mediante HTML Service de Apps Script; no considerar sincronizada ninguna evaluación hasta recibir confirmación `ok:true`.
- Una web app GAS expuesta a **Cualquiera** sin autenticación adicional permite leer y modificar registros. No usar acceso público para datos internos de producción.
- La sincronización actual es **por lote e ID** (última escritura prevalece); no resuelve conflictos concurrentes de varios evaluadores. Se recomienda usarla inicialmente con un solo responsable de consolidación.
- No incluye gestión de cuentas/roles; no sustituye una revisión de seguridad para uso organizacional.

## Cálculo

Criterio evaluado: 0 / 1 / 2. Elemento = suma de puntos dividida entre 2×cantidad evaluada; pilar = mismo cálculo; total = mismo cálculo para todos los criterios evaluados. Sin evaluar se excluye; el dashboard muestra el número evaluado. Madurez 0–25 Inicial, >25–50 Básico, >50–75 Estandarizado, >75–90 Controlado, >90 Sostenible. El cumplimiento real del Forecast se muestra por separado.

## Datos

La exportación CSV contiene todas las evaluaciones guardadas localmente y la actual, con identificación, pilar, elemento, criterio, calificación, evidencia, observaciones y acción. JSON respalda el objeto completo.
## URL de implementación proporcionada

- GAS: https://script.google.com/macros/s/AKfycbySBlGPjgi5f8b4pOKwEvaCKBfmjgsi16Hsnj4DM3hE11Iqc5fTyjZNfEjA5lpxJ-CT/exec
- El frontend ya incorpora esta URL por defecto y el botón **Guardar y sincronizar** conserva copia en el navegador.
- Verifica la comunicación abriendo `https://script.google.com/macros/s/AKfycbySBlGPjgi5f8b4pOKwEvaCKBfmjgsi16Hsnj4DM3hE11Iqc5fTyjZNfEjA5lpxJ-CT/exec?action=health` en una pestaña y después registrando una evaluación de prueba desde GitHub Pages. El resultado debe quedar en la hoja `Evaluaciones`.
- Si el navegador bloquea la respuesta por CORS, el frontend informa que **no puede confirmar** la recepción; consultar la hoja directamente. Las evaluaciones permanecen en el almacenamiento local y se pueden exportar como JSON o CSV.
- Para descargar todas las evaluaciones desde distintos dispositivos a la App, la lectura cross-origin puede requerir una arquitectura autenticada adicional. No publicar JSONP con datos internos.
