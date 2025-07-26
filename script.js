document.addEventListener('DOMContentLoaded', () => {
    // Estas son las posiciones FINALES de cada pieza, de abajo hacia arriba en el pastel
    const pieces = [
        { id: 'piece1', finalTop: 200 }, // Base del pan
        { id: 'cream1', finalTop: 180 },
        { id: 'piece2', finalTop: 150 },
        // Segundo trozo de pan (130 - 20 (cream) - 30 (pan))
        { id: 'chocolate-cream', finalTop: 130 },
        {id: 'piece3', finalTop:  100 }, 
        { id: 'liquid-cream', finalTop: 100, animatePour: true }, // Marcar para animar el derrame
        { id: 'candle', finalTop: 50, igniteFlame: true } // La vela va encima del pastel y encenderá la llama
    ];

    let delay = 0;

    pieces.forEach((p, index) => {
        const element = document.getElementById(p.id);

        setTimeout(() => {
            element.style.opacity = 1;

            if (p.animatePour) {
                element.style.transform = `translateY(${p.finalTop}px)`;
                setTimeout(() => {
                    element.classList.add('liquid-pour');
                }, 500);
            } else {
                element.style.transform = `translateY(${p.finalTop}px)`;
            }

            if (p.igniteFlame) { // Usamos una nueva propiedad para la vela
                setTimeout(() => {
                    document.querySelector('.flame').style.opacity = 1;
                    // Iniciar la lluvia de confeti aquí, después de que el pastel y la vela estén listos
                    startConfetti();
                }, 1000);
            }
        }, delay);

        if (p.animatePour) {
            delay += 2000;
        } else {
            delay += 1000;
        }
    });

    // --- Funciones para el Confeti ---
    function startConfetti() {
        const confettiColors = ['#ff69b4', '#00bcd4', '#ffeb3b', '#8bc34a', '#9c27b0', '#ff9800']; // Colores vibrantes

        for (let i = 0; i < 100; i++) { // Generar 100 piezas de confeti
            createConfetti(confettiColors[Math.floor(Math.random() * confettiColors.length)]);
        }
    }

    function createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw'; // Posición horizontal aleatoria
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's'; // Duración de caída aleatoria (3 a 5 segundos)
        confetti.style.animationDelay = (Math.random() * 2) + 's'; // Retraso de inicio aleatorio
        confetti.style.backgroundColor = color;
        confetti.style.width = (Math.random() * 5 + 8) + 'px'; // Tamaño aleatorio
        confetti.style.height = confetti.style.width; // Mismo alto para formas cuadradas/circulares

        // Para hacer algunos cuadrados en lugar de solo círculos
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '0'; // Sin borde para que sean cuadrados
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Rotación inicial aleatoria
        }


        document.body.appendChild(confetti);

        // Eliminar el confeti después de que termine su animación para limpiar el DOM
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
});
