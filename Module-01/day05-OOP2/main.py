# Extend yesterday's account into SavingsAccount and CurrentAccount then drive them all through one polymorphic loop
# Steps
# 1. Open day04/account.py; copy it into day05/ to grow it.
# 2. Add SavingsAccount with a rate and add_interest().
# 3. add CurrentAccount with overdraft and overridden withdraw().
# 4. Override statement() in each so it labels the account type.
# 5. Loop over a mixed list and call  statement(); push to day05.

class Account:
     def __init__(self, owner, account_number, balance):
          self.owner = owner
          self.account_number = account_number
          self.__balance = balance
          
     @property
     def balance(self):
          return self.__balance
     
     @balance.setter
     def balance(self, new_val):
          self.__balance = new_val
     
     def deposit(self, amount):
          if amount <= 0:
               raise ValueError("Amount must be positive")
          self.__balance += amount

     def withdraw(self, amount):
          if amount > self.__balance:
               raise ValueError("You don't have any money to withdraw!") 
          else:
               self.__balance -= amount
               
     def statement(self):
          print(f"{self.owner}({self.account_number}): {self.balance} ETB")


class SavingsAccount(Account):
     def __init__(self, owner, account_number, balance, rate=0.03):
          super().__init__(owner, account_number, balance)
          self.rate = rate
          
     def add_interest(self):
          self.deposit(self.balance * self.rate)
          
     def statement(self):
          print(f"[Savings] {self.owner}({self.account_number}): {self.balance} ETB")


class CurrentAccount(Account):
     def __init__(self, owner, account_number, balance, overdraft=5000):
          super().__init__(owner, account_number, balance)
          self.overdraft = overdraft
          
     def withdraw(self, amount):
          new_balance = self.balance - amount
          
          if new_balance < -self.overdraft:
               raise ValueError("Transaction declined: Exceeds overdraft limit!")
          
          self.balance = new_balance
          
     def statement(self):
          print(f"[Current] {self.owner}({self.account_number}): {self.balance} ETB")

if __name__ == "__main__":
     teddy = Account("Teddy", 256765432, 2000)
     yeab = SavingsAccount("Yeab", 76542332127, 65214, 0.05)
     almaz = CurrentAccount("Almaz", 1000670921, 1000, 3000)
     
     teddy.deposit(50)
     yeab.add_interest()     
     almaz.withdraw(2500)
     
     accounts = [teddy, yeab, almaz]
     
     for account in accounts:
          account.statement()