function updateScene() {
    let scrollPosition = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight;
    let scrollRatio = scrollPosition / maxScroll;

    let morningColor = [135, 206, 235];  // light blue
    let eveningColor = [255, 140, 0];    // orange
    let nightColor = [0, 0, 51];         // navy blue

    let morningSeaColor = [70, 130, 180];
    let eveningSeaColor = [200, 100, 50];
    let nightSeaColor = [0, 0, 40];

    function interpolateColor(color1, color2, factor) {
        return color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
    }

    let sun = document.querySelector(".sun");
    let moon = document.querySelector(".moon");
    let sea = document.querySelector(".sea");
    let clouds = document.querySelector(".clouds");
    let stars = document.querySelector(".stars");

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight * 0.7;
    let radius = window.innerHeight / 1.7;
    let angle = (scrollRatio * Math.PI) - Math.PI / 2;

    let sunX = centerX + radius * Math.cos(angle);
    let sunY = centerY + radius * Math.sin(angle);
    let moonX = centerX - radius * Math.cos(angle);
    let moonY = centerY - radius * Math.sin(angle);

    sun.style.left = `${sunX}px`;
    sun.style.top = `${sunY}px`;
    moon.style.left = `${moonX}px`;
    moon.style.top = `${moonY}px`;

    let newSkyColor, newSeaColor;
    if (scrollRatio < 0.5) {
        newSkyColor = interpolateColor(morningColor, eveningColor, scrollRatio * 2);
        newSeaColor = interpolateColor(morningSeaColor, eveningSeaColor, scrollRatio * 2);
    } else if (scrollRatio < 0.9) {
        newSkyColor = interpolateColor(eveningColor, nightColor, (scrollRatio - 0.5) * 2);
        newSeaColor = interpolateColor(eveningSeaColor, nightSeaColor, (scrollRatio - 0.5) * 2);
    } else {
        newSkyColor = nightColor;
        newSeaColor = nightSeaColor;
    }

    document.querySelector(".parallax").style.background = `rgb(${newSkyColor[0]}, ${newSkyColor[1]}, ${newSkyColor[2]})`;
    sea.style.background = `rgb(${newSeaColor[0]}, ${newSeaColor[1]}, ${newSeaColor[2]})`;

    if (scrollRatio >= 0) {
        clouds.style.opacity = 1;
        clouds.style.transform = `translateX(0)`;
    }

    if (scrollRatio > 0.1) {
        clouds.style.transform = `translateX(${(scrollRatio - 0.1) * -100}%)`; 
    }

    clouds.style.top = `25%`;

    if (scrollRatio > 0.5) {
        stars.style.opacity = 1;
    } else {
        stars.style.opacity = 0;
    }

    let shootingStars = document.querySelector(".shooting-stars");
    if (scrollRatio > 0.6) {
        shootingStars.style.opacity = 1;
    } else {
        shootingStars.style.opacity = 0;
    }
}

window.addEventListener("load", () => {
    updateScene();
});

window.addEventListener("scroll", updateScene);