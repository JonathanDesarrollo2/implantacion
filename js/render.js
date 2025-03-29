class RenderManager {
  constructor() {
    this.investigaciones = [];
    this.init();
  }

  async init() {
    await this.cargarDatos();
    this.renderizarVista();
  }

  async cargarDatos() {
    try {
      const response = await fetch('investigaciones.json');
      if (!response.ok) throw new Error('Error HTTP: ' + response.status);
      
      const data = await response.json();
      this.investigaciones = data.investigaciones;
    } catch (error) {
      console.error('Error cargando datos:', error);
      this.mostrarErrorCarga();
    }
  }

  renderizarContenido(contenidoCompleto) {
    return contenidoCompleto.map(seccion => {
      switch(seccion.tipo) {
        case 'fundamentos': return this.renderFundamentos(seccion.datos);
        case 'marcoTrabajo': return this.renderMarcoTrabajo(seccion.datos);
        case 'minutograma': return this.renderMinutograma(seccion.datos);
        case 'gestionRiesgos': return this.renderGestionRiesgos(seccion.datos);
        case 'procesoCompleto': return this.renderProcesoCompleto(seccion.datos);
        case 'mejoresPracticas': return this.renderMejoresPracticas(seccion.datos);
        case 'casoExito': return this.renderCasoExito(seccion.datos);
        case 'kanban': return this.renderKanban(seccion.datos);
        case 'database': return this.renderDatabase(seccion.datos);
        case 'implementacion': return this.renderImplementacion(seccion.datos);
        case 'conceptos': return this.renderConceptos(seccion.datos);
        case 'metodos': return this.renderMetodos(seccion.datos);
        case 'gallery': return this.renderGallery(seccion.datos);
        case 'conceptosBD': return this.renderConceptosBD(seccion.datos);
        case 'conceptosImplantacion': return this.renderConceptosImplantacion(seccion.datos);
        case 'ejemplosKanban': return this.renderEjemplosKanban(seccion.datos);
        default: return this.renderComponenteNoReconocido(seccion);
      }
    }).join('');
  }

  // Métodos de renderizado principales
  renderFundamentos(data) {
    return `
      <section class="space-y-6">
        ${Componentes.seccionTitulo(data.titulo)}
        <p class="text-gray-600">${data.texto}</p>
        ${Componentes.listaOrdenada(data.principios)}
      </section>
    `;
  }

  renderMarcoTrabajo(data) {
    return `
      <section class="space-y-6">
        ${Componentes.seccionTitulo(data.titulo)}
        ${Componentes.timelineDetallado(data.fases)}
      </section>
    `;
  }

  renderMinutograma(data) {
    return `
      <section class="space-y-6">
        ${Componentes.seccionTitulo(data.titulo)}
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-semibold">Actividades Clave</h3>
            ${Componentes.listaOrdenada(data.actividades)}
          </div>
          <div class="space-y-4">
            ${Componentes.tarjetaMetricas("Métricas", data.metricas)}
            ${Componentes.tarjetaMetricas("Detalles Clave", data.detallesClave)}
          </div>
        </div>
      </section>
    `;
  }

  renderGestionRiesgos(data) {
    return `
      <section class="space-y-6">
        ${Componentes.seccionTitulo(data.titulo)}
        ${Componentes.tablaRiesgos(data.matriz)}
      </section>
    `;
  }

  renderProcesoCompleto(data) {
    return `
      <section class="space-y-6">
        ${Componentes.seccionTitulo(data.titulo)}
        ${Componentes.timelineDetallado(data.etapas)}
      </section>
    `;
  }

  renderMejoresPracticas(data) {
    return `
      <section class="space-y-6">
        ${Componentes.seccionTitulo(data.titulo)}
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold mb-2">Aprendizajes</h3>
            ${Componentes.listaOrdenada(data.lista)}
          </div>
          <div>
            ${Componentes.tarjetaMetricas("Resultados", data.metricas)}
          </div>
        </div>
      </section>
    `;
  }

  renderCasoExito(data) {
    return `
      <section class="space-y-6">
        ${Componentes.seccionTitulo(data.titulo)}
        <div class="bg-blue-50 p-4 rounded-lg">
          <div class="mb-3">
            <h3 class="font-semibold">${data.empresa}</h3>
            <p class="text-sm text-gray-500">Tecnologías: ${data.tecnologias.join(', ')}</p>
          </div>
          ${Componentes.listaOrdenada(data.resultados)}
        </div>
      </section>
    `;
  }

  renderKanban(data) {
    return `
      <section class="mb-12 bg-blue-50 p-6 rounded-xl">
        <h2 class="text-3xl font-bold text-center mb-8">${data.titulo}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${data.columnas.map(columna => `
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold text-lg border-b pb-2 mb-3">${columna.nombre}</h3>
              ${columna.tareas.map(tarea => `
                <div class="bg-gray-100 p-3 rounded mb-2">${tarea}</div>
              `).join('')}
            </div>
          `).join('')}
        </div>
        <div class="mt-6 text-center bg-white p-4 rounded shadow">
          <span class="text-2xl font-bold">Semanas restantes: </span>
          <span class="text-3xl text-blue-600">${data.semanas}</span>
        </div>
      </section>
    `;
  }

  renderDatabase(data) {
    return `
      <section class="mb-12 bg-white p-6 rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-4">${data.titulo}</h2>
        <div class="grid md:grid-cols-3 gap-4">
          ${data.tablas.map(tabla => `
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-600 mb-2">${tabla.nombre}</h3>
              <ul class="list-disc pl-4 text-sm">
                ${tabla.campos.map(campo => `<li class="mb-1">${campo}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        ${data.relaciones ? `
          <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h4 class="font-semibold mb-2">Relaciones:</h4>
            <ul class="list-disc pl-4">
              ${data.relaciones.map(rel => `<li>${rel}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </section>
    `;
  }

  renderImplementacion(data) {
    return `
      <section class="mb-12 bg-gray-100 p-6 rounded-xl">
        <h2 class="text-2xl font-bold mb-4">${data.titulo}</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold mb-2">Pasos clave</h3>
            <ol class="list-decimal pl-4 space-y-2">
              ${data.pasos.map(paso => `<li>${paso}</li>`).join('')}
            </ol>
          </div>
          ${data.ventajas ? `
            <div>
              <h3 class="font-semibold mb-2">Ventajas Render.com</h3>
              <ul class="list-check pl-4 space-y-2 text-green-600">
                ${data.ventajas.map(ventaja => `<li>${ventaja}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }

  renderConceptos(data) {
    return `
      <section class="mb-12 bg-white p-6 rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-4">${data.titulo}</h2>
        <div class="grid md:grid-cols-2 gap-4">
          ${data.items.map(item => `
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm">${item}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  renderMetodos(data) {
    return `
      <section class="mb-12 bg-gray-50 p-6 rounded-xl">
        <h2 class="text-2xl font-bold mb-4">${data.titulo}</h2>
        <div class="grid md:grid-cols-3 gap-4">
          ${data.casos.map(caso => `
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold">${caso}</h3>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  renderGallery(data) {
    return `
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-4">${data.titulo}</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          ${data.imagenes.map(img => `
            <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img src="${img}" alt="Ejemplo" class="w-full h-full object-cover">
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  renderConceptosBD(data) {
    return `
      <section class="mb-12 bg-white p-6 rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-4">${data.titulo}</h2>
        <div class="grid md:grid-cols-2 gap-4">
          ${data.items.map(item => `
            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
              <p class="text-sm leading-relaxed">${item}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  renderConceptosImplantacion(data) {
    return `
      <section class="mb-12 bg-gray-50 p-6 rounded-xl">
        <h2 class="text-2xl font-bold mb-4">${data.titulo}</h2>
        <div class="grid md:grid-cols-4 gap-4">
          ${data.items.map(item => `
            <div class="bg-white p-4 rounded-lg shadow text-center">
              <div class="text-blue-600 text-2xl mb-2">📌</div>
              <p class="text-sm font-medium">${item}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  renderEjemplosKanban(data) {
    return `
      <section class="mb-12 bg-white p-6 rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-4">${data.titulo}</h2>
        <div class="grid md:grid-cols-3 gap-4">
          ${data.tipos.map(tipo => `
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">${tipo.nombre}</h3>
              <div class="space-y-2">
                ${tipo.columnas.map(col => `
                  <div class="bg-white p-2 rounded text-sm">${col}</div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  renderComponenteNoReconocido(item) {
    return `<div class="bg-red-50 p-4 rounded">Componente no reconocido: ${item.tipo}</div>`;
  }

  // Métodos de gestión de vistas
  renderizarVista() {
    this.renderVistaPrincipal();
    this.renderVistaDetalle();
  }

  renderVistaPrincipal() {
    const contenedor = document.getElementById('contenedor-investigaciones');
    if (!contenedor) return;

    contenedor.innerHTML = this.investigaciones.map(investigacion => 
      Componentes.tarjetaInvestigacion({
        ...investigacion,
        contenido: acortarTexto(investigacion.contenido)
      })
    ).join('');
  }

  renderVistaDetalle() {
    const contenedor = document.getElementById('detalle-investigacion');
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const investigacion = this.investigaciones.find(
      item => item.id === parseInt(params.get('id'))
    );

    if (investigacion) {
      contenedor.innerHTML = `
        <article class="max-w-4xl mx-auto space-y-12 pb-12">
          <header class="space-y-8">
            <img src="${investigacion.imagen}" alt="${investigacion.titulo}" 
                class="w-full h-96 object-cover rounded-xl shadow-lg">
            <h1 class="text-4xl font-bold text-gray-900">${investigacion.titulo}</h1>
          </header>
          <div class="prose-lg text-gray-700 space-y-12">
            ${this.renderizarContenido(investigacion.contenidoCompleto)}
          </div>
        </article>
      `;
    } else {
      this.renderError();
    }
  }

  renderError() {
    const contenedor = document.getElementById('detalle-investigacion');
    if (!contenedor) return;

    contenedor.innerHTML = `
      <div class="text-center py-20 space-y-4">
        <h2 class="text-2xl text-red-600 font-semibold">¡Error 404!</h2>
        <p class="text-gray-600">La investigación solicitada no existe</p>
        <a href="index.html" class="inline-flex items-center text-blue-600 hover:text-blue-800">
          ← Volver al inicio
        </a>
      </div>
    `;
  }

  mostrarErrorCarga() {
    const contenedor = document.getElementById('contenedor-investigaciones') || 
                      document.getElementById('detalle-investigacion');
    if (!contenedor) return;

    contenedor.innerHTML = `
      <div class="bg-red-100 p-4 rounded-lg text-center">
        <h3 class="text-red-600 font-semibold">Error de conexión</h3>
        <p class="text-red-600">Recarga la página o intenta más tarde</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => new RenderManager());