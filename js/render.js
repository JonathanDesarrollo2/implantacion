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
      console.log('Datos cargados:', this.investigaciones); // Debug
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
        default: return this.renderComponenteNoReconocido(seccion);
      }
    }).join('');
  }

  // Métodos de renderizado específicos
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

  renderComponenteNoReconocido(item) {
    return `<div class="bg-red-50 p-4 rounded">Componente no reconocido: ${item.tipo}</div>`;
  }

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