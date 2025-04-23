class ElectricDevice {
    #psu; #voltage; #power; #status; #powerOnCounter; #usable; #error; #faultsCounter; #pluggedInVoltage

    constructor(psu, voltage, power) {
        this.#psu = psu;
        this.#voltage = voltage;
        this.#power = power;
        this.#status = 'OFF';
        this.#powerOnCounter = 0;
        this.#usable = true;
        this.#error = ERRORS.NO_ERROR;
        this.#faultsCounter = 0;
        this.#pluggedInVoltage = 0;
    }

    plugIn(voltage){
        if(this.#pluggedInVoltage === 0){
            this.#pluggedInVoltage = voltage;
            return true;
        }else{
            return false
        }
    }

    plugOut(){
        if(this.#pluggedInVoltage > 0){
            this.#pluggedInVoltage = 0;
            this.off();
            return true;
        }else{
            return false;
        }
    }

    getError(){
        return this.#error
    }

    on(){
        if(this.#usable && this.#status === 'OFF'){
            if(this.#pluggedInVoltage > this.#voltage){
                this.#status = 'OFF';
                this.#usable = false;
                this.#error = ERRORS.VOLTAGE_OVER;
                this.#faultsCounter++;
                return {
                    on: false,
                    cause: ERRORS.VOLTAGE_OVER
                }
            }else if(this.#pluggedInVoltage === this.#voltage){
                this.#error = '';
                this.#status = 'ON';
                this.#powerOnCounter++;
                return {
                    on: true
                }
            }else{
                return {
                    on: false
                }
            }
        }else{
            return {
                on: false
            }
        }
    }

    checkIfReadyToUse() {
        return this.#status === 'ON';
    }

    off(){
        if(this.#status === "ON"){
            this.#status = 'OFF';
            return true;
        }else{
            return false;
        }
    }

    repair(){
        this.#usable = true;
        this.#error = '';
    }

    getVoltage(){
        return this.#voltage
    }

    getPluggedInVoltage() {
        return this.#pluggedInVoltage
    }

    getPower(){
        return this.#power
    }

    report(){
        let psu = '';
        let status = '';

        if(this.#psu === "AC"){
            psu = 'alternating current'
        }else{
            psu = 'direct current'
        }

        status = this.#status.toLowerCase();

        if(!this.#usable){
            status = `broken, because of: ${this.#error.description}`
        }

        return `Device powered by ${psu} with nominal voltage of ${this.#voltage} [V] is ${status}. Device was broken ${this.#faultsCounter} times. Total number of device starts: ${this.#powerOnCounter}.`
    }
}