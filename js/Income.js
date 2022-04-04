class Income extends Data {
    static countIncome = 0;

    constructor(description, value){
        super(description, value);
        this.id = ++Income.countIncome;
    }

    get getId() {
        return this.id;
    }
}