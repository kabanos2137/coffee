let audio;

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
    }
}

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

const playAudio = (url) => {
    audio = new Audio(url)
    audio.play();
}

const stopAudio = () => {
    audio.pause();
    audio.currentTime = 0;
}