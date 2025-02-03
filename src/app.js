import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    const shortenForm = document.getElementById('shortenForm');
    const urlInput = document.getElementById('urlInput');
    const customAliasInput = document.getElementById('customAlias');
    const resultDiv = document.getElementById('result');
    const shortUrlLink = document.getElementById('shortUrl');
    const copyButton = document.getElementById('copyButton');

    shortenForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const payload = {
            url: urlInput.value,
            custom_alias: customAliasInput.value || undefined
        };

        try {
            const response = await fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            if (response.ok) {
                const shortUrl = `${window.location.origin}/${data.short_url}`;
                shortUrlLink.href = shortUrl;
                shortUrlLink.textContent = shortUrl;
                resultDiv.classList.remove('hidden');
            } else {
                alert(data.error || 'Error al acortar URL');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de red');
        }
    });

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(shortUrlLink.href)
            .then(() => alert('URL copiada al portapapeles'))
            .catch(err => console.error('Error copiando:', err));
    });
});