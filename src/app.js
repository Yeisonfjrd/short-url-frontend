document.addEventListener('DOMContentLoaded', () => {
    const shortenForm = document.getElementById('shortenForm');
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');
    const shortUrlLink = document.getElementById('shortUrl');
    const copyButton = document.getElementById('copyButton');

    shortenForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const payload = {
            url: urlInput.value
        };

        try {
            const response = await fetch('http://localhost:8080/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const shortUrl = data.short_url;
            shortUrlLink.href = shortUrl;
            shortUrlLink.textContent = shortUrl;
            resultDiv.classList.remove('hidden');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al acortar URL: ' + error.message);
        }
    });

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(shortUrlLink.href)
            .then(() => alert('URL copiada al portapapeles'))
            .catch(err => console.error('Error copiando:', err));
    });
});