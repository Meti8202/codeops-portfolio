# The first version of Addis Bank — Account Management System: an Account class with an owner, an account number, and a private balance that can only change through validated deposit and withdraw methods.
# Requirements
#  Define Account with public owner and account_number, and a private __balance (default 0).
#  Expose the balance through a read-only @property — no direct edits from outside.
#  Write deposit(amount) and withdraw(amount) that reject non-positive amounts and overdrafts.
#  Add a statement() method that prints the owner, account number, and balance in ETB.

class Account:
     def __init__(self, owner, number, balance=0):
          self.owner = owner
          self.account_number = number
          self.__balance = balance
          
     @property
     def balance(self):
          return self.__balance
     
     def deposit(self, amount):
          if amount <= 0:
               raise ValueError("Amount must be positive")
          self.__balance += amount
          
# TODO: withdraw(amount) — reject overdrafts     
     def withdraw(self, amount):
          if amount > self.__balance:
               raise ValueError("You don't have any money to withdraw!")     
          
# TODO: statement() — print owner, number, balance
     def statement(self):
          print(f"{self.owner} with account number {self.account_number} has {self.balance} ETB.")
          
Almaz = Account("Almaz", 10006709, 9000)
Almaz.statement()     