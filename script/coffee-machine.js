class CoffeeMachine extends HouseholdDevice {
    #cleanliness; #waterTank; #milkTank; #milkTankCapacity; #waterTankCapacity; #pressure; #name; #hasACup; #cup;
    constructor(psu, voltage, power, energyClass, MTBF, size, milkTankCapacity, waterTankCapacity, pressure, name) {
        super(psu, voltage, power, energyClass, MTBF, size);
        this.#milkTankCapacity = milkTankCapacity;
        this.#waterTankCapacity = waterTankCapacity;
        this.#pressure = pressure;
        this.#name = name;
        this.#cleanliness = 100;
        this.#milkTank = 0;
        this.#waterTank = 0;
        this.#hasACup = false;
        this.#cup = undefined;
    }

    putACup(cup = undefined){
        if(this.#cup !== undefined){
            return false
        }else{
            this.#cup = cup
            return true;
        }
    }

    hasACup(){
        return this.#cup !== undefined;
    }

    removeCup(){
        if(this.#cup !== undefined){
            let cup = this.#cup;
            this.#cup = undefined;
            return cup;
        }else{
            return false;
        }
    }

    fillWater(amount = 0){
        this.#waterTank += amount;
        return this.#waterTankCapacity - this.#waterTank;
    }

    fillMilk(amount = 0){
        this.#milkTank += amount;
        return this.#milkTankCapacity - this.#milkTank;
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
)