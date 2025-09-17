document.addEventListener("DOMContentLoaded", function() {
    // Get all the buttons
    const buttons = document.querySelectorAll('.service-btn');
    
    // Add event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the corresponding service ID from button's id
            const serviceId = 'service-' + button.id.split('-')[1];
            toggleDetails(serviceId); // Call the toggleDetails function
        });
    });
});

function toggleDetails(serviceId) {
    let details = document.getElementById(serviceId);
    
    // Toggle the display property to show or hide the details
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}
