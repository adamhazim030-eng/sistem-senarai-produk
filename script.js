const searchButton = document.getElementById('searchButton');
const apiTitle = document.getElementById('apiTitle');
const apiResults = document.getElementById('apiResults');

searchButton.addEventListener('click', () => {
    apiTitle.textContent = 'Memuatkan data API...';
    apiResults.innerHTML = '';

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            console.log('API posts:', posts);

            if (posts.length === 0) {
                apiTitle.textContent = 'Tiada produk ditemui.';
                return;
            }

            apiTitle.textContent = 'Data API berjaya dimuatkan.';
            apiResults.innerHTML = posts.map(post => `
                <div class="post-item">
                    <h3>${post.id}. ${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            apiTitle.textContent = 'Ralat berlaku';
            apiResults.innerHTML = '<p>Ralat berlaku semasa sambungan. Sila semak internet atau cuba lagi.</p>';
            console.error('Fetch error:', error);
        });
});