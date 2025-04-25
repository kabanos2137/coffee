let currentCoffeeMachine;

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

const changeSceneToGameplay = (chosenCM) => {
    let main = document.querySelector("main");
    currentCoffeeMachine = chosenCM === "coffee-machine-0" ? DeLigne : Schob;

    main.classList.remove("loaded");
    setTimeout(() => {
        main.classList.remove("details")
        main.classList.add("simulator")

        main.innerHTML = `
            <section id="top">
                <section id="${chosenCM}" class="machine">
                    ${COFFEE_MACHINE}
                </section>
                <section id="shelves">
                    ${SHELVES}
                </section>
            </section>
            <section id="bottom">
                <section id="outlets">
                    <section class="outlet" id="v-200">
                        <h4>200 V</h4>
                        ${POWER_OUTLET}
                    </section>
                    <section class="outlet" id="v-230">
                        <h4>230 V</h4>
                        ${POWER_OUTLET}
                    </section>
                    <section class="outlet" id="v-300">
                        <h4>300 V</h4>
                        ${POWER_OUTLET}
                    </section>
                </section>
                <section id="cup-dispenser">
                    ${CUP_DISPENSER_NO_CUP}
                </section>
                <section id="trash-can">
                    ${TRASH_CAN}
                </section>
                <section id="diagnosis">
                    ${GET_NOTEPAD(ERRORS.NO_ERROR)}
                </section>
                <button id="repair-button">
                    <span>REPAIR</span>
                </button>
            </section>
        `;

        currentCoffeeMachine.setDOM(document.querySelector(".machine"));

        document.querySelectorAll(".outlet").forEach(outlet => {
            outlet.addEventListener("click", () => {
                const voltage = parseInt(outlet.id.split("-")[1]);
                const currentMachineVoltage = currentCoffeeMachine.getPluggedInVoltage();
                if(currentMachineVoltage > 0){
                    if(currentMachineVoltage === voltage){
                        outlet.children[1].innerHTML = POWER_OUTLET;
                        currentCoffeeMachine.plugOut()
                        playAudio("./audio/plug-out.mp3")
                    }
                }else{
                    outlet.children[1].innerHTML = POWER_OUTLET_PLUG;
                    currentCoffeeMachine.plugIn(voltage);
                    playAudio("./audio/plug-in.mp3")
                }
            });
        });

        Array.from(document.querySelectorAll("#cup-dispenser > svg > .not-a-cup")).forEach(cup => {
            cup.addEventListener("click", () => {
                dispenseCup();
            });
        });

        Array.from(document.querySelectorAll(".machine > svg > .is-a-cup")).forEach(element => {
            element.addEventListener("click", () => {
                const machine = document.querySelector(".machine > svg")
                if(!machine.classList.contains("no-cup")){
                    let remove = currentCoffeeMachine.removeCup();
                    if(!remove) return;
                    machine.classList.add("no-cup")
                    playAudio("./audio/trash.mp3")

                    Array.from(document.querySelectorAll(".trash-can-lid")).forEach(lid => {
                        lid.classList.add("open-lid");
                    });

                    setTimeout(() => {
                        Array.from(document.querySelectorAll(".trash-can-lid")).forEach(lid => {
                            lid.classList.remove("open-lid");
                        });
                    }, 500);
                }
            });
        });

        document.querySelector(".machine-button-on").addEventListener("click", () => {
            let button = document.querySelector(".machine-button-on");

            if(button.classList.contains("on")){
                currentCoffeeMachine.off();
            }else if(button.classList.contains("off")){
                let turnOn = currentCoffeeMachine.on();
                if(turnOn.on){
                    button.classList.remove("off")
                    button.classList.add("on")
                    playAudio("./audio/beep.mp3");
                }else{
                    if(turnOn.cause === ERRORS.VOLTAGE_OVER){
                        button.classList.toggle("off")
                        button.classList.toggle("on")
                        playAudio("./audio/beep.mp3");
                        setTimeout(() => {
                            button.classList.toggle("off")
                            button.classList.toggle("on")
                            playAudio("./audio/burn.mp3");
                        }, 100)
                    }
                }
            }
        });

        document.querySelector(".machine-button-clean").addEventListener("click", () => {
            let button = document.querySelector(".machine-button-clean");

            if(button.classList.contains("on")){
                currentCoffeeMachine.breakClean();
            }else if(button.classList.contains("off")){
                let turnOn = currentCoffeeMachine.startClean();
                if(turnOn){
                    button.classList.remove("off")
                    button.classList.add("on")
                    playAudio("./audio/beep.mp3");
                }
            }
        });

        document.querySelector("#diagnosis").addEventListener("click", () => {
            document.querySelector("#diagnosis").innerHTML = GET_NOTEPAD(currentCoffeeMachine.getError());
            playAudio("./audio/write.mp3");
        });

        document.querySelector("#repair-button").addEventListener("click", () => {
            document.querySelector("#diagnosis").innerHTML = GET_NOTEPAD(ERRORS.NO_ERROR);
            currentCoffeeMachine.repair();
            playAudio("./audio/repair.mp3");
        });

        main.classList.add("loaded")
    }, 700);
}

const dispenseCup = () => {
    document.querySelector("#cup-dispenser").innerHTML = CUP_DISPENSER;
    playAudio("./audio/slide-down.mp3")

    Array.from(document.querySelectorAll("#cup-dispenser > svg > .click-cup")).forEach(element => {
        element.addEventListener("click", () => {
            moveCup()
        });
    })
}

const moveCup = () => {
    let machineSVG = document.querySelector(".machine > svg")
    if(machineSVG.classList.contains("no-cup")){
        let put = currentCoffeeMachine.putACup()
        if(!put) return;

        document.querySelector("#cup-dispenser").innerHTML = CUP_DISPENSER_NO_CUP;
        playAudio("./audio/cup-down.mp3");

        Array.from(document.querySelectorAll("#cup-dispenser > svg > .not-a-cup")).forEach(cup => {
            cup.addEventListener("click", () => {
                dispenseCup();
            });
        });

        machineSVG.classList.remove("no-cup")
    }
}