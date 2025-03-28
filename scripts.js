const tecnicasDB = [
  {
    id: 1,
    titulo: "Sistema Básico de Gestión de Deudas",
    contenido: "Solución en C++ para registro manual de deudas en moneda local y dólares...",
    contenidoCompleto: [
      {
        tipo: "fundamentos",
        datos: {
          titulo: "Básicos del Sistema",
          texto: "Registro manual de deudas con conversión diaria según tasa ingresada por el usuario.",
          principios: [
            "Funcionamiento en Windows 7 sin requerimientos especiales",
            "Doble registro en Bs. y USD",
            "Almacenamiento en archivos de texto plano",
            "Interfaz de consola simple"
          ]
        }
      },
      {
        tipo: "marcoTrabajo",
        datos: {
          titulo: "Proceso de Desarrollo",
          fases: [
            {
              nombre: "Configuración del Entorno",
              duracion: "1 semana",
              actividades: [
                "Creación de VM con Windows 7 para pruebas",
                "Configuración básica de Code::Blocks",
                "Primeras reuniones con la dueña"
              ]
            },
            {
              nombre: "Desarrollo Esencial",
              duracion: "4 semanas",
              actividades: [
                "Menú principal con opciones básicas",
                "Sistema de registro manual de deudas",
                "Visualización de totales por moneda"
              ]
            }
          ]
        }
      },
      {
        tipo: "minutograma",
        datos: {
          titulo: "Cronograma Real",
          actividades: [
            "Semana 1: Reuniones para entender libretas físicas",
            "Semana 2-3: Desarrollo núcleo del sistema (1,250 LDC)",
            "Semana 4: Pruebas en VM y ajustes finales"
          ],
          metricas: [
            "Líneas de código: 1,302",
            "Archivos de datos: 2 (.txt y .dat)",
            "Errores críticos solucionados: 11",
            "Tiempo carga promedio: Instantáneo"
          ],
          detallesClave: [
            "Reto principal: Adaptar procesos manuales a digital",
            "Solución clave: Formato de registro simple",
            "Herramientas: Code::Blocks y Bloc de Notas"
          ]
        }
      },
      {
        tipo: "gestionRiesgos",
        datos: {
          titulo: "Desafíos Enfrentados",
          matriz: [
            {
              riesgo: "Errores en entrada manual de datos",
              probabilidad: "Alta",
              impacto: "Medio",
              mitigacion: "Validaciones básicas de formato"
            },
            {
              riesgo: "Confusión monedas",
              probabilidad: "Media",
              impacto: "Alto",
              mitigacion: "Columnas separadas y totales claros"
            }
          ]
        }
      },
      {
        tipo: "procesoCompleto",
        datos: {
          titulo: "Flujo de Trabajo Real",
          etapas: [
            {
              nombre: "1. Captura de Requisitos",
              duracion: "5 días",
              actividades: [
                "Fotocopiado de hojas físicas de registro",
                "Listado de campos esenciales",
                "Definición de formato de archivo"
              ]
            },
            {
              nombre: "2. Programación Básica",
              duracion: "15 días",
              actividades: [
                "Menú principal con switch-case",
                "Función de agregar deuda",
                "Visualización de listado completo"
              ]
            }
          ]
        }
      },
      {
        tipo: "mejoresPracticas",
        datos: {
          titulo: "Aprendizajes Obtenidos",
          lista: [
            "Importancia de backups diarios",
            "Validación de entradas numéricas",
            "Documentación en comentarios"
          ],
          metricas: [
            "Tiempo registro por cliente: reducido de 5min a 30seg",
            "Errores de cálculo: reducidos 95%"
          ]
        }
      },
      {
        tipo: "casoExito",
        datos: {
          titulo: "Implementación Exitosa",
          empresa: "Pequeño Comercio Local",
          resultados: [
            "Organización completa de 287 deudas históricas",
            "Visualización clara de deudas en ambas monedas",
            "Cierre contable mensual simplificado"
          ],
          tecnologias: ["C++ estándar", "Windows 7 básico"]
        }
      }
    ],
    imagen: "./R.png"
  }
];

// Funciones mejoradas
const acortarTexto = (texto, max = 300) => texto.length > max ? `${texto.slice(0, max)}...` : texto;

const crearLista = (items) => `
  <ul role="list" class="list-[square] pl-6 mb-4 space-y-3">
    ${items.map(i => `<li class="text-gray-700 leading-relaxed">${i}</li>`).join('')}
  </ul>
`;

// Componentes actualizados
const Componentes = {
  tarjeta: ({ imagen, titulo, contenido, id }) => `
  <article class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-1">
      <div class="relative h-48 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-t from-[var(--primary)/40] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img src="${imagen}" alt="${titulo}" 
              class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-6 relative z-20">
          <h3 class="text-xl font-semibold text-slate-800 mb-3 group-hover:text-[var(--primary)] transition-colors">${titulo}</h3>
          <p class="text-slate-600 mb-4 line-clamp-3">${contenido}</p>
          <a href="detalle.html?id=${id}" 
              class="inline-flex items-center text-[var(--primary)] hover:text-[var(--secondary)] font-medium transition-colors">
              Ver análisis
              <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
          </a>
      </div>
  </article>
`,


  timeline: items => `
    <div class="relative pl-8 border-l-4 border-emerald-200 space-y-8">
      ${items.map((item, index) => `
        <div class="relative">
          <div class="absolute w-6 h-6 bg-emerald-500 rounded-full -left-[30px] top-1 flex items-center justify-center text-white text-sm">${index + 1}</div>
          <div class="bg-emerald-50 p-4 rounded-lg">${item}</div>
        </div>
      `).join('')}
    </div>
  `,

  tablaRiesgos: items => `
    <div class="rounded-xl border border-emerald-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[600px]">
          <thead class="bg-emerald-600 text-white">
            <tr>
              <th class="p-4 text-left w-[35%]">Riesgo</th>
              <th class="p-4 text-center w-[15%]">Probabilidad</th>
              <th class="p-4 text-center w-[15%]">Impacto</th>
              <th class="p-4 text-right w-[35%]">Mitigación</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr class="border-t border-emerald-100 hover:bg-emerald-50">
                <td class="p-4">${item.riesgo}</td>
                <td class="p-4 text-center">${item.probabilidad}</td>
                <td class="p-4 text-center">${item.impacto}</td>
                <td class="p-4 text-right">${item.mitigacion}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `
};

// Sistema de caching
if (!localStorage.getItem('tecnicasDB')) {
  localStorage.setItem('tecnicasDB', JSON.stringify(tecnicasDB));
}

// Precarga de imágenes
const precargarImagenes = () => {
  tecnicasDB.forEach(item => {
    const img = new Image();
    img.src = item.imagen;
  });
};

// Lógica principal
window.addEventListener('DOMContentLoaded', () => {
  precargarImagenes();
  
  if (document.getElementById('contenedor-investigaciones')) {
    const contenedor = document.getElementById('contenedor-investigaciones');
    contenedor.innerHTML = tecnicasDB.map(investigacion => 
      Componentes.tarjeta({ 
        ...investigacion,
        contenido: acortarTexto(investigacion.contenido)
      })
    ).join('');
  }

  if (document.getElementById('detalle-investigacion')) {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id')) || null;
    const investigacion = tecnicasDB.find(item => item.id === id);

    const renderizarContenido = (contenido) => contenido.map(item => {
      switch(item.tipo) {
        case 'fundamentos':
          return `
            <section class="space-y-6">
              <h2 class="text-3xl font-serif text-emerald-800">${item.datos.titulo}</h2>
              <p class="text-lg text-gray-600 leading-relaxed">${item.datos.texto}</p>
              ${crearLista(item.datos.principios)}
            </section>
          `;

        case 'marcoTrabajo':
          return `
            <section class="space-y-6">
              <h2 class="text-3xl font-serif text-emerald-800">${item.datos.titulo}</h2>
              ${item.datos.fases.map(fase => `
                <div class="bg-emerald-50 p-6 rounded-xl mb-6">
                  <h3 class="text-xl font-semibold mb-4">${fase.nombre}</h3>
                  <p class="text-sm text-emerald-600 mb-2">Duración: ${fase.duracion}</p>
                  ${crearLista(fase.actividades)}
                </div>
              `).join('')}
            </section>
          `;

        case 'minutograma':
          return `
            <section class="space-y-6">
              <h2 class="text-3xl font-serif text-emerald-800">${item.datos.titulo}</h2>
              ${Componentes.timeline(item.datos.actividades)}
              <div class="bg-emerald-50 p-6 rounded-xl">
                <h3 class="text-lg font-semibold mb-3">Métricas clave:</h3>
                ${crearLista(item.datos.metricas)}
                ${item.datos.detallesClave ? `
                  <h3 class="text-lg font-semibold mt-4 mb-3">Detalles clave:</h3>
                  ${crearLista(item.datos.detallesClave)}
                ` : ''}
              </div>
            </section>
          `;

        case 'gestionRiesgos':
          return `
            <section class="space-y-6">
              <h2 class="text-3xl font-serif text-emerald-800">${item.datos.titulo}</h2>
              ${Componentes.tablaRiesgos(item.datos.matriz)}
            </section>
          `;

        case 'procesoCompleto':
          return `
            <section class="space-y-6">
              <h2 class="text-3xl font-serif text-emerald-800">${item.datos.titulo}</h2>
              ${item.datos.etapas.map(etapa => `
                <div class="bg-emerald-50 p-6 rounded-xl mb-6">
                  <h3 class="text-xl font-semibold mb-4">${etapa.nombre}</h3>
                  <p class="text-sm text-emerald-600 mb-2">Duración: ${etapa.duracion}</p>
                  ${crearLista(etapa.actividades)}
                </div>
              `).join('')}
            </section>
          `;

        case 'mejoresPracticas':
          return `
            <section class="space-y-6">
              <h2 class="text-3xl font-serif text-emerald-800">${item.datos.titulo}</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-emerald-50 p-6 rounded-xl">
                  <h3 class="text-lg font-semibold mb-3">Recomendaciones:</h3>
                  ${crearLista(item.datos.lista)}
                </div>
                <div class="bg-emerald-50 p-6 rounded-xl">
                  <h3 class="text-lg font-semibold mb-3">Métricas esperadas:</h3>
                  ${crearLista(item.datos.metricas)}
                </div>
              </div>
            </section>
          `;

        case 'casoExito':
          return `
            <section class="space-y-6">
              <h2 class="text-3xl font-serif text-emerald-800">${item.datos.titulo}</h2>
              <div class="bg-emerald-50 p-6 rounded-xl space-y-4">
                <div class="flex items-center space-x-4">
                  <span class="text-lg font-semibold">Empresa:</span>
                  <span class="text-emerald-700">${item.datos.empresa}</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2">Resultados:</h3>
                  ${crearLista(item.datos.resultados)}
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2">Tecnologías utilizadas:</h3>
                  <div class="flex flex-wrap gap-2">
                    ${item.datos.tecnologias.map(t => `
                      <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        ${t}
                      </span>
                    `).join('')}
                  </div>
                </div>
              </div>
            </section>
          `;

        default:
          return `<pre class="bg-red-50 p-4 rounded">${JSON.stringify(item, null, 2)}</pre>`;
      }
    }).join('');

    const detalleContainer = document.getElementById('detalle-investigacion');
    
    if (investigacion) {
      detalleContainer.innerHTML = `
        <article class="space-y-12">
          <header class="space-y-8">
            <img src="${investigacion.imagen}" alt="${investigacion.titulo}" 
                 class="w-full h-96 object-contain mx-auto rounded-xl shadow-lg">
            <h1 class="text-4xl font-serif text-emerald-800">${investigacion.titulo}</h1>
          </header>
          <div class="space-y-12">
            ${renderizarContenido(investigacion.contenidoCompleto)}
          </div>
        </article>
      `;
    } else {
      detalleContainer.innerHTML = `
        <div class="text-center py-20 space-y-4">
          <h2 class="text-2xl text-red-600 font-semibold">Contenido no encontrado</h2>
          <a href="index.html" class="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Volver al inicio
          </a>
        </div>
      `;
    }
  }
});