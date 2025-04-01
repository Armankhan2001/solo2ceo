function toggleDetails(serviceId) {
    let details = document.getElementById(`service-${serviceId}`);
    if (details.style.display === "block") {
        details.style.display = "none";
    } else {
        details.style.display = "block";
    }
}
