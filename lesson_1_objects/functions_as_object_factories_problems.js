// Write a makeCar function that works as shown above.

function makeCar(rate) {
  return {
    speed: 0,
    rate,
    accelerate() {
      this.speed += this.rate
    }
  }
}

// Use your new definition of makeCar to create a hatchback car whose rate of acceleration is 9 mph/s.

let hatchback = makeCar(9);

// Our application now needs to handle braking to slow down. Extend the code from problem 1 to handle specifying a braking rate for each car. Also, add a method that tells the car to apply the brakes for one second. It should work like this:

function makeCar(rate, rateDecrease) {
  return {
    speed: 0,
    rate,
    rateDecrease,
    accelerate() {
      this.speed += this.rate
    },
    brake() {
      this.speed -= this.rateDecrease;
      if (this.speed < 0) {
        this.speed = 0;
      }
    }
  }
}

