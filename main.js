// Initialize Typed.js for typing animation
var typed = new Typed(".text", {
    strings: ["Software Developer", "Firmware Developer", "Device Drivers Developer"],
    typeSpeed: 100,       // Speed of typing
    backSpeed: 100,       // Speed of deleting text
    backDelay: 1000,      // Delay before starting to delete
    loop: true            // Repeat animation
});

// Handle the timeline animation with IntersectionObserver
const timelineItems = document.querySelectorAll('.timeline-item');

// Trigger animations for all timeline items on page load
window.addEventListener('load', () => {
    timelineItems.forEach((item, index) => {
        item.style.animationPlayState = 'running'; // Start the animation on load
    });
});

timelineItems.forEach((item, index) => {
    item.style.setProperty('--delay', `${index * 0.3}s`);
    item.style.animationPlayState = 'paused'; // Pause the animation initially

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                item.style.animationPlayState = 'running'; // Start the animation when in view
                observer.unobserve(item); // Stop observing once animation is triggered
            }
        },
        { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    observer.observe(item);
});

// Ensure EmailJS is loaded
if (typeof emailjs !== 'undefined') {
    // Initialize EmailJS with your user ID
    emailjs.init('7oGeTaYU-uONmx6gk'); // Replace with your actual public key

    // Add event listener to the form for submission
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        console.log('Form submission started'); // Debug log

        // Send the form data to EmailJS
        emailjs
            .sendForm('service_4xh3jhp', 'template_6wmbjq5', this) // Replace with your template ID
            .then(
                function (response) {
                    console.log('Success:', response);
                    alert('Message sent successfully!');
                    location.reload(); 
                },
                function (error) {
                    console.error('Error:', error);
                    alert('Failed to send message, please try again.');
                    location.reload(); 
                }
            );
    });
} else {
    console.error('EmailJS is not loaded. Please check your script inclusion.');
}
