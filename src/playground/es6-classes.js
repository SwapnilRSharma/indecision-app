console.log("es6-classes is running!");

class Person {
  constructor(name = "Anonymus", age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreetings() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `I am ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
}

class Traveller extends Person{
    constructor(name, age, homeLocation){
        super(name, age);
        this.homeLocation = homeLocation;
    }

    getGreetings(){
        let greetings = super.getGreetings();
        if(this.homeLocation){
            greetings += ` i'm visiting from ${this.homeLocation}.`
        }

        return greetings;
    }
}

const p1 = new Person("Swapnil");
console.log(p1);

const p2 = new Traveller("Sharma", 21, 'CE');
console.log(p2);
console.log(p2.getGreetings());
console.log(p1.getGreetings());
