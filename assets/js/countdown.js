function randomTime() {
    return String(Math.floor(Math.random() * 60)).padStart(2, "0");
}

function animateNumber(element, newValue) {
    element.classList.add("flip");

    // After animation ends, update number
    setTimeout(() => {
        element.textContent = newValue;
        element.classList.remove("flip");
    }, 250);
}

function updateCountdown() {
    const boxes = document.querySelectorAll('.countdown .num');

    animateNumber(boxes[0], randomTime()); // Days
    animateNumber(boxes[1], randomTime()); // Hours
    animateNumber(boxes[2], randomTime()); // Minutes
    animateNumber(boxes[3], randomTime()); // Seconds
}

// Every 2 seconds
setInterval(updateCountdown, 2000);

// Initial call
updateCountdown();
