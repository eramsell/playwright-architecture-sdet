# Playwright Automation Architecture Suite 🚀

[![Playwright Tests (CI/CD Pipeline)](https://github.com/eramsell/playwright-architecture-sdet/actions/workflows/playwright.yml/badge.svg)](https://github.com/eramsell/playwright-architecture-sdet/actions/workflows/playwright.yml)
   
Un framework de automatización híbrido y profesional diseñado bajo estándares de nivel Enterprise. Este repositorio integra un backend local en Node.js/Express con una suite completa de pruebas e2e, pruebas de integración y simulación de red utilizando **Playwright** y **TypeScript**.

---

## 🏗️ Arquitectura del Proyecto

El framework está estructurado siguiendo principios de diseño limpio y aislamiento de responsabilidades, implementando el patrón **Page Object Model (POM)**:

```text
├── .github/workflows/
│   └── playwright.yml       # Orquestación de CI/CD (GitHub Actions)
├── pages/                   # Capa de Objetos de Página (Pattern POM)
│   └── login.page.ts        # Encapsulamiento de selectores y acciones de UI
├── tests/                   # Suite de Pruebas Automatizadas
│   ├── local-todo.spec.ts   # Integración con el servidor local
│   └── network-mock.spec.ts # Intercepción y simulación de tráfico de red (Mocking)
├── server.js                # Servidor Backend de la aplicación (Express)
├── playwright.config.ts     # Configuración global del motor de Playwright
└── package.json             # Gestión unificada de dependencias de la App y QA

🛠️ Características Principales
Page Object Model (POM): Abstracción completa de la interfaz de usuario para garantizar la mantenibilidad del código ante cambios en el DOM.

Network Mocking & Interception: Pruebas avanzadas que interceptan la capa de red del navegador para simular respuestas de API (fakes/stubs), aislando el frontend.

Infraestructura Unificada: El repositorio aloja tanto la aplicación bajo prueba (Node/Express) como el framework de QA, eliminando dependencias externas de entorno.

Resiliencia Adaptativa: Configuración automatizada de esperas dinámicas para mitigar problemas de sincronización (flakiness).

🔄 Pipeline de Integración Continua (CI/CD)
El proyecto cuenta con un flujo de trabajo automatizado en GitHub Actions que se dispara con cada push o pull_request a la rama principal.

Flujo del Pipeline (Ubuntu Runner):
Levantamiento y provisión del contenedor Linux.

Inselación limpia de dependencias de entorno (Playwright + Express).

Descarga automatizada de binarios de navegadores headless (Chromium, Firefox, WebKit).

Inicialización del servidor backend Express en segundo plano.

Ejecución en paralelo de la suite completa de pruebas.

Estrategia de Evidencias (Fail-Safe): En caso de fallo, el pipeline extrae capturas de pantalla, grabaciones de vídeo y trazas del Trace Viewer, empaquetándolos como artefactos descargables del build.

🚀 Guía de Ejecución Local
Prerrequisitos
Node.js (v18 o superior)

npm

1. Clonar el repositorio e instalar dependencias
Bash
git clone [https://github.com/eramsell/playwright-architecture-sdet.git](https://github.com/eramsell/playwright-architecture-sdet.git)
cd TU_REPOSITORIO
npm install
2. Arrancar el Servidor de la Aplicación
Bash
node server.js
3. Lanzar la Suite de Tests (En otra terminal)
Bash
# Ejecutar todos los tests en modo headless
npx playwright test

# Ejecutar tests con la interfaz gráfica (UI Mode)
npx playwright test --ui
