const getFirstName = (name) => name.split(' ')[0];


const multiplier = {
    numbers: [1, 2, 3],
    multiplyBy: 3,
    multiply() {
        return this.numbers.map((number) => number * this.multiplyBy);
    }
}

console.log(multiplier.multiply())