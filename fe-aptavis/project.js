const projectList = document.getElementById('projectList');
const projectSelect = document.getElementById('projectSelect');
const projectForm = document.getElementById('projectForm');

// variable elemen project
const addProjectBtn = document.getElementById('addProjectBtn');
const closeBtnProject = document.getElementById('closeBtnProject');
const slidingContainerProject = document.getElementById('slidingContainerProject');
const deleteBtnProject = document.getElementById('deleteBtnProject');

// button modal project
addProjectBtn.addEventListener('click', function () {
    slidingContainerProject.classList.add('show');
});
 
// button modal project
closeBtnProject.addEventListener('click', function () {
    slidingContainerProject.classList.remove('show');
} );

// Fungsi untuk merender ulang daftar proyek
async function fetchData() {
    try {
        // Ambil data proyek dan tugas dari API
        const projectResponse = await fetch('http://127.0.0.1:8000/api/projects');
        const taskResponse = await fetch('http://127.0.0.1:8000/api/tasks');

        // Periksa respons API
        if (!projectResponse.ok || !taskResponse.ok) {
            throw new Error('Failed to fetch data from API');
        }

        // Parse data dari JSON
        const projects = await projectResponse.json();
        const tasks = await taskResponse.json();

        // Reset container
        const projectList = document.getElementById('projectList');
        projectList.innerHTML = '';

        // Render data proyek dan tugas
        projects.forEach((project) => {
            // Filter tasks berdasarkan idProject
            const projectTasks = tasks.filter((task) => task.project_id === project.id);

            // Hitung progres project
            const totalBobot = projectTasks.reduce((acc, task) => acc + (task.bobot || 0), 0);
            const completedBobot = projectTasks.reduce(
                (acc, task) => acc + (task.status === 'Done' ? (task.bobot || 0) : 0),
                0
            );
            const progressPercentage = totalBobot > 0 ? Math.round((completedBobot / totalBobot) * 100) : 0;

            // Hitung status project
            let statusProject = 'Draft';
            if (projectTasks.some((task) => task.status === 'In Progress')) {
                statusProject = 'In Progress';
            }
            if (projectTasks.every((task) => task.status === 'Done')) {
                statusProject = 'Done';
            }
            
            // Buat elemen proyek
            const projectEl = document.createElement('div');
            projectEl.classList.add('mb-4');
            projectEl.innerHTML = `
                <div class="mb-4 p-4 bg-white shadow-md rounded">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-bold text-lg">${project.name}</h3>
                        <h3 class="font-bold text-lg">${statusProject}</h3>
                        <h3 class="font-bold text-lg">${progressPercentage}%</h3>
                        <button 
                            class="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600" 
                            onclick="editProject(${project.id})">
                            Edit
                        </button>
                    </div>
                    <ul class="list-disc pl-5 space-y-2">
                        ${projectTasks
                            .map(
                                (task) => `
                                <li class="flex justify-between items-center">
                                    <span>${task.name}</span>
                                    <span>Bobot: ${task.status || 0}</span>
                                    <span>Bobot: ${task.bobot || 0}</span>
                                    <button 
                                        class="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600" 
                                        onclick="editTask(${task.id})">
                                        Edit Task
                                    </button>
                                </li>`
                            )
                            .join('')}
                    </ul>
                </div>
            `;
            projectList.appendChild(projectEl);
        });
    } catch (error) {
        console.error('Error fetching projects or tasks:', error);
        alert('Failed to load data. Please try again later.');
    }
}

// Input data project
document.getElementById('projectForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const editingId = document.getElementById('editId').value; // Cek apakah ini add atau edit
    const url = editingId
        ? `http://localhost:8000/api/projects/${editingId}`
        : 'http://localhost:8000/api/projects';
    const method = editingId ? 'PUT' : 'POST';

    // Mengambil data dari form
    const project = {
        name: document.getElementById('name').value,
        status: document.getElementById('status').value,
    };

    try {
        // Mengirimkan data ke server
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);

        // Berikan notifikasi atau perbarui UI sesuai kebutuhan
        alert(editingId ? 'Project berhasil diperbarui!' : 'Project berhasil disimpan!');

        // Bersihkan form dan render ulang data
        document.getElementById('projectForm').reset();
        document.getElementById('editId').value = ''; // Hapus ID edit
        fetchData();
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Terjadi kesalahan saat menyimpan project.');
    }
});

// Edit data project
async function editProject(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/projects/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch project with ID: ${id}`);
        }

        const project = await response.json();

        if (project) {
            // Isi form dengan data proyek
            document.getElementById('name').value = project.name || '';
            document.getElementById('status').value = project.status || 'Draft';
            document.getElementById('editId').value = id; // Simpan ID proyek
            slidingContainerProject.classList.add('show'); // Tampilkan modal form edit
            deleteBtnProject.classList.remove('hidden'); // Tampilkan tombol delete
        } else {
            alert('Project data not found.');
        }
    } catch (error) {
        console.error('Error editing project:', error);
        alert('Failed to load project data. Please try again.');
    }
}

// Tambahkan event listener pada tombol delete untuk task
deleteBtnTask.addEventListener("click", function () {
    const editTaskId = document.getElementById("editTaskId").value;
    if (editTaskId) {
        deleteTask(editTaskId);
    } else {
        alert("No task selected for deletion.");
    }
});

// Fungsi untuk menghapus task
async function deleteTask(id) {

    // Cek id task
    if (!id) {
        alert("Invalid task ID.");
        return;
    }

    // Konfirmasi penghapusan
    const confirmDelete = confirm("Apakah kamu yakin mau hapus task ini?");
    if (!confirmDelete) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:8000/api/tasks/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error(`Failed to delete task with ID: ${id}`);
        }

        alert("Task successfully deleted!");
        
        // Menutup modal setelah delete
        document.getElementById("slidingContainerTask").classList.remove('show');
        
        // Menyembunyikan tombol delete
        document.getElementById("deleteBtnTask").classList.add('hidden');
        
        // Memperbarui daftar task setelah penghapusan
        fetchData(); // Pastikan Anda memiliki fungsi fetchData untuk memperbarui UI
    } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Please try again later.");
    }
}


// Panggil fetchData untuk memuat data saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchData);