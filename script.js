// script.js

// --- Función para mezclar actividades ---
function shuffleActivities() {
  const activityList = document.getElementById("activityList");
  if (!activityList) return; // Asegura que el elemento exista

  let activities = Array.from(activityList.children);

  for (let i = activities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [activities[i], activities[j]] = [activities[j], activities[i]]; // Intercambia elementos
  }

  // Animación de salida antes de reordenar
  activities.forEach((activity) => {
    activity.style.opacity = 0;
    activity.style.transform = "translateY(20px)";
    activity.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  });

  setTimeout(() => {
    activityList.innerHTML = ""; // Limpia la lista actual
    activities.forEach((activity) => {
      activityList.appendChild(activity);
      // Animación de entrada
      activity.style.opacity = 0; // Reset para animar de nuevo
      activity.style.transform = "translateY(20px)";
      setTimeout(() => {
        activity.style.opacity = 1;
        activity.style.transform = "translateY(0)";
      }, 50); // Pequeño retraso para que la transición sea visible
    });
  }, 300); // Espera a que termine la animación de salida
}

// --- Animación del Avión ---
document.addEventListener("DOMContentLoaded", () => {
  const airplane = document.getElementById("airplane-animation");
  let x = -50; // Posición inicial fuera de la pantalla (izquierda)
  let y = window.innerHeight * Math.random(); // Posición Y aleatoria
  let speedX = 2 + Math.random() * 3; // Velocidad X aleatoria (2 a 5)
  let speedY = (Math.random() - 0.5) * 2; // Velocidad Y aleatoria (-1 a 1, para que suba/baje)
  let rotation = 0; // Rotación inicial
  const maxRotation = 10; // Máxima inclinación del avión

  function animateAirplane() {
    x += speedX;
    y += speedY;

    // Si el avión sale de la pantalla por la derecha, reinicia desde la izquierda
    if (x > window.innerWidth + 50) {
      x = -50;
      y = window.innerHeight * Math.random(); // Nueva posición Y aleatoria
      speedX = 2 + Math.random() * 3;
      speedY = (Math.random() - 0.5) * 2;
    }

    // Rebote en los bordes superior/inferior
    if (y < -50 || y > window.innerHeight + 50) {
      speedY *= -1; // Invierte la dirección Y
      // Asegúrate de que el avión esté dentro de los límites
      y = Math.max(-50, Math.min(window.innerHeight + 50, y));
      // Ajusta la rotación al rebotar
      rotation = -speedY * 5; // Más inclinación si sube o baja rápido
    } else {
      // Ajusta la rotación ligeramente en función de la velocidad Y
      rotation = speedY * 5;
      if (rotation > maxRotation) rotation = maxRotation;
      if (rotation < -maxRotation) rotation = -maxRotation;
    }

    airplane.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    requestAnimationFrame(animateAirplane);
  }

  // Inicia la animación después de un pequeño retraso
  setTimeout(animateAirplane, 500);

  // Reposicionar avión al redimensionar la ventana
  window.addEventListener("resize", () => {
    x = -50; // Reinicia la posición X para evitar que se quede fuera de pantalla
    y = window.innerHeight * Math.random();
  });
});
