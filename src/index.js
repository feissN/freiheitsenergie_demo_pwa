if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("service-worker.js")
        .then(registration => {
            console.log("SW registered: ", registration);
        })
        .catch(registrationError => {
            console.log("SW registration failed: ", registrationError);
        });
}

window.onload = e => {
    // Example fetch to ge the data
    // fetch("http://localhost:4500/energy")
    //     .then(response => response.json())
    //     .then(updateEnergy)

    updateEnergy({
        percentage: 50,
        amount: 198,
        message: "Der Anteil ist groß, Tendenz fallend.",
        suggestion: "Du solltest sofort loslegen!",
        mood: "positive"
    })
}

function updateEnergy(energy) {
    document.querySelector(".smiley").src = `./assets/img/smiley/${energy.mood}.png`;
    document.querySelector(".smiley").alt = energy.mood;
    document.querySelector(".smiley").classList.toggle(energy.mood);

    document.querySelector(".percentage").textContent = energy.percentage + "%";
    document.querySelector(".amount").textContent = energy.amount + " gCO2/kWh";

    document.querySelector(".speaking-bubble").classList.toggle(energy.mood);
    document.querySelector(".message").textContent = energy.message;
    document.querySelector(".suggestion").textContent = energy.suggestion;

}

document.querySelector(".smile").addEventListener("click", () => {
    setTimeout(() => {
        Notification.requestPermission().then((result) => {
            if (result === 'granted') {
                navigator.serviceWorker.ready
                    .then((registration) => {
                        showNotification(registration);
                    });
            }
        });
    }, 2000)
})

function showNotification(registration) {
    const notifTitle = "Notification Title";
    const notifBody = "Notification Body";
    const notifImg = "assets/img/notification.png";
    const options = {
        body: notifBody,
        icon: notifImg,
    };
    registration.showNotification(notifTitle, options);
}