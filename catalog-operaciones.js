/* Fuente: Assessment Gestión Operativa, Excel 27.03.2026, pestaña Assessment. Se reutiliza en Producción y Mantenimiento. */
const OPERATIONS_DEFAULT_CATALOG=[
  [
    "Estabilidad",
    [
      [
        "Estructura de equipos",
        [
          "¿La operación en piso esta organizada en equipos de acuerdo a su naturaleza, alcance y especialidad?",
          "¿Se han definido los roles, funciones y alcances?",
          "¿Se realiza una entrega recepción de turno de manera oportuna?",
          "¿Se cuenta con lista de asistencia?",
          "¿Se realizan las juntas de arranque de turno?",
          "¿Se dispone de un lay out de la planta y sus áreas?",
          "¿Se utilizan tableros visuales en la operación?",
          "¿Se solucionan las anormalidades de manera sistemática?",
          "¿Se realiza la detección y análisis de anormalidades recurrentes?",
          "¿Se encuentran los indicadores operacionales del equipo de operación dentro del objetivo planeado?",
          "¿Se tiene un mecanismo o sistema para escalonamiento de anormalidades?",
          "¿Se cuenta con un equipo de respuesta rápida que atienda las anormalidades y recurrencias?",
          "¿Se cuenta con sistemas Andon para el llamado y atención a anormalidades?",
          "¿Están los puntos de control y mecanismos de coordinación de piso definidos y se respetan?"
        ]
      ],
      [
        "Trabajo estandarizado",
        [
          "¿Existen análisis seguro de trabajo?",
          "¿Se cumple con el uso de equipo de protección personal?",
          "¿Existen procedimientos operativos estándar y se encuentran disponibles en el punto de uso (binder) ?",
          "¿Se capacita al personal en los estándares?",
          "¿El personal sigue consistentemente los estándares?",
          "¿Los estándares se actualizan regularmente?",
          "¿Se realiza el monitoreo del desarrollo del turno mediante reportes de supervisión?",
          "¿Existen dispositivos visuales y auditivos para facilitar el proceso?",
          "¿Se utiliza la metodología de trabajo estadandarizado (SW) y el pesonal lo utiliza?",
          "¿Se cuenta con planes de control de proceso, control estadístico, AMEF, y siminalres?",
          "¿Se cuenta con procedimientos para el mantenimiento autónimo de equipos?",
          "¿El material en la planta está perfectamente identificado y las áreas delimitadas de acuerdo a su estatus?"
        ]
      ],
      [
        "5S",
        [
          "¿Existe entrenamiento y conocimiento en la metodología 5S?",
          "¿Se realizan auditorías?",
          "¿Están implementadas las primeras 3'S?",
          "¿Existe recoconocimiento a la implementación de 5'S?",
          "¿Las 5S son parte de la rutina diaria?",
          "¿Se utilizan códigos de colores o señales visuales para detectar anormalidades a simple vista?",
          "¿Las 5S se aplican para identificar anormalidades en seguridad, calidad, y productiviad?"
        ]
      ]
    ]
  ],
  [
    "Mejora de procesos",
    [
      [
        "Indicadores",
        [
          "¿Cuenta con los indicadores clave de cada proceso definidos?",
          "¿Se realiza el registro y seguimiento de los indicadores clave de operación?",
          "¿Se analiza la tendencia y variación de los indicadores frente al objetivo?",
          "¿Se toman acciones y/o actualizan estándares a partir del análisis?",
          "¿Los indicadores claves de desempeño estan alineados al objetivo del negocio?",
          "¿Se cuenta con herramientas de seguimiento y análisis de indicadores tipo 4MB / FMDS/ o similares?",
          "¿Existe conexión y alineación entre los indicadores estratégicos, tácticos y operativos?"
        ]
      ],
      [
        "Solución de problemas",
        [
          "¿Se solucionan los problemas derivado de las variaciones de los objetivos estratégicos?",
          "¿Existe conexión del coordinador de operaciones y el equipo de especialidad para solución de problemas recurrentes y/o crónicos?",
          "¿Se utilizan metodologías para el análisis de causa raíz y solución de problemas?",
          "¿Se aplican contramedidas efectivas?",
          "¿Se cuenta con un programa, foros o certrificación en metodología de PS?"
        ]
      ],
      [
        "Escalonamiento e interacciones",
        [
          "¿Se cuenta con programa establecido de interacciones (puntos de control) para especialistas, mandos intermedios, jefaturas y gerencias?",
          "¿Se cumple con el programa de interacciones (puntos de control) paa especuialistas, mandos intermedios, jefaturas y gerencias?",
          "¿Se cuenta con un procedimiento para el escalonamiemnto de problemas?",
          "¿Existe conexión y alineación con todas las áreas locales y centrales?",
          "¿Se cuenta con un programa de recorridos calendarizado?"
        ]
      ],
      [
        "Gestión visual",
        [
          "¿Existen tableros de indicadores clave visibles y actualizados?",
          "¿El estado de la producción es visible en tiempo real?",
          "¿Se utilizan señales visuales para facilitar el control de procesos, tiempos de ciclo, paros de máquina, etc?",
          "¿Se cuenta con un espacio físico para sesiones estrategicas?",
          "¿Se difunden objetivos, pronunciamientos y proyectos estratégicos del negocio?",
          "¿Se han documentado los procesos clave mediante mapas de flujo de valor y se utilizan para generar proyectos de mejora?",
          "¿Se realizan sesiones del equipo estrategico con gerencia para revisión de indicadores operativos alineados al plan estratégico?"
        ]
      ],
      [
        "Mejora continua",
        [
          "¿Existen mecanismo de registro y documentación de sugerencias y/o proyectos de mejora?",
          "¿Los colaboradores participan en propuestas de mejora?",
          "¿Se realizan foros de mejora regularmente?",
          "¿Se documentan y estandarizan las mejoras?",
          "¿Se mide el impacto de las mejoras implementadas?",
          "¿Se documentan y comparten lecciones aprendidas de buenas prácticas operativas con impacto transversal divisional?",
          "¿Se tiene una cultura de identificación y eliminación de despedicios, a través de ejecutar de talleres de mejora (WS) utilizando herramientas Lean?",
          "¿Se tiene implementado y se mide el nivel de madurez de un modelo para Seguridad Industrial?",
          "¿Se tiene implementado y se mide el nivel de madurez de un modelo para Calidad de producto y proceso?",
          "¿Se tiene implementado y se mide el nivel de madurez de un modelo para Mantenimiento?",
          "¿Se tiene implementado y se mide el nivel de madurez de un modelo para Eficiencia de Procesos (eq. Lean Mfg)?",
          "¿Se tiene implementado y se mide el nivel de madurez de un modelo para Logística y control de Materiales?",
          "¿Se tiene implementado y se mide el nivel de madurez de un modelo para Desarrollo Humano?"
        ]
      ],
      [
        "Cultura y liderazgo",
        [
          "¿La organización cuenta con una misión, visión y valores formalmente definidos y documentados?",
          "¿Se cuenta con un plan estratégico y/o mapa de ruta de corto, mediano y lago plazo, está difundido y cuenta con planes de acción claros?",
          "¿Estos elementos están actualizados y alineados con la estrategia actual?",
          "¿Los líderes refuerzan activamente la filosofía en su comunicación diaria?",
          "¿Los equipos utilizan los valores como criterio para tomar decisiones?",
          "¿Se gestionan las desviaciones culturales (ej. conductas no alineadas)?",
          "¿Existe un Reglamento Interior de trabajo?",
          "¿Se aplican sanciones por el incumplimiento del reglamento interior de trabajo?",
          "¿Se entienden, comunican y fomentan los comportamientos del personal alineados a los principios y valores de la empresa?",
          "¿Se cuenta con espacios dedicados a las revisión, despliegue y reforzamiento de cultura (Sala de estrategia, Sección, FDMS, etc)"
        ]
      ]
    ]
  ]
];
const OPERATIONAL_AREAS=["Producción","Mantenimiento"];
