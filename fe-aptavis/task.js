// variable elemen task
const addTaskBtn = document.getElementById('addTaskBtn');
const closeBtnTask = document.getElementById('closeBtnTask');
const slidingContainerTask = document.getElementById('slidingContainerTask');
const deleteBtnTask = document.getElementById('deleteBtnTask');

// button modal task
addTaskBtn.addEventListener('click', function () {
    slidingContainerTask.classList.add('show');
});
 
// button modal task
closeBtnTask.addEventListener('click', function () {
    slidingContainerTask.classList.remove('show');
} );

// Fungsi untuk mengisi elemen select task
async function populateTaskSelect() {
    const projectSelect = document.getElementById('projectSelect'); // Pastikan ID select sesuai dengan ID elemen Anda

    if (!projectSelect) {
        console.error('Element with id "projectSelect" not found.');
        return;
    }

    try {
        // Mengambil data proyek dari API
        const projectResponse = await fetch('http://127.0.0.1:8000/api/projects');
        
        if (!projectResponse.ok) {
            throw new Error(`HTTP error! status: ${projectResponse.status}`);
        }

        // Mengonversi data JSON
        const data = await projectResponse.json();

        // Periksa apakah data valid
        if (!Array.isArray(data) || data.length === 0) {
            console.warn('No project data available.');
            projectSelect.innerHTML = '<option value="">No projects available</option>';
            return;
        }

        // Hapus opsi sebelumnya
        projectSelect.innerHTML = '';

        // Opsi default
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Select a project --';
        projectSelect.appendChild(defaultOption);

        // Menambahkan opsi untuk setiap proyek
        data.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            projectSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching project data:', error);
        projectSelect.innerHTML = '<option value="">Failed to load projects</option>';
    }
}

// Input data task
document.getElementById('taskForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Mencegah form submit default

    const editingId = document.getElementById('editTaskId').value; // Mengecek apakah ini form untuk edit atau tambah
    const url = editingId
        ? `http://localhost:8000/api/tasks/${editingId}` // URL untuk edit jika ada ID
        : 'http://localhost:8000/api/tasks'; // URL untuk tambah jika tidak ada ID
    const method = editingId ? 'PUT' : 'POST'; // Tentukan metode (POST untuk tambah, PUT untuk edit)

    // Mengambil data dari form
    const task = {
        project_id: document.getElementById('projectSelect').value, // Mengambil nilai project dari select
        name: document.getElementById('taskName').value, // Mengambil nama tugas
        status: document.getElementById('taskStatus').value, // Mengambil status tugas
        bobot: document.getElementById('taskBobot').value // Mengambil bobot tugas
    };

    try {
        // Mengirimkan data ke server
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);

        // Menampilkan notifikasi atau perbarui UI sesuai kebutuhan
        alert(editingId ? 'Task berhasil diperbarui!' : 'Task berhasil disimpan!');

        // Bersihkan form dan reset ID edit
        document.getElementById('taskForm').reset();
        document.getElementById('editTaskId').value = ''; // Hapus ID edit

        // Panggil fungsi untuk memperbarui daftar tugas atau UI
        fetchData(); // Ganti dengan fungsi yang Anda gunakan untuk merender data tugas
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Terjadi kesalahan saat menyimpan task.');
    }
});

// Edit data task
async function editTask(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/tasks/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch task with ID: ${id}`);
        }

        const task = await response.json();

        if (task) {
            // Isi form dengan data task
            document.getElementById('taskName').value = task.name || ''; // Nama task
            document.getElementById('taskStatus').value = task.status || 'Draft'; // Status task
            document.getElementById('taskBobot').value = task.bobot || ''; // Bobot task
            document.getElementById('projectSelect').value = task.project_id || ''; // Project ID

            // Set ID untuk edit
            document.getElementById('editTaskId').value = id;

            // Tampilkan modal form edit task
            document.getElementById('slidingContainerTask').classList.add('show');

            // Tampilkan tombol delete jika diperlukan
            document.getElementById('deleteBtnTask').classList.remove('hidden');
        } else {
            alert('Task data not found.');
        }
    } catch (error) {
        console.error('Error editing task:', error);
        alert('Failed to load task data. Please try again.');
    }
}


// Memanggil fungsi untuk mengisi select
populateTaskSelect();
