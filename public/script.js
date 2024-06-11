async function sendCommands() {
    const input = document.getElementById('input').value;
    const outputElement = document.getElementById('output');
    outputElement.textContent = 'Processing...';

    try {
        const response = await axios.post('/api/voyager/exploreMars', input, { headers: { 'Content-Type': 'text/plain' } });
        if (response.status === 200) {
            outputElement.textContent = response.data.map(rover => `${rover.x} ${rover.y} ${rover.direction}`).join('\n')
        }
    } catch (error) {
        if (error.response) {
            outputElement.textContent = `Error: ${error.response.data}`;
        } else {
            outputElement.textContent = `Error: ${error.message}`;
        }
    }
}
