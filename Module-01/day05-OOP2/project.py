# Two new account types that inherit from Account: a SavingsAccount that earns interest, and a CurrentAccount that allows an overdraft — then drive them all through one polymorphic loop.
# Requirements
#  SavingsAccount extends Account with a rate and an add_interest() method that reuses deposit().
#  CurrentAccount extends Account with an overdraft limit and an overridden withdraw() that allows balances down to the overdraft.
#  Override statement() in each subclass so it labels the account type.
#  Use super().__init__() in both subclasses; don't duplicate the parent's setup.

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance  
        
    @property
    def balance(self):
        return self.__balance
    
    @balance.setter
    def balance(self, new_balance):
        self.__balance = new_balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.balance += amount
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("You don't have enough money to withdraw!")     
        self.balance -= amount

    def statement(self):
        print(f"{self.owner} with account number {self.account_number} has {self.balance} ETB.")
        

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.03):
        super().__init__(owner, number, balance)
        self.rate = rate
        
    def add_interest(self):
        self.deposit(self.balance * self.rate)
        
    def statement(self):
        print(f"[Savings] {self.owner} with account number {self.account_number} has {self.balance} ETB.")


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=5000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        new_balance = self.balance - amount
        
        if new_balance < -self.overdraft:
            raise ValueError("Transaction declined: Exceeds overdraft limit!")
            
        self.balance = new_balance
    
    def statement(self):
        print(f"[Current] {self.owner} with account number {self.account_number} has {self.balance} ETB.")

almaz = Account("Almaz", 569978645, 5000)
dawit = SavingsAccount("Dawit", 9876565756, 10000, 0.5)
hana = CurrentAccount("Hana", 1092546577, 10000, 3000)

dawit.add_interest()  
hana.withdraw(6000)     
accounts = [almaz, dawit, hana]

for account in accounts:
    account.statement()