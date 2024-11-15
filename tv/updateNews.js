let updates = [];

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
        updates.unshift(text); // Add to beginning of array
        input.value = ''; // Clear input
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
        
        li.innerHTML = `
            <span>${update}</span>
            <div class="update-controls">
                <button class="edit-btn" onclick="editUpdate(${index})">ערוך</button>
                <button class="delete-btn" onclick="deleteUpdate(${index})">מחק</button>
            </div>
        `;
        
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
