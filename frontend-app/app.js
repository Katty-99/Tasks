// Función para obtener las tareas del servidor y filtrarlas por día
async function fetchTasks(day) {
    try {
        console.log('Solicitando tareas para el día:', day); // Log para verificar la llamada
        const response = await fetch('http://localhost:3000/tasks'); // Solicita todas las tareas al servidor
        const tasks = await response.json();
        console.log('Tareas obtenidas:', tasks); // Log para verificar las tareas obtenidas

        const tasksForDay = tasks.filter(task => task.day === day);
        console.log('Tareas para el día seleccionado:', tasksForDay); // Log para verificar el filtrado

        displayTasks(tasksForDay, day);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
    }
}

// Función para mostrar las tareas en el contenedor de tareas
function displayTasks(tasks, day) {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = ''; // Limpia el contenedor

    if (tasks.length === 0) {
        container.innerHTML = `<p>No hay tareas para ${day}.</p>`;
    } else {
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('card', 'mb-2');
            taskElement.innerHTML = `
                <div class="card-body">
                    <h5>${task.name}</h5>
                    <p>${task.completed ? 'Completada' : 'Pendiente'}</p>
                </div>
            `;
            container.appendChild(taskElement);
        });
    }
}

// Mostrar las tareas del lunes por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => fetchTasks('Lunes'));
