const POSSIBLE_RANDOM_ERRORS = [
    ERRORS.ELECTRONICS_FAILURE,
    ERRORS.FROTHER_FAILURE,
    ERRORS.OVERHEATING,
    ERRORS.POWER_SUPPLY_FAILURE,
    ERRORS.PUMP_FAILURE,
    ERRORS.SEAL_DAMAGE,
    ERRORS.WATER_PRESSURE_LOW
]

class CoffeeMachine extends HouseholdDevice {
    #MTBF; #uses; #capsule; #streamID; #cleanliness; #waterTank; #milkTank; #milkTankCapacity; #waterTankCapacity; #pressure; #name; #hasACup; #cup; #DOM;
    constructor(psu, voltage, power, energyClass, MTBF, size, milkTankCapacity, waterTankCapacity, pressure, name, status) {
        super(psu, voltage, power, energyClass, MTBF, size);
        this.#MTBF = MTBF;
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
        this.#capsule = undefined;
        this.#uses = 0;
    }

    checkForRandomError() {
        const lambda = 1 / ((30 * this.#MTBF) / 50000);
        const probability = 1 - Math.exp(-lambda * this.#uses);
        const random = Math.random();
        console.log(random, probability, lambda);
        if (random < probability) {
            let error = POSSIBLE_RANDOM_ERRORS.random();
            this.#uses = 0;
            this.setError(error, false);
            playAudio("./audio/burn.mp3")
            this.off();
        }else{
            return false;
        }
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

    startMake() {
        this.#uses++;
        if (this.checkIfReadyToUse()) {
            let randomErrors = this.checkForRandomError();
            if (randomErrors) return;
            const makeButton = this.#DOM.querySelector(".machine-button-make");
            makeButton.classList.remove("off");
            makeButton.classList.add("on");
            playAudio("./audio/pour.mp3", true);

            if (!this.hasACup() && this.#capsule) {
                let decrementInterval = 8000 / 20;
                let steps = 20;
                this.#streamID = setInterval(() => {
                    this.#capsule.fullness -= 2.5;
                    if (this.#capsule.fullness <= 0) this.#capsule.fullness = 0;

                    steps--;
                    if (steps <= 0) {
                        clearInterval(this.#streamID);
                        makeButton.classList.remove("on");
                        makeButton.classList.add("off");
                        this.#streamID = undefined;
                    }
                }, decrementInterval);
                return true;
            }

            if (this.hasACup() && this.#capsule) {
                this.addLayer([this.#capsule.colors[0], this.#capsule.colors[1], "#ccccff"], 100, () => {
                    makeButton.classList.remove("on");
                    makeButton.classList.add("off");
                }, true);
            } else if (this.#capsule === undefined) {
                this.addLayer([null, null, "#ccccff"], 100, () => {
                    makeButton.classList.remove("on");
                    makeButton.classList.add("off");
                }, true);
            }
        }
    }

    startClean() {
        this.#uses++;
        if(this.checkIfReadyToUse()){
            let randomErrors = this.checkForRandomError
            if(randomErrors) return;
            this.#DOM.querySelector(".machine-button-clean").classList.remove("off");
            this.#DOM.querySelector(".machine-button-clean").classList.add("on");
            playAudio("./audio/pour.mp3", true)
            if(this.hasACup()){
                this.addLayer(["#ccccff"], 55, () => {
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
                        this.setUsable(false);
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

    breakMake(){
        if(this.#DOM.querySelector(".machine-button-make").classList.contains("on")){
            clearInterval(this.#streamID);
            stopAudio(true);
            playAudio("./audio/beep.mp3");
            this.#DOM.querySelector(".machine-button-make").classList.remove("on");
            this.#DOM.querySelector(".machine-button-make").classList.add("off");
            this.#streamID = undefined;
        }
    }

    breakClean(){
        if(this.#DOM.querySelector(".machine-button-clean").classList.contains("on")){
            clearInterval(this.#streamID);
            stopAudio(true);
            playAudio("./audio/beep.mp3");
            this.#DOM.querySelector(".machine-button-clean").classList.remove("on");
            this.#DOM.querySelector(".machine-button-clean").classList.add("off");
            this.#streamID = undefined;
        }
    }

    removeCapsule(){
        if(!this.#capsule || this.#streamID) return false;
        this.#capsule = undefined;
        return true;
    }

    hasCapsule(){
        return this.#capsule !== undefined;
    }

    setCapsule(capsule){
        if(this.#capsule) return;
        this.#capsule = capsule;
        playAudio("./audio/slot.wav");
    }

    off(){
        if(this.getStatus() === "ON"){
            this.setStatus('OFF');
            playAudio("./audio/beep.mp3");
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
    addLayer(color, fluidEnd, onFinish, coffee = false) {
        const gradient = this.#DOM.querySelector("#coffee-gradient");
        const endElement = this.#DOM.querySelector("#end-element");
        const start = this.#cup.fullness;
        const end = start + fluidEnd;
        const step = (end - start) / (8 * 60);

        const stops = [];

        const createStop = (offset, color) => {
            const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop.setAttribute("offset", `${offset}%`);
            stop.setAttribute("stop-color", color);
            gradient.insertBefore(stop, endElement);
            return stop;
        };

        let capsuleFullness = this.#capsule ? this.#capsule.fullness : undefined;
        let zones = [];

        if (coffee) {
            if (capsuleFullness === undefined || capsuleFullness === 0) {
                zones = [{ from: start, to: end, color: color[2] }];
            } else if (capsuleFullness > 0 && capsuleFullness <= 50) {
                const coffeeEnd = start + fluidEnd * (capsuleFullness / 100);
                zones = [
                    { from: start, to: coffeeEnd, color: color[1] },
                    { from: coffeeEnd, to: end, color: color[2] }
                ];
            } else if (capsuleFullness > 50 && capsuleFullness < 100) {
                const espressoEnd = start + fluidEnd * ((capsuleFullness - 50) / 100);
                const lungoEnd = espressoEnd + fluidEnd * (50 / 100);
                zones = [
                    { from: start, to: espressoEnd, color: color[0] },
                    { from: espressoEnd, to: lungoEnd, color: color[1] },
                    { from: lungoEnd, to: end, color: color[2] }
                ];
            } else if (capsuleFullness === 100) {
                const espressoEnd = start + fluidEnd * (50 / 100);
                zones = [
                    { from: start, to: espressoEnd, color: color[0] },
                    { from: espressoEnd, to: end, color: color[1] }
                ];
            }
        } else {
            zones = [{ from: start, to: end, color: color[0] }];
        }

        // Tworzymy stopery na starcie
        zones.forEach(zone => {
            const stopStart = createStop(0, zone.color);
            const stopEnd = createStop(0, zone.color);
            stops.push({ start: zone.from, end: zone.to, stopStart, stopEnd });
        });

        let current = start;
        let lastCurrent = start;

        this.#streamID = setInterval(() => {
            current += step;
            this.#cup.fullness = current;

            let filled = current;

            stops.forEach(({ start, end, stopStart, stopEnd }) => {
                const zoneSize = end - start;
                if (filled >= start) {
                    let percent = ((filled - start) / zoneSize) * (zoneSize / (end - start)) * 100;
                    if (filled > end) percent = 100;
                    if (percent < 0) percent = 0;
                    if (percent > 100) percent = 100;

                    stopStart.setAttribute("offset", `${start}%`);
                    stopEnd.setAttribute("offset", `${Math.min(current, end)}%`);
                }
            });

            endElement.setAttribute("offset", `${Math.min(current, 100)}%`);

            let delta = current - lastCurrent;

            if (coffee && this.#capsule && this.#capsule.fullness > 0) {
                this.#capsule.fullness -= delta;
                if (this.#capsule.fullness < 0) this.#capsule.fullness = 0;
            }

            lastCurrent = current;

            if (!coffee) {
                this.#cleanliness -= 0.1;
                if (this.#cleanliness < 20) {
                    this.setError(ERRORS.SEVERE_DIRT);
                }
            }

            if (current >= end) {
                clearInterval(this.#streamID);
                this.#streamID = undefined;
                if (onFinish) onFinish();
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