1. Create an object named account that represents a bank account. It should contain a balance property that stores the account's current balance.

```JavaScript
let account = {
  balance: 0,
}
```

2. Add a deposit method to the account object that takes a single argument, the value of the deposit. deposit adds the value of argument passed to it to the account's balance, and then returns it.

If the account contains less than the withdrawal amount, the method should limit the withdrawal to the amount available, and return the actual amount withdrawn. This should leave the account with a balance of 0.

```JavaScript
let account = {
  balance: 0,
  deposit(amount) {
    this.balance += amount;
    return this.balance;
  },
  withdraw(amount) {
    if (amount < balance) {
      this.balance -= amount;
      return this.balance;
    } else {
      let amountWithdrawn = this.balance;
      this.balance = 0;
      return amountWithdrawn;
    }
  },
}
```

4. Each account should have a record of every deposit and withdrawal applied to it. To do this, add a property named transactions to account that contains an array of transactions, each of which is an object with type and amount properties.

```JavaScript
let account = {
  transactions: [],
  balance: 0,
  deposit(amount) {
    this.balance += amount;
    this.transactions.push({type: 'deposit', amount: amount});
    return amount;
  },
  withdraw(amount) {
    if (amount > this.balance) {
      amount = this.balance;
    }

    this.balance -= amount;
    this.transactions.push({type: 'withdraw', amount: amount});
    return amount;
  },
}
```

5. We want to create more than one account. Move the account creation code to a function named makeAccount that returns a new account object.

```JavaScript
function makeAccount() {
  return {
    transactions: [],
    balance: 0,
    deposit(amount) {
      this.balance += amount;
      this.transactions.push({type: 'deposit', amount: amount});
      return amount;
    },
    withdraw(amount) {
      if (amount > this.balance) {
        amount = this.balance;
      }

      this.balance -= amount;
      this.transactions.push({type: 'withdraw', amount: amount});
      return amount;
    },
  }
}
```

6. We also need an object to manage accounts: a bank. Create a function that returns an object that represents a bank. The bank should have a property named accounts that represents a list of accounts.
```JavaScript
function makeBank() {
  return {
    accounts: [],
  }
}
```

7. Add a new method named openAccount to the object returned by makeBank. It should create a new account, add it to the bank's accounts collection, and return the new account. Each new account should have a unique account number, starting at 101; each account number should be one greater than the previous account created.

```JavaScript
function makeAccount(accountNumber) {
  return {
    number: accountNumber,
    transactions: [],
    balance: 0,
    deposit(amount) {
      this.balance += amount;
      this.transactions.push({type: 'deposit', amount: amount});
      return amount;
    },
    withdraw(amount) {
      if (amount > this.balance) {
        amount = this.balance;
      }

      this.balance -= amount;
      this.transactions.push({type: 'withdraw', amount: amount});
      return amount;
    },
  }
}

function makeBank() {
  return {
    accounts: [],
    openAccount() {
      let newAccountNumber = this.accounts.length + 101;
      let newAccount = makeAccount(newAccountNumber);
      this.accounts.push(newAccount);
      return newAccount;
    }
  }
}
```

8. Add a new method to the bank object that transfers money from one account to another.


```JavaScript
function makeBank() {
  return {
    accounts: [],
    openAccount() {
      let newAccountNumber = this.accounts.length + 101;
      let newAccount = makeAccount(newAccountNumber);
      this.accounts.push(newAccount);
      return newAccount;
    },
    transfer(source, destination, amount) {
      destination.deposit(source.withdraw(amount));
      return amount;
    }
  }
}
```

9. Change the code so that users can access the account balance, account number, and transactions list by calling methods, but not by directly accessing those properties.

```JavaScript
function makeBank() {
  function makeAccount(accountNumber) {
      number: accountNumber,
      transactions: [],
      balance: 0,
    return {
      balance() {
        return balance;
      },
      number() {
        return number;
      },
      transactions() {
        return transactions;
      },
      deposit(amount) {
        this.balance += amount;
        this.transactions.push({type: 'deposit', amount: amount});
        return amount;
      },
      withdraw(amount) {
        if (amount > this.balance) {
          amount = this.balance;
        }

        this.balance -= amount;
        this.transactions.push({type: 'withdraw', amount: amount});
        return amount;
      },
    }
  }

    return {
    accounts: [],
    openAccount() {
      let newAccountNumber = this.accounts.length + 101;
      let newAccount = makeAccount(newAccountNumber);
      this.accounts.push(newAccount);
      return newAccount;
    },
    transfer(source, destination, amount) {
      destination.deposit(source.withdraw(amount));
      return amount;
    }
  }
}
```

10. Change the code so that users can no longer access the list of accounts.
```JavaScript
function makeBank() {
  let accounts: [],

  function makeAccount(accountNumber) {
      number: accountNumber,
      transactions: [],
      balance: 0,
    return {
      balance() {
        return balance;
      },
      number() {
        return number;
      },
      transactions() {
        return transactions;
      },
      deposit(amount) {
        this.balance += amount;
        this.transactions.push({type: 'deposit', amount: amount});
        return amount;
      },
      withdraw(amount) {
        if (amount > this.balance) {
          amount = this.balance;
        }

        this.balance -= amount;
        this.transactions.push({type: 'withdraw', amount: amount});
        return amount;
      },
    }
  }

    return {
    openAccount() {
      let newAccountNumber = accounts.length + 101;
      let newAccount = makeAccount(newAccountNumber);
      accounts.push(newAccount);
      return newAccount;
    },
    transfer(source, destination, amount) {
      destination.deposit(source.withdraw(amount));
      return amount;
    }
  }
}
```


