import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Suite de Pruebas de Resiliencia de Red', () => {

  test('Debería manejar correctamente un error 500 del servidor', async ({ page }) => {
    const todoPage = new TodoPage(page);

    // 1. Interceptamos cualquier petición GET que vaya a la API de tareas
    await page.route('**/api/tareas', async (route) => {
      // Abortamos la petición real y respondemos con un error de servidor
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Error interno simulado por Playwright' })
      });
    });

    // 2. Navegamos a la página
    await todoPage.navegar();

    // 3. Verificación de resiliencia
    // Aquí comprobaríamos cómo reacciona tu frontend. Si tu app muestra un mensaje de error,
    // podríamos validarlo. De momento, verás que la lista se queda vacía porque la API falló.
    console.log('⚠ Prueba de resiliencia ejecutada: El navegador cree que el servidor falló.');
  });

test('Debería inyectar una lista de tareas falsa mediante la API mockeada', async ({ page }) => {
    const todoPage = new TodoPage(page);

    // 1. Preparamos los datos falsos que queremos inyectar
    const tareasFalsas = [
      { id: 1, texto: 'Tarea fake inyectada por Playwright 1' },
      { id: 2, texto: 'Tarea fake inyectada por Playwright 2' }
    ];

    // 2. Interceptamos la petición GET de la aplicación
    await page.route('**/api/tareas', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        // Inyectamos nuestro JSON customizado
        body: JSON.stringify(tareasFalsas) 
      });
    });

    // 3. Navegamos a la aplicación
    await todoPage.navegar();

    // 4. Verificamos que la pantalla muestra los datos que hemos inyectado falsamente
    await expect.soft(todoPage.listaTareas).toContainText('Tarea fake inyectada por Playwright 1');
    await expect.soft(todoPage.listaTareas).toContainText('Tarea fake inyectada por Playwright 2');
    
    console.log('🎉 ¡Datos dinámicos inyectados con éxito mediante interceptación de red!');
  });
});