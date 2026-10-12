/* Assessment oficial de Mantenimiento proporcionado el 12/10/2026.
 * Los 29 criterios y cuatro pilares mantienen los textos y elementos indicados por el usuario.
 * La evaluación precargada usa binario: 0=No cumple, 1=Cumple.
 * Se convierte 1 -> 2 en la escala 0/1/2 de la aplicación, sin usar Parcial.
 */
const MAINTENANCE_DEFAULT_CATALOG=[
  [
    "Administración de materiales, activos e inversiones",
    [
      [
        "Mapeo e identificación de activos",
        [
          "¿Se cuenta con un inventario actualizado y completo de los activos de planta, identificados y localizados físicamente?"
        ]
      ],
      [
        "Información de refacciones",
        [
          "¿Se cuenta con un catálogo actualizado de refacciones que incluya códigos, descripciones, especificaciones técnicas, equipos asociados y proveedores?",
          "¿Se mantiene un control confiable de las existencias físicas y registradas de refacciones, incluyendo entradas, salidas y ajustes?"
        ]
      ],
      [
        "Gestión de activos y refacciones",
        [
          "¿Existe un proceso estandarizado para administrar el ciclo de vida de los activos y las refacciones desde su adquisición hasta su baja?"
        ]
      ],
      [
        "Costos por materiales",
        [
          "¿Se conoce y analiza el costo de los materiales y refacciones consumidos por equipo, área, orden de trabajo y tipo de mantenimiento?"
        ]
      ],
      [
        "Gestión de repuestos críticos",
        [
          "¿Se encuentran identificados y clasificados los repuestos críticos considerando su impacto en la continuidad operativa, el tiempo de reposición y el riesgo de falla?"
        ]
      ],
      [
        "Inversiones en activos",
        [
          "¿Las inversiones en equipos, reemplazos y mejoras cuentan con justificación técnica, análisis económico, priorización y seguimiento de beneficios?"
        ]
      ]
    ]
  ],
  [
    "Ejecución del mantenimiento",
    [
      [
        "Estructura de activos",
        [
          "¿La estructura de activos permite relacionar cada equipo con sus componentes, planes de mantenimiento, historial de fallas y órdenes de trabajo?"
        ]
      ],
      [
        "Rutinas de mantenimiento",
        [
          "¿Los equipos cuentan con rutinas de mantenimiento preventivo definidas, documentadas y actualizadas según sus condiciones de operación y recomendaciones técnicas?"
        ]
      ],
      [
        "Cumplimiento de rutinas",
        [
          "¿Se mide y controla el cumplimiento oportuno de las rutinas de mantenimiento preventivo y predictivo programadas?"
        ]
      ],
      [
        "Planificación",
        [
          "¿Las órdenes de trabajo se planifican previamente con alcance, recursos, herramientas, materiales, duración estimada y condiciones de seguridad?"
        ]
      ],
      [
        "Programación",
        [
          "¿Existe un programa semanal de mantenimiento coordinado con producción que establece prioridades, fechas, responsables y ventanas de intervención?"
        ]
      ],
      [
        "Mantenimiento correctivo",
        [
          "¿Existe un proceso estandarizado para registrar, clasificar, priorizar y atender las fallas y solicitudes de mantenimiento correctivo?"
        ]
      ],
      [
        "Atención de emergencias",
        [
          "¿Se han definido criterios de atención y escalamiento para fallas que comprometen la seguridad, la calidad, la inocuidad o la continuidad operativa?"
        ]
      ],
      [
        "Cierre de órdenes de trabajo",
        [
          "¿Las órdenes de trabajo se cierran con información completa sobre actividades realizadas, tiempos, materiales utilizados, causa de falla y condición final del equipo?"
        ]
      ],
      [
        "Seguimiento operativo",
        [
          "¿Se revisan periódicamente los avances del programa, los trabajos pendientes, los incumplimientos y las desviaciones para establecer acciones correctivas?"
        ]
      ],
      [
        "Matriz de habilidades y competencias",
        [
          "¿Se cuenta con una matriz actualizada de habilidades y competencias técnicas por puesto y colaborador, que permita identificar brechas de capacitación?"
        ]
      ],
      [
        "Plan anual de entrenamiento",
        [
          "¿Existe un plan anual de entrenamiento basado en las brechas de competencias, los riesgos operativos, las nuevas tecnologías y las necesidades del mantenimiento?"
        ]
      ],
      [
        "Efectividad del entrenamiento",
        [
          "¿Se verifica que las capacitaciones recibidas se traduzcan en competencias demostrables y en una mejora del desempeño operativo?"
        ]
      ]
    ]
  ],
  [
    "Ingeniería del mantenimiento",
    [
      [
        "Análisis de criticidad",
        [
          "¿Se cuenta con una metodología documentada para evaluar y clasificar la criticidad de los activos según su impacto en seguridad, calidad, inocuidad, ambiente, producción y costos?"
        ]
      ],
      [
        "Análisis de fallas",
        [
          "¿Se realizan análisis de causa raíz de las fallas recurrentes o de alto impacto y se documentan acciones para evitar su repetición?"
        ]
      ],
      [
        "Índice de confiabilidad",
        [
          "¿Se cuenta con indicadores definidos y calculados periódicamente para medir la confiabilidad de los activos, como MTBF (tiempo medio entre fallas) y disponibilidad?"
        ]
      ],
      [
        "Uso de indicadores",
        [
          "¿Se utilizan los indicadores de confiabilidad para identificar equipos problemáticos, priorizar intervenciones y evaluar la efectividad de las acciones implementadas?"
        ]
      ],
      [
        "Planeación de requerimientos de materiales (MRP)",
        [
          "¿Se calculan los requerimientos de refacciones y materiales de mantenimiento con base en los planes de trabajo, las existencias, los consumos históricos y los tiempos de suministro?"
        ]
      ],
      [
        "Integración del MRP",
        [
          "¿Los requerimientos de materiales se integran oportunamente con Compras y Almacenes para asegurar su disponibilidad antes de ejecutar los trabajos programados?"
        ]
      ]
    ]
  ],
  [
    "Costo del mantenimiento",
    [
      [
        "Control presupuestal",
        [
          "¿Se compara periódicamente el gasto real contra el presupuesto, se explican las desviaciones y se establecen acciones correctivas?"
        ]
      ],
      [
        "Costos de mano de obra",
        [
          "¿Se registra y cuantifica el costo de la mano de obra interna y externa utilizada en las actividades de mantenimiento?"
        ]
      ],
      [
        "Costo por activo",
        [
          "¿Se conoce el costo total de mantenimiento por activo o familia de equipos para identificar aquellos que generan mayores gastos?"
        ]
      ],
      [
        "Decisiones basadas en costos",
        [
          "¿Las decisiones de reparar, reemplazar, modificar o continuar operando un activo consideran su costo de ciclo de vida, criticidad y riesgo operativo?"
        ]
      ]
    ]
  ]
];
const MAINTENANCE_BASELINE_SCORES={
  "0-0-0": {
    "value": 0
  },
  "0-1-0": {
    "value": 0
  },
  "0-1-1": {
    "value": 0
  },
  "0-2-0": {
    "value": 0
  },
  "0-3-0": {
    "value": 0
  },
  "0-4-0": {
    "value": 0
  },
  "0-5-0": {
    "value": 0
  },
  "1-0-0": {
    "value": 0
  },
  "1-1-0": {
    "value": 0
  },
  "1-2-0": {
    "value": 0
  },
  "1-3-0": {
    "value": 2
  },
  "1-4-0": {
    "value": 2
  },
  "1-5-0": {
    "value": 2
  },
  "1-6-0": {
    "value": 2
  },
  "1-7-0": {
    "value": 2
  },
  "1-8-0": {
    "value": 2
  },
  "1-9-0": {
    "value": 2
  },
  "1-10-0": {
    "value": 0
  },
  "1-11-0": {
    "value": 0
  },
  "2-0-0": {
    "value": 0
  },
  "2-1-0": {
    "value": 0
  },
  "2-2-0": {
    "value": 0
  },
  "2-3-0": {
    "value": 0
  },
  "2-4-0": {
    "value": 0
  },
  "2-5-0": {
    "value": 0
  },
  "3-0-0": {
    "value": 0
  },
  "3-1-0": {
    "value": 0
  },
  "3-2-0": {
    "value": 0
  },
  "3-3-0": {
    "value": 0
  }
};
