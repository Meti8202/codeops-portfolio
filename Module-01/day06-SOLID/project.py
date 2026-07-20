# A refactored bank.py in which an AccountFactory creates accounts by type, an Observer sends alerts on transactions, and a BankConfig Singleton holds the shared rates and limits.
# Requirements
#  Apply SRP: move notification out of Account into a separate observer; keep Account focused on balance logic.
#  Add an AccountFactory.create(kind, owner, number, balance=0) for the savings and current types.
#  Add subscribe() and _notify() to Account, plus an SMSAlert and an AuditLog observer.
#  Add a BankConfig Singleton for the interest rate and overdraft limit; read it from your account classes.

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

     @property
     def balance(self):
          return self.__balance


     def deposit(self, amount):
          if amount <= 0:
               raise ValueError("Amount must be positive")
          self.__balance += amount         
          self._notify("deposit", amount)

     def withdraw(self, amount):
          if amount > self.balance:
               raise ValueError("You don't have enough money to withdraw!")
          self.__balance -= amount          
          self._notify("withdraw", amount)

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
               raise ValueError("Transaction declined: Exceeds overdraft limit!")
          self.__balance = new_balance          
          self._notify("withdraw", amount)      

     def statement(self):
          print(f"[Current] {self.owner} with account number {self.account_number} has {self.balance} ETB.")

class SMSAlert:
     def notify(self, account, action, amount):
          print(f"SMS Alert: {account.owner}, you have performed a {action} of {amount} ETB.")


class AuditLog:
     def notify(self, account, action, amount):
          print(f"Audit Log: {account.owner} performed a {action} of {amount} ETB. New balance: {account.balance} ETB.")


class AccountFactory:
     @staticmethod
     def create(kind, owner, number, balance=0):
          if kind == "savings":
               return SavingsAccount(owner, number, balance)
          elif kind == "current":
               return CurrentAccount(owner, number, balance)
          else:
               raise ValueError("Unknown account type")


if __name__ == "__main__":
     almaz = Account("Almaz", 569978645, 5000)
     dawit = AccountFactory.create("savings", "Dawit", 9876565756, 10000)
     hana = AccountFactory.create("current", "Hana", 1092546577, 10000)

     sms_alert = SMSAlert()
     audit_log = AuditLog()

     dawit.subscribe(sms_alert)
     dawit.subscribe(audit_log)
     hana.subscribe(sms_alert)
     hana.subscribe(audit_log)

     dawit.add_interest()       
     hana.withdraw(6000)     
     for account in [almaz, dawit, hana]:
          account.statement()