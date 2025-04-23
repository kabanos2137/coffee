const changeSceneToDetails = (chosenCM) => {
    let main = document.querySelector("main");
    main.classList.remove("loaded");
    let coffeeMachine = chosenCM === "coffee-machine-0" ? DeLigne : Schob;
    setTimeout(() => {
        let size = coffeeMachine.getSize(true);
        main.innerHTML = `
            <section id="${chosenCM}"></section>
            <section id="info">
                <h3>${coffeeMachine.getName()}</h3>

                <article>
                    <h5>Voltage</h5>
                    <h5>${coffeeMachine.getVoltage()} V</h5>
                </article>
                <article>
                    <h5>Power</h5>
                    <h5>${coffeeMachine.getPower()} W</h5>
                </article>
                <article>
                    <h5>Energy class</h5>
                    <h5>${coffeeMachine.getEnergyClass()}</h5>
                </article>
                <article>
                    <h5>MTBF</h5>
                    <h5>${coffeeMachine.getMTBF()} h</h5>
                </article>
                <article>
                    <h5>Pressure</h5>
                    <h5>${coffeeMachine.getPressure()} psi</h5>
                </article>
                <article>
                    <h5>Water tank capacity</h5>
                    <h5>${coffeeMachine.getWaterTankCapacity()} l</h5>
                </article>
                <article>
                    <h5>Milk tank capacity</h5>
                    <h5>${coffeeMachine.getMilkTankCapacity()} l</h5>
                </article>
                <article>
                    <h5>Size</h5>
                    <h5>${size[0]} cm x ${size[1]} cm x ${size[2]} cm</h5>
                </article>
                <article>
                    <h5>Weight</h5>
                    <h5>${size[3]} kg</h5>
                </article>
                <article>
                    <button id="back-button">
                        <span id="arrow"><</span>
                        <span>BACK</span>
                        <span></span>
                    </button>
                    <button id="forward-button">
                        <span></span>
                        <span>GO!</span>
                        <span id="arrow">></span>
                    </button>
                </article>
            </section>
        `
        main.children[0].innerHTML = COFFEE_MACHINE_FOR_MENU;
        main.classList.add("loaded", "details");

        let backButton = document.querySelector("#back-button");
        let forwardButton = document.querySelector("#forward-button");

        backButton.addEventListener("click", () => {
            playAudio("./audio/click.mp3");
            changeSceneToSelection();
        });

        forwardButton.addEventListener("click", () => {
            playAudio("./audio/click.mp3");
            changeSceneToGameplay(chosenCM);
        });
    }, 700)
}

const changeSceneToSelection = () => {
    let main = document.querySelector("main");
    main.classList.remove("loaded");
    setTimeout(() => {
        main.classList.remove("details")
        main.innerHTML = `
            <h1>Coffee Machine!</h1>
            <h6>SELECT YOUR COFFEE MACHINE</h6>
            <section id="machine-selection">
                <section id="coffee-machine-0">
                </section>
                <section id="coffee-machine-1">
                </section>
                <section id="coffee-machine-2">
                </section>
            </section>
        `
        onLoad();
    }, 700);
}