class CoffeeMachine extends HouseholdDevice {
    #streamID; #cleanliness; #waterTank; #milkTank; #milkTankCapacity; #waterTankCapacity; #pressure; #name; #hasACup; #cup; #DOM;
    constructor(psu, voltage, power, energyClass, MTBF, size, milkTankCapacity, waterTankCapacity, pressure, name, status) {
        super(psu, voltage, power, energyClass, MTBF, size);
        this.#milkTankCapacity = milkTankCapacity;
        this.#waterTankCapacity = waterTankCapacity;
        this.#pressure = pressure;
        this.#name = name;
        this.#cleanliness = 100;
        this.#milkTank = 100;
        this.#waterTank = 100;
        this.#hasACup = false;
        this.#cup = undefined;
        this.#streamID = undefined;
    }

    repair(){
        if(this.getUsable()) return;
        this.setUsable(true);
        this.#cleanliness = 100;
        this.setError(ERRORS.NO_ERROR)
    }

    setDOM(dom){
        this.#DOM = dom;
    }

    startClean() {
        if(this.checkIfReadyToUse()){
            this.#DOM.querySelector(".machine-button-clean").classList.remove("off");
            this.#DOM.querySelector(".machine-button-clean").classList.add("on");
            playAudio("./audio/pour.mp3", true)
            if(this.hasACup()){
                this.addLayer("#ccccff", 55, () => {
                    this.#DOM.querySelector(".machine-button-clean").classList.remove("on");
                    this.#DOM.querySelector(".machine-button-clean").classList.add("off");
                });
            }else{
                let decrementInterval = 8000 / 20; // 20 steps in 8 seconds
                let decrementValue = 20 / 20; // Total decrement divided by steps
                let steps = 20;
                this.#streamID = setInterval(() => {
                    this.#cleanliness -= decrementValue;
                    if(this.#cleanliness < 20){
                        this.setError(ERRORS.SEVERE_DIRT);
                    }
                    steps--;
                    if (steps <= 0) {
                        clearInterval(this.#streamID);
                        this.#DOM.querySelector(".machine-button-clean").classList.remove("on");
                        this.#DOM.querySelector(".machine-button-clean").classList.add("off");
                        this.#streamID = undefined;
                    }
                }, decrementInterval);
                return true;
            }
        }else{
            return false;
        }
    }

    breakClean(){
        if(this.#DOM.querySelector(".machine-button-clean").classList.contains("on")){
            clearInterval(this.#streamID);
            stopAudio(true);
            this.#DOM.querySelector(".machine-button-clean").classList.remove("on");
            this.#DOM.querySelector(".machine-button-clean").classList.add("off");
            this.#streamID = undefined;
        }
    }

    off(){
        if(this.getStatus() === "ON"){
            this.setStatus('OFF');
            this.#DOM.querySelector(".machine-button-on").classList.remove("on");
            this.#DOM.querySelector(".machine-button-on").classList.add("off");
            this.breakClean()
            return true;
        }else{
            return false;
        }
    }

    putACup(){
        if(this.#cup !== undefined || this.#streamID !== undefined){
            return false
        }else{
            this.#cup = {
                fullness: 0
            }
            return true;
        }
    }

    hasACup(){
        return this.#cup !== undefined;
    }

    removeCup(){
        if(this.#cup !== undefined && this.#streamID === undefined){
            const gradient = this.#DOM.querySelector("#coffee-gradient");
            gradient.innerHTML =
                "            <stop id=\"end-element\" offset=\"100%\" stop-color=\"#ddddff\"/>\n"
            let cup = this.#cup;
            this.#cup = undefined;
            return cup;
        }else{
            return false;
        }
    }

    getName(){
        return this.#name;
    }

    getPressure(){
        return this.#pressure
    }

    getMilkTankCapacity(){
        return this.#milkTankCapacity
    }

    getWaterTankCapacity(){
        return this.#waterTankCapacity
    }

    addLayer(color, fluidEnd, onFinish){
        const gradient = this.#DOM.querySelector("#coffee-gradient");
        const endElement = this.#DOM.querySelector("#end-element");
        const start = this.#cup.fullness;
        const end = start + fluidEnd;
        const step = (end - start) / (8 * 60);

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");

        stop1.setAttribute("offset", `${start}%`);
        stop1.setAttribute("stop-color", color);

        stop2.setAttribute("offset", `${start}%`);
        stop2.setAttribute("stop-color", color);

        gradient.insertBefore(stop1, endElement);
        gradient.insertBefore(stop2, endElement);

        let current = start;
        this.#streamID = setInterval(() => {
            current += step;

            if(current <= 100){
                endElement.setAttribute("offset", `${current}%`);
                stop2.setAttribute("offset", `${current}%`);
                this.#cup.fullness = current;
            }else{
                this.#cleanliness -= 0.1;
                if(this.#cleanliness < 20){
                    this.setError(ERRORS.SEVERE_DIRT);
                }
            }

            if (current >= end) {
                current = end;
                this.#cup.fullness = current;
                clearInterval(this.#streamID);
                if (onFinish) onFinish();
                this.#streamID = undefined;
            }
        }, 1000 / 60);
    }
}

const DeLigne = new CoffeeMachine(
    "AC",
    230,
    1260,
    "A",
    50000,
    {
        width: 12,
        height: 23,
        depth: 32,
        weight: 3.11
    },
    0.7,
    0.7,
    19,
    "DE'LIGNE DELICATA IC 666"
);

const Schob = new CoffeeMachine(
    "AC",
    230,
    1400,
    "A",
    60000,
    {
        width: 17.5,
        height: 26.5,
        depth: 30.5,
        weight: 2.6
    },
    0.7,
    0.7,
    13,
    "SCHOB MASSITO FUN MAS201F"
);