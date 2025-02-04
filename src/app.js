import { API_URL } from './config.js';

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
            console.log('Sending request to:', `${API_URL}/api/shorten`);
            console.log('Payload:', payload);
            
            const response = await fetch(`${API_URL}/api/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(payload)
            });

            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
            }

            const data = JSON.parse(responseText);
            const shortUrl = data.short_url;
            shortUrlLink.href = shortUrl;
            shortUrlLink.textContent = shortUrl;
            resultDiv.classList.remove('hidden');
        } catch (error) {
            console.error('Full error:', error);
            alert('Error al acortar URL: ' + error.message);
        }
    });

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(shortUrlLink.href)
            .then(() => alert('URL copiada al portapapeles'))
            .catch(err => console.error('Error copiando:', err));
    });
});