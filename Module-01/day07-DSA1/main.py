# Goal
# Build an AccountRegistry that stores many accounts in a dict for O(1) lookup and gives each account  a transaction-history stack.
# Steps
# Copy day06/bank.py into day07/ keep growing it.
# Add an AccountRegistry storing accounts in a dict by number.
# Implement add(), find() O(1), and an ordered list_all().
# Give each account a history stack; push on deposit/withdraw.
# Add undo_last() that pops the most recent transaction; push to day07.

class Account:    
     def __init__(self, account_number, owner, balance=0):
          self.account_number = account_number
          self.owner = owner
          self.balance = balance
          self.history = []         

     def deposit(self, amount):
          self.balance += amount
          self.history.append(('deposit', amount))
          print(f"Deposited {amount}. Balance: {self.balance}")

     def withdraw(self, amount):
          if amount > self.balance:
               print("Not enough money")
               return
          self.balance -= amount
          self.history.append(('withdraw', amount))
          print(f"Took {amount}. Balance: {self.balance}")
     
     def undo_last(self):
          if not self.history:
               print("No transactions")
               return
          txn_type, amount = self.history.pop()
          if txn_type == 'deposit':
               self.balance -= amount
               print(f"Undid deposit of {amount}. Balance: {self.balance}")
          else:
               self.balance += amount
               print(f"Undid withdrawal of {amount}. Balance: {self.balance}")

class AccountRegistry:
     def __init__(self):
          self.by_number = {}    
          self.order = []
     
     def add(self, account):
          self.by_number[account.account_number] = account
          self.order.append(account.account_number)
          print(f"Added account {account.account_number}")
     
     def find(self, number):
          return self.by_number.get(number)   
     
     def list_all(self):
          return [self.by_number[num] for num in self.order]

if __name__ == "__main__":
     registry = AccountRegistry()
     
     almaz = Account("1000001", "Almaz", 1000)
     bekele = Account("1000002", "Bekele", 500)
     registry.add(almaz)
     registry.add(bekele)
     
     found = registry.find("1000001")
     if found:
          print(f"\nFound: {found.owner}, balance: {found.balance}")
     
     for acc in registry.list_all():
          print(f"  {acc.account_number} — {acc.owner} — {acc.balance}")
     
     almaz.deposit(200)
     almaz.withdraw(50)
     almaz.undo_last()  
     almaz.undo_last()   
     almaz.undo_last() 