class Egress extends Data {
    static countEgress = 0;

    constructor(description, value){
        super(description, value);
        this.id = ++Egress.countEgress;
    }

    get getId() {
        return this.id;
    }
}