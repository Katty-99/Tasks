const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

// Lista de tareas 
let tasks = [
    { id: 1, name: 'Aprender Node.js', day: 'Lunes', completed: false },
    { id: 2, name: 'Construir una API REST', day: 'Martes', completed: false },
    { id: 3, name: 'Hacer pruebas con Postman', day: 'Miércoles', completed: false },
    { id: 4, name: 'Codificar la aplicación front-end', day: 'Jueves', completed: false },
    { id: 5, name: 'Revisar la documentación de Express.js', day: 'Viernes', completed: false },
    { id: 6, name: 'Subir el repositorio a GitHub', day: 'Sábado', completed: false },
    { id: 7, name: 'Planificar la próxima semana', day: 'Domingo', completed: false }
];

// Obtener todas las tareas (GET)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Agregar una nueva tarea (POST)
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        name: req.body.name,
        day: req.body.day,
        completed: req.body.completed || false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Actualizar una tarea existente (PUT)
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.name = req.body.name || task.name;
        task.day = req.body.day || task.day;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
        res.json(task);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

// Eliminar una tarea (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.send('Tarea eliminada');
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
