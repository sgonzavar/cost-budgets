class Data {
    constructor(description, value) {
        this.description = description;
        this.value = value;
    }

    get getDescriptor() {
        return this.description
    }

    set setDescriptor(description) {
        this.description = description;
    }

    get getValue() {
        return this.value
    }

    set setValue(value) {
        this.value = value;
    }
}