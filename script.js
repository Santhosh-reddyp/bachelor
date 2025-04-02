// Common utility functions
function storeData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function navigateTo(page) {
    window.location.href = page;
}

// Other common utilities can be added here