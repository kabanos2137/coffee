class HouseholdDevice extends ElectricDevice {
    #MTBF; #energyClass; #lCycles; #size;
    constructor(psu, voltage, power, energyClass, MTBF, size) {
        super(psu, voltage, power);
        this.#MTBF = MTBF;
        this.#energyClass = energyClass;
        this.#lCycles = 0;
        this.#size = size
    }

    getSize(asArray){
        return asArray ?
            [this.#size.width, this.#size.height, this.#size.depth, this.#size.weight]:
            this.#size
    }

    getEnergyClass(){
        return this.#energyClass
    }

    getMTBF(){
        return this.#MTBF
    }

    report() {
        return `AGD dev. status: ${super.report()}`;
    }
}