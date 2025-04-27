/**
 * The HouseholdDevice class extends the ElectricDevice class and represents a household appliance with specific
 * properties such as energy efficiency, mean time between failure (MTBF), and physical dimensions.
 * This class provides methods to retrieve information about the device's characteristics and status.
 *
 * Inherits from the ElectricDevice class.
 */
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