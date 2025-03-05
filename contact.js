async function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    const form = document.getElementById('contactForm');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusMessage.textContent = '';

    try {
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            throw new Error('Please fill in all fields');
        }

        const response = await fetch('http://localhost:3001/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Server error');
        }

        if (result.success) {
            statusMessage.textContent = 'Message sent successfully!';
            statusMessage.className = 'status-message success';
            form.reset();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        statusMessage.textContent = error.message || 'Failed to send message. Please try again.';
        statusMessage.className = 'status-message error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}
