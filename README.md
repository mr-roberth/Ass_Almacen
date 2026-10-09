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

1. Crear una hoja de cálculo nueva para los assessments.
2. Abrir **Extensiones → Apps Script** y pegar el contenido de `gas/Code.gs`.
3. En Apps Script, ir a **Configuración del proyecto → Propiedades de secuencia de comandos** y crear `SPREADSHEET_ID` con el ID de la hoja.
4. **Implementar → Nueva implementación → Aplicación web**, ejecutar como la cuenta propietaria y escoger acceso **solo a los usuarios autorizados** según la configuración de Workspace; conceder permisos.
5. Copiar la URL que termina en `/exec` y pegarla en la configuración de la app, luego seleccionar **Sincronizar con GAS** o **Recuperar del GAS**.

### Consideraciones importantes

- **El backend está incluido como código fuente, pero no está desplegado automáticamente.** La autorización de Google, la URL final y la configuración de permisos requieren acciones del propietario.
- Apps Script puede presentar restricciones **CORS/redirecciones en navegadores** al consumir el servicio desde GitHub Pages. Si falla la conexión, utilizar un proxy/API autorizado o alojar la interfaz mediante HTML Service de Apps Script; no considerar sincronizada ninguna evaluación hasta recibir confirmación `ok:true`.
- Una web app GAS expuesta a **Cualquiera** sin autenticación adicional permite leer y modificar registros. No usar acceso público para datos internos de producción.
- La sincronización actual es **por lote e ID** (última escritura prevalece); no resuelve conflictos concurrentes de varios evaluadores. Se recomienda usarla inicialmente con un solo responsable de consolidación.
- No incluye gestión de cuentas/roles; no sustituye una revisión de seguridad para uso organizacional.

## Cálculo

Criterio evaluado: 0 / 1 / 2. Elemento = suma de puntos dividida entre 2×cantidad evaluada; pilar = mismo cálculo; total = mismo cálculo para todos los criterios evaluados. Sin evaluar se excluye; el dashboard muestra el número evaluado. Madurez 0–25 Inicial, >25–50 Básico, >50–75 Estandarizado, >75–90 Controlado, >90 Sostenible. El cumplimiento real del Forecast se muestra por separado.

## Datos

La exportación CSV contiene todas las evaluaciones guardadas localmente y la actual, con identificación, pilar, elemento, criterio, calificación, evidencia, observaciones y acción. JSON respalda el objeto completo.