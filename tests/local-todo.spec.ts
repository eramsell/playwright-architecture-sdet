import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Suite de Pruebas con Limpieza Automatizada', () => {
  
  // Usamos 'request' para lanzar peticiones HTTP directas al backend
  test.beforeEach(async ({ request }) => {
    // Mandamos una petición DELETE al servidor para vaciar la lista
    await request.delete('/api/tareas/limpiar');
    console.log('🧹 ¡Base de datos local limpiada con éxito a través de la API!');
  });

  test('Debería añadir una tarea en un entorno 100% limpio', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.navegar();
    await todoPage.agregarTarea('Garantizar idempotencia con API Testing');
    
    // Usamos la aserción blanda que aprendimos
    await expect.soft(todoPage.listaTareas).toContainText('Garantizar idempotencia con API Testing');
  });

}); 