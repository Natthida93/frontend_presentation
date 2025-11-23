/*==================== Toggle icon navbar ====================*/
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });
    }

    /*==================== Scroll sections active link ====================*/
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    window.addEventListener('scroll', () => {
        const top = window.scrollY;

        sections.forEach(section => {
            const offset = section.offsetTop - 150;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                const matchingLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (matchingLink) matchingLink.classList.add('active');
            }
        });

        const header = document.querySelector('header');
        if (header) header.classList.toggle('sticky', window.scrollY > 100);

        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });

    /*==================== Scroll Reveal ====================*/
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({
            reset: true,
            distance: '80px',
            duration: 2000,
            delay: 200
        });
        ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
        ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
        ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
        ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
    }

    /*==================== Typed.js ====================*/
    if (document.querySelector('.multiple-text')) {
        try {
            new Typed('.multiple-text', {
                strings: ['Computer Science Student'],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true
            });
        } catch (err) {
            console.warn("Typed.js failed to load or init:", err);
        }
    }

    /*==================== Mock Concert Data ====================*/
    const concerts = [
        { id: 1, title: "Rock Night", price: 50 },
        { id: 2, title: "Pop Fiesta", price: 70 },
        { id: 3, title: "Jazz Evening", price: 40 },
    ];

    /*==================== Login Form ====================*/
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('loginFullName').value.trim();
            const email = document.getElementById('loginEmail').value.trim();
            const region = document.getElementById('loginRegion').value;

            if (!fullName || !email || !region) {
                alert("Please fill all fields.");
                return;
            }

            localStorage.setItem('fullName', fullName);
            localStorage.setItem('email', email);
            localStorage.setItem('region', region);

            window.location.href = 'dashboard.html';
        });
    }

    /*==================== Registration Form ====================*/
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const region = document.getElementById('region').value;

            if (!fullName || !email || !region) {
                alert("Please fill all fields.");
                return;
            }

            localStorage.setItem('fullName', fullName);
            localStorage.setItem('email', email);
            localStorage.setItem('region', region);

            alert("Registration successful!");
            window.location.href = 'index.html';
        });
    }

    /*==================== Booking Page ====================*/
    const concertSelect = document.getElementById('concertSelect');
    if (concertSelect) {
        // Populate concert dropdown
        concerts.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = `${c.title} — $${c.price}`;
            option.dataset.price = c.price;
            concertSelect.appendChild(option);
        });
    }

    const bookingForm = document.getElementById('paymentForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userEmail = localStorage.getItem("email");
            const selectedOption = concertSelect.options[concertSelect.selectedIndex];

            if (!userEmail) {
                alert("Please login first!");
                return;
            }

            const booking = {
                concertName: selectedOption.textContent,
                seatNumber: Math.floor(Math.random() * 100) + 1,
                status: "Paid",
                price: selectedOption.dataset.price
            };

            let history = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
            history.push(booking);
            localStorage.setItem("bookingHistory", JSON.stringify(history));
            localStorage.setItem("bookedConcert", selectedOption.textContent);

            window.location.href = "success.html";
        });
    }

    /*==================== Booking History ====================*/
    if (document.getElementById("historyTable")) {
        const historyData = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
        const tbody = document.querySelector("#historyTable tbody");

        if (historyData.length === 0) {
            document.getElementById("noHistory").style.display = "block";
        } else {
            historyData.forEach(booking => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${booking.concertName}</td>
                    <td>${booking.seatNumber}</td>
                    <td>${booking.status}</td>
                    <td>$${booking.price}</td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    /*==================== Success Page ====================*/
    if (document.getElementById("message")) {
        const concertName = localStorage.getItem("bookedConcert");
        if (concertName) {
            document.getElementById("message").textContent =
                `Thank you for booking "${concertName}". We’ve received your payment proof.`;
            localStorage.removeItem("bookedConcert");
        }
        setTimeout(() => {
            window.location.href = "history.html";
        }, 5000);
    }

    /*==================== Logout Button ====================*/
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});
