let streamAudio;
let audio;

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

const COFFEE_TYPES = [
    { name: "Espresso", colors: ["#6f4e37", "#3b2918"], fullness: 100 },
    { name: "Americano", colors: ["#4f2a17", "#2b1a0f"], fullness: 100 },
    { name: "Latte", colors: ["#d3b38c", "#96765b"], fullness: 100 },
    { name: "Cappuccino", colors: ["#b2977d", "#73503c"], fullness: 100 },
    { name: "Mocha", colors: ["#704214", "#40210f"], fullness: 100 },
    { name: "Macchiato", colors: ["#8b5e3c", "#482c1b"], fullness: 100 }
];

const ERRORS = {
    NO_ERROR: {
        name: "NO_ERROR",
        description: "",
        data: [0, 0, 0, 0, 0, 0],
        divided: ["", "", ""]
    },
    VOLTAGE_OVER: {
        name: "VOLTAGE_OVER",
        description: "too much voltage applied",
        data: [0, 1, 0, 0, 0, 1],
        divided: ["too much voltage", "applied", ""]
    },
    VOLTAGE_UNDER: {
        name: "VOLTAGE_UNDER",
        description: "too little voltage applied",
        data: [0, 0, 0, 0, 0, 0],
        divided: ["too little voltage", "applied", ""]
    },
    SEVERE_DIRT: {
        name: "SEVERE_DIRT",
        description: "the cleanliness of the machine was neglected",
        data: [1, 0, 0, 0, 0, 0],
        divided: ["the cleanliness", "of the machine", "was neglected"]
    },
    POWER_SUPPLY_FAILURE: {
        name: "POWER_SUPPLY_FAILURE",
        description: "power supply failure detected",
        data: [0, 1, 0, 0, 0, 0],
        divided: ["power supply", "failure", "detected"]
    },
    SEAL_DAMAGE: {
        name: "SEAL_DAMAGE",
        description: "damage to seals or hoses",
        data: [0, 0, 1, 0, 0, 0],
        divided: ["damage to", "seals or hoses", ""]
    },
    PUMP_FAILURE: {
        name: "PUMP_FAILURE",
        description: "pump malfunction",
        data: [0, 0, 0, 1, 0, 0],
        divided: ["pump", "malfunction", ""]
    },
    FROTHER_FAILURE: {
        name: "FROTHER_FAILURE",
        description: "frother failure",
        data: [0, 0, 0, 0, 1, 0],
        divided: ["frother", "failure", ""]
    },
    ELECTRONICS_FAILURE: {
        name: "ELECTRONICS_FAILURE",
        description: "electronic component malfunction",
        data: [0, 0, 0, 0, 0, 1],
        divided: ["electronic", "component", "malfunction"]
    },
    OVERHEATING: {
        name: "OVERHEATING",
        description: "machine is overheating",
        data: [0, 0, 0, 0, 0, 1],
        divided: ["machine", "is overheating", ""]
    },
    WATER_PRESSURE_LOW: {
        name: "WATER_PRESSURE_LOW",
        description: "water pressure is too low",
        data: [1, 0, 0, 0, 0, 0],
        divided: ["water pressure", "is too low", ""]
    }
};


const onLoad = () => {
    let subtitle = document.querySelector("h6");

    document.querySelector("main").classList.add("loaded");
    Array.from(document.querySelector("section#machine-selection").children).forEach((element) => {
        element.innerHTML = COFFEE_MACHINE_FOR_MENU;

        element.children[0].classList.add("main-menu");

        element.children[0].addEventListener("click", () => {
            playAudio("./audio/click.mp3");
            if(parseInt(element.id.slice(-1)) < 2){
                changeSceneToDetails(element.id);
            }
        })

        element.children[0].addEventListener("mouseenter", () => {
            switch (parseInt(element.id.slice(-1))){
                case 0:
                    subtitle.innerText = "DE'LIGNE DELICATA IC 666";
                    break;
                case 1:
                    subtitle.innerText = "SCHOB MASSITO FUN MAS201F";
                    break;
                case 2:
                    subtitle.innerText = "CREATE YOUR OWN!";
                    break;
            }
        });

        element.children[0].addEventListener("mouseleave", () => {
            subtitle.innerText = "SELECT YOUR COFFEE MACHINE"
        })
    });
}

document.addEventListener("DOMContentLoaded", () => {
    onLoad();
});

const playAudio = (url, isStream = false) => {
    if(isStream){
        streamAudio = new Audio(url)
        streamAudio.play();
        return;
    }
    audio = new Audio(url)
    audio.play();
}

const stopAudio = (isStream = false) => {
    if(isStream){
        streamAudio.pause();
        streamAudio.currentTime = 0;
        return;
    }
    audio.pause();
    audio.currentTime = 0;
}