import { Locator, Page } from '@playwright/test';

export class TodoPage {
  // 1. Definimos los tipos de nuestros elementos
  readonly page: Page;
  readonly inputTarea: Locator;
  readonly botonAnadir: Locator;
  readonly listaTareas: Locator;

  // 2. Inicializamos los selectores en el constructor
  constructor(page: Page) {
    this.page = page;
    this.inputTarea = page.locator('input[type="text"]');
    this.botonAnadir = page.locator('button');
    this.listaTareas = page.locator('ul');
  }

  // 3. Creamos las acciones (métodos) que se pueden hacer en esta página
  async navegar() {
    await this.page.goto('/');
  }

  async agregarTarea(texto: string) {
    await this.inputTarea.fill(texto);
    await this.botonAnadir.click();
  }
}