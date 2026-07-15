# Build the first version of the Addis Bank Account class: encapsulated balance, validated deposits and withdrawals. This is the start of your larger project.
# Steps
# 1. Define Account with owner, account_number and a private __balance.
# 2. Add a @property to read the balance (no direct edits).
# 3. Write deposit() and withdraw() that validate the amount.
# 4. Reject negative deposits and overdrafts with a clear message.
# 5. Create two accounts, run some transactions and push to day04.

class Account:
     def __init__(self, owner, account_number, balance):
          self.owner = owner
          self.account_number = account_number
          self.__balance = balance
          
     @property
     def balance(self):
          return self.__balance
     
     def deposit(self, amount):
          if amount <= 0:
               raise ValueError("Amount must be positive")
          self.__balance += amount
     def withdraw(self, amount):
          if amount > self.__balance:
               raise ValueError("You don't have any money to withdraw!") 
          else:
               self.__balance -= amount
               
     def statement(self,):
          print(f"{self.owner}({self.account_number}): {self.__balance} ETB")
          
teddy = Account("Teddy", 256765432, 2000)
teddy.deposit(50)
teddy.statement()
yeab = Account("Yeab", 76542332127, 65214)
yeab.withdraw(5000)
yeab.statement()
# yeab.withdraw(60215)
# yeab.statement()