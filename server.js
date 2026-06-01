const express = require('express');

const app = express();
const PORT = 3000;

let tareas = [];

app.use(express.json());

app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/api/tareas', (req, res) => {
  const texto = (req.body.texto || '').trim();
  if (!texto) {
    return res.status(400).json({ error: 'La tarea no puede estar vacía' });
  }
  const tarea = { id: Date.now(), texto };
  tareas.push(tarea);
  res.status(201).json(tarea);
});

// Endpoint especial para que Playwright limpie los datos antes de testear
app.delete('/api/tareas/limpiar', (req, res) => {
  tareas = []; // Vaciamos el array por completo
  res.status(200).json({ mensaje: 'Base de datos local limpia' });
});

app.get('/', (req, res) => {
  res.type('html').send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, sans-serif;
      max-width: 480px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    h1 { font-size: 1.5rem; }
    form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    input { flex: 1; padding: 0.5rem; }
    button { padding: 0.5rem 1rem; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li {
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }
    .vacio { color: #888; font-style: italic; }
  </style>
</head>
<body>
  <h1>Mis tareas</h1>
  <form id="form-tarea">
    <input type="text" id="input-tarea" placeholder="Nueva tarea..." autocomplete="off" />
    <button type="submit">Añadir</button>
  </form>
  <ul id="lista-tareas"></ul>

  <script>
    const form = document.getElementById('form-tarea');
    const input = document.getElementById('input-tarea');
    const lista = document.getElementById('lista-tareas');

    async function cargarTareas() {
      const res = await fetch('/api/tareas');
      const tareas = await res.json();
      lista.innerHTML = '';
      if (tareas.length === 0) {
        lista.innerHTML = '<li class="vacio">No hay tareas. ¡Añade una!</li>';
        return;
      }
      tareas.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t.texto;
        lista.appendChild(li);
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const texto = input.value.trim();
      if (!texto) return;

      await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });

      input.value = '';
      input.focus();
      cargarTareas();
    });

    cargarTareas();
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log('Servidor en http://localhost:' + PORT);
});
