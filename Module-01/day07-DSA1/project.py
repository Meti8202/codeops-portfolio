# An AccountRegistry that stores accounts in a dict keyed by account number for instant lookup, lists them in order, and tracks each account's transactions on a stack so the latest can be undone. Your bank models accounts well; now make it hold and find many of them efficiently. Copy your day06/bank.py into day07/, then add a registry that stores accounts in a dict for O(1) lookup and gives each account a transaction-history stack
# Requirements
# Store accounts in a dict keyed by account number; add(acc) and find(number) must be O(1).
# Add list_all() that returns accounts in insertion order (use a list alongside the dict).
# Give each account a history stack; push a record on every deposit and withdrawal.
# Add undo_last() that pops the most recent transaction and reverses its effect.

class BankConfig:
     _instance = None

     def __new__(cls):
          if cls._instance is None:
               cls._instance = super().__new__(cls)
          return cls._instance

     def __init__(self):
          if not hasattr(self, 'initialized'):
               self.interest_rate = 0.03
               self.overdraft_limit = 5000
               self.initialized = True

class Account:
     def __init__(self, owner, number, balance=0):
          self.owner = owner
          self.account_number = number
          self.__balance = balance
          self.observers = []
          self.history = []          

     @property
     def balance(self):
          return self.__balance

     def deposit(self, amount):
          if amount <= 0:
               raise ValueError("Amount must be positive")
          self.__balance += amount
          self.history.append(('deposit', amount))   
          self._notify("deposit", amount)

     def withdraw(self, amount):
          if amount > self.balance:
               raise ValueError("You don't have enough money!")
          self.__balance -= amount
          self.history.append(('withdraw', amount))  
          self._notify("withdraw", amount)

     def undo_last(self):
          if not self.history:
               print("No transactions to undo.")
               return
          txn_type, amount = self.history.pop()
          if txn_type == 'deposit':
               self.__balance -= amount
               print(f"Undid deposit of {amount}. Balance: {self.balance}")
          else: 
               self.__balance += amount
               print(f"Undid withdrawal of {amount}. Balance: {self.balance}")

     def statement(self):
          print(f"{self.owner} with account number {self.account_number} has {self.balance} ETB.")

     def subscribe(self, observer):
          self.observers.append(observer)

     def _notify(self, action, amount):
          for observer in self.observers:
               observer.notify(self, action, amount)


class SavingsAccount(Account):
     def __init__(self, owner, number, balance=0):
          super().__init__(owner, number, balance)
          self.rate = BankConfig().interest_rate

     def add_interest(self):
          self.deposit(self.balance * self.rate)

     def statement(self):
          print(f"[Savings] {self.owner} with account number {self.account_number} has {self.balance} ETB.")


class CurrentAccount(Account):
     def __init__(self, owner, number, balance=0):
          super().__init__(owner, number, balance)
          self.overdraft = BankConfig().overdraft_limit

     def withdraw(self, amount):
          new_balance = self.balance - amount
          if new_balance < -self.overdraft:
               raise ValueError("Reached overdraft limit")
          self._Account__balance = new_balance  
          self.history.append(('withdraw', amount))
          self._notify("withdraw", amount)

     def statement(self):
          print(f"[Current] {self.owner} with account number {self.account_number} has {self.balance} ETB.")

class SMSAlert:
     def notify(self, account, action, amount):
          print(f"SMS Alert: {account.owner}, you have {action} of {amount} ETB.")

class AuditLog:
     def notify(self, account, action, amount):
          print(f"Audit Log: {account.owner} did a {action} of {amount} ETB. Balance: {account.balance} ETB.")

class AccountFactory:
     @staticmethod
     def create(kind, owner, number, balance=0):
          if kind == "savings":
               return SavingsAccount(owner, number, balance)
          elif kind == "current":
               return CurrentAccount(owner, number, balance)
          else:
               raise ValueError("unknown account type")

class AccountRegistry:
     def __init__(self):
          self.by_number = {}    
          self.order = []       
          
     def add(self, account):
          self.by_number[account.account_number] = account
          self.order.append(account.account_number)

     def find(self, number):
          return self.by_number.get(number)   

     def list_all(self):
          return [self.by_number[num] for num in self.order]

if __name__ == "__main__":
     registry = AccountRegistry()

     almaz = Account("Almaz", "569978645", 1000)
     dawit = AccountFactory.create("savings", "Dawit", "9876565756", 2000)
     hana = AccountFactory.create("current", "Hana", "1092546577", 3000)

     registry.add(almaz)
     registry.add(dawit)
     registry.add(hana)
     
     for acc in registry.list_all():
          print(f"  {acc.account_number} – {acc.owner} – {acc.balance}")

     found = registry.find("9876565756")
     if found:
          print(f"Found account for {found.owner} with balance {found.balance}")


     sms = SMSAlert()
     audit = AuditLog()
     dawit.subscribe(sms)
     dawit.subscribe(audit)
     hana.subscribe(sms)
     hana.subscribe(audit)

     
     dawit.add_interest()
     hana.withdraw(2500)
     dawit.undo_last()   
     dawit.undo_last()   

     for acc in registry.list_all():
          acc.statement()