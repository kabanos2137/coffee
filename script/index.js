document.addEventListener("DOMContentLoaded", () => {
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
});

const playAudio = (url) => {
    new Audio(url).play();
}