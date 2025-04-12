const acortarTexto = (texto, max = 300) => {
  if (!texto) return ''; // Validación para valores undefined/null
  return texto.length > max ? `${texto.substring(0, max)}...` : texto;
};

const crearLista = (items) => `
  <ul class="list-disc pl-6 mb-4 space-y-2">
    ${items.map(item => `<li class="text-gray-700">${item}</li>`).join('')}
  </ul>
`;

const Componentes = {
  tarjetaInvestigacion: ({ imagen, titulo, contenido, id }) => `
    <article class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
      <div class="relative h-48 overflow-hidden">
        <img src="${imagen}" alt="${titulo}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">${titulo}</h3>
        <p class="text-gray-600 mb-4">${acortarTexto(contenido || '')}</p> <!-- Aquí la validación -->
        <a href="detalle.html?id=${id}" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
          Ver análisis completo →
        </a>
      </div>
    </article>
  `,

  seccionTitulo: (titulo) => `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
      ${titulo}
    </h2>
  `,

  timelineDetallado: (items) => `
    <div class="relative pl-8 border-l-2 border-blue-200 space-y-8">
      ${items.map(item => `
        <div class="relative">
          <div class="absolute w-4 h-4 bg-blue-500 rounded-full -left-[25px] top-1"></div>
          <h3 class="font-semibold text-gray-800">${item.nombre}</h3>
          ${item.duracion ? `<p class="text-sm text-gray-500">Duración: ${item.duracion}</p>` : ''}
          ${item.actividades ? crearLista(item.actividades) : ''}
        </div>
      `).join('')}
    </div>
  `,

  tablaRiesgos: (items) => `
    <div class="rounded-lg border border-gray-200 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">Riesgo</th>
            <th class="p-3 text-center">Probabilidad</th>
            <th class="p-3 text-center">Impacto</th>
            <th class="p-3 text-right">Mitigación</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr class="border-t border-gray-100 hover:bg-gray-50">
              <td class="p-3">${item.riesgo}</td>
              <td class="p-3 text-center">${item.probabilidad}</td>
              <td class="p-3 text-center">${item.impacto}</td>
              <td class="p-3 text-right">${item.mitigacion}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `,

  tarjetaMetricas: (titulo, items) => `
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="font-semibold mb-2">${titulo}</h3>
      ${crearLista(items)}
    </div>
  `,

  listaOrdenada: (items) => `
    <ol class="list-decimal pl-6 space-y-2">
      ${items.map(item => `<li class="text-gray-700">${item}</li>`).join('')}
    </ol>
  `
};