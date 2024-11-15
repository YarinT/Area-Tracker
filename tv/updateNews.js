let updates = [];
let draggedItem = null;
let draggedIndex = null;

// Load existing updates
window.onload = function() {
    fetch('newsContent.json')
        .then(response => response.json())
        .then(data => {
            updates = Array.isArray(data) ? data : [];
            renderUpdates();
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
};

// Add new update
function addUpdate() {
    const input = document.getElementById('newUpdate');
    const text = input.value.trim();
    
    if (text) {
        updates.push(text);
        input.value = '';
        renderUpdates();
    }
}

// Delete update
function deleteUpdate(index) {
    updates.splice(index, 1);
    renderUpdates();
}

// Edit update
function editUpdate(index) {
    const newText = prompt('ערוך עדכון:', updates[index]);
    if (newText && newText.trim()) {
        updates[index] = newText.trim();
        renderUpdates();
    }
}

// Render updates list
function renderUpdates() {
    const list = document.getElementById('updatesList');
    list.innerHTML = '';
    
    updates.forEach((update, index) => {
        const li = document.createElement('li');
        li.className = 'update-item';
        li.draggable = true;
        
        li.innerHTML = `
            <div class="drag-handle">☰</div>
            <span>${update}</span>
            <div class="update-controls">
                <button class="edit-btn" onclick="editUpdate(${index})">ערוך</button>
                <button class="delete-btn" onclick="deleteUpdate(${index})">מחק</button>
            </div>
        `;
        
        // Add drag event listeners
        li.addEventListener('dragstart', handleDragStart);
        li.addEventListener('dragover', handleDragOver);
        li.addEventListener('drop', handleDrop);
        li.addEventListener('dragenter', handleDragEnter);
        li.addEventListener('dragleave', handleDragLeave);
        
        list.appendChild(li);
    });
}

// Save all updates
function saveUpdates() {
    fetch('update-news.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('העדכונים נשמרו בהצלחה');
        } else {
            alert('שגיאה: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('אירעה שגיאה בעת שמירת העדכונים');
    });
}

function handleDragStart(e) {
    draggedItem = e.target;
    draggedIndex = Array.from(draggedItem.parentNode.children).indexOf(draggedItem);
    setTimeout(() => draggedItem.classList.add('dragging'), 0);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    const item = e.target.closest('.update-item');
    if (item && item !== draggedItem) {
        item.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const item = e.target.closest('.update-item');
    if (item) {
        item.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const dropTarget = e.target.closest('.update-item');
    
    if (dropTarget && dropTarget !== draggedItem) {
        const dropIndex = Array.from(dropTarget.parentNode.children).indexOf(dropTarget);
        
        // Reorder the updates array
        const [movedItem] = updates.splice(draggedIndex, 1);
        updates.splice(dropIndex, 0, movedItem);
        
        renderUpdates();
    }
    
    // Clean up
    document.querySelectorAll('.update-item').forEach(item => {
        item.classList.remove('drag-over', 'dragging');
    });
}
