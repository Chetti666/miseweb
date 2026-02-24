# Planificacion de la web - CG Motion Studio

Este documento resume el estado actual del proyecto y los puntos pendientes para iterar la web de forma ordenada.

## 1) Estado actual (completado)
- [x] Proyecto creado en Astro.
- [x] Tailwind CSS integrado.
- [x] GSAP + ScrollTrigger integrados.
- [x] Estructura multi-pagina creada:
  - [x] Inicio (`/`)
  - [x] Portafolio (`/portfolio`)
  - [x] Servicios (`/servicios`)
  - [x] Sobre mi (`/sobre-mi`)
  - [x] Contacto (`/contacto`)
- [x] Header y footer globales implementados.
- [x] Estilo visual base (tipografia, cards, fondo, componentes).
- [x] Build exitoso (`npm run build`).
- [x] Limpieza de recurso pesado temporal (video grande removido).

## 2) Pendientes principales (prioridad alta)
- [ ] Reemplazar placeholders por clips reales optimizados.
- [ ] Definir estructura final de videos por seccion (hero, portafolio, overscroll).
- [ ] Ajustar copy final con mensajes comerciales del cliente.
- [ ] Conectar formulario de contacto a servicio real (Formspree/Resend/backend).

## 3) Integracion de video (plan recomendado)
- [ ] Solicitar al cliente los clips fraccionados (5-15 MB cada uno).
- [ ] Exportar para web (H.264 MP4 o WebM segun compatibilidad).
- [ ] Nombrado sugerido:
  - [ ] `hero-loop.mp4`
  - [ ] `portfolio-feature-01.mp4`
  - [ ] `overscroll-01.mp4`
  - [ ] `overscroll-02.mp4`
- [ ] Ubicar archivos en `public/media/videos/`.
- [ ] Implementar carga por seccion con `preload="metadata"`.

## 4) Animaciones y experiencia (GSAP)
- [ ] Ajustar tiempos/easing por seccion segun contenido real.
- [ ] Definir comportamiento de overscroll en home.
- [ ] Revisar experiencia en mobile (evitar animaciones pesadas).
- [ ] Mantener soporte `prefers-reduced-motion`.

## 5) Calidad y rendimiento
- [ ] Revisar Lighthouse (performance, accessibility, best practices, SEO).
- [ ] Comprimir imagenes y validar formatos modernos.
- [ ] Verificar contrastes y legibilidad tipografica.
- [ ] Validar formularios y enlaces externos.

## 6) SEO y contenido
- [ ] Refinar metadatos por pagina (title/description).
- [ ] Agregar OG image final.
- [ ] Revisar estructura de encabezados (H1-H2-H3) en todas las vistas.

## 7) Entrega y deploy
- [ ] Definir plataforma final de despliegue (Vercel recomendado).
- [ ] Configurar dominio final.
- [ ] QA final en desktop + mobile antes de publicar.

---

## Backlog (ideas)
- [ ] Filtro interactivo de categorias en portafolio.
- [ ] Testimonios o casos de estudio con metricas.
- [ ] Seccion de proceso con timeline animado.

## Registro rapido de cambios
> Usa este bloque para ir anotando avances en cada sesion.

- YYYY-MM-DD: 
- YYYY-MM-DD: 
- YYYY-MM-DD: 
