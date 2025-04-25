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
            if(this.hasACup()){
                //TODO
            }else{
                let decrementInterval = 8000 / 20; // 20 steps in 8 seconds
                let decrementValue = 20 / 20; // Total decrement divided by steps
                let steps = 20;
                playAudio("./audio/pour.mp3")
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
            stopAudio();
            this.#DOM.querySelector(".machine-button-clean").classList.remove("on");
            this.#DOM.querySelector(".machine-button-clean").classList.add("off");
            this.#streamID = undefined;
        }
    }

    off(){
        console.log()
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
        console.log(this.#cup, this.#streamID);
        if(this.#cup !== undefined || this.#streamID !== undefined){
            return false
        }else{
            this.#cup = {}
            return true;
        }
    }

    hasACup(){
        return this.#cup !== undefined;
    }

    removeCup(){
        if(this.#cup !== undefined && this.#streamID === undefined){
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