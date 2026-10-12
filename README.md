# Assessment de madurez · Oleolab

**App publicada:** https://mr-roberth.github.io/Ass_Almacen/

Herramienta de evaluación por áreas de Grupo Oleolab, con captura guiada, resultados de madurez del **nivel 1 al 5**, gráficos por criterio, PDF y sincronización de evaluaciones con GAS.

## Áreas y fuentes de criterios

| Área | Pilares | Elementos | Criterios | Fuente |
|---|---:|---:|---:|---|
| **Almacén** | 4 | 8 | 29 | [Assessment y Dashboard Monitor de Insumos Críticos](https://docs.google.com/spreadsheets/d/1yGLqGgycMCsg8wpoVaYLzkgkw-bh6KHBZCZFGKlo0lA/edit), hoja CRITERIOS |
| **Producción** | 2 | 9 | 80 | Archivo proporcionado **27.03.2026 Assessment Gestión Operativa**, hoja Assessment |
| **Mantenimiento** | 2 | 9 | 80 | El mismo cuestionario de Gestión Operativa |

Los pilares originales para Producción y Mantenimiento son **Estabilidad** y **Mejora de procesos**. Los nueve elementos son **Estructura de equipos**, **Trabajo estandarizado**, **5S**, **Indicadores**, **Solución de problemas**, **Escalonamiento e interacciones**, **Gestión visual**, **Mejora continua** y **Cultura y liderazgo**. Se mantienen los 80 textos de origen, incluidos términos técnicos, en el catálogo oficial.

### Calificación y madurez

- **No cumple (0)**, **Parcial (1)**, **Cumple (2)**.
- Madurez % = puntos obtenidos / (2 × criterios respondidos) × 100.
- Nivel 1: Inicial (0 a 25 %).
- Nivel 2: Básico (más de 25 y hasta 50 %).
- Nivel 3: Estandarizado (más de 50 y hasta 75 %).
- Nivel 4: Controlado (más de 75 y hasta 90 %).
- Nivel 5: Sostenible (más de 90 y hasta 100 %).
- Los criterios sin respuesta no se cuentan en el promedio y el Dashboard indica cuando el assessment está incompleto.

### Gráficos, descargas y editor

El Dashboard muestra la madurez por pilar y las barras horizontales apiladas por elemento con **número de criterios que Cumplen, Cumplen parcialmente y No cumplen**, diferenciados por color, junto con su leyenda y cifras en cada barra cuando hay espacio. Producción y Mantenimiento utilizan un gráfico de dos pilares en lugar de radar, para evitar un radar poco informativo; Almacén conserva el radar de cuatro pilares. Se mantienen descargas PNG, PDF y CSV.

La pestaña **Preguntas** permite elegir área, modificar texto y evidencias, agregar/eliminar preguntas o elementos, restaurar el catálogo oficial correspondiente y exportar/importar JSON. El catálogo se guarda por área y por dispositivo, **no se sincroniza entre dispositivos**. Cada evaluación contiene su propia copia de criterios para que cambios posteriores no alteren la evaluación histórica (incluidos cuestionarios de 24 y 64 criterios de versiones previas).

### Conexión GAS

Se conserva `gas/Code.gs` y el backend desplegado anteriormente. No se requieren cambios de estructura al guardar porque el área y el catálogo viajan dentro de `payload_json`.

- Base de datos de evaluaciones: https://docs.google.com/spreadsheets/d/1D3iD-qN8fxdMUd7SO60GPexmFecUHXLy3p-C4GvTlZA/edit
- Endpoint: https://script.google.com/macros/s/AKfycbySBlGPjgi5f8b4pOKwEvaCKBfmjgsi16Hsnj4DM3hE11Iqc5fTyjZNfEjA5lpxJ-CT/exec

**Limitación existente:** GitHub Pages y GAS pueden activar restricciones CORS. La App mantiene copia local y trata de enviar a GAS, pero algunos navegadores no permiten confirmar recepción ni listar registros; verificar la hoja `Evaluaciones` en la base. No exponer el backend con datos privados sin autenticación.
