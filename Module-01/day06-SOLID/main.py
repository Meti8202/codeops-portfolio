# Refactor day 5 account family with SOLID then add an AccountFactory and an Observer alert to the project
# Steps
# 1. copy day05/accounts.py into day06/ to keep growing it
# 2. Split alerts out of Account into a separate AlertService(SRP)
# 3. Add an AccountFactory.create(kind, ...) for two types
# 4. Add subscribe_notify to Account; write an SMSAlert observer
# 5. Open accounts via the factory, attach the alert, push to day06

from abc import ABC, abstractmethod

class Account(ABC):
     def __init__(self, owner, account_number, balance):
          self.owner = owner
          self.account_number = account_number
          self.__balance = balance
          self._observers = []
          
     @property
     def balance(self):
          return self.__balance
     
     def deposit(self, amount):
          if amount <= 0:
               raise ValueError("Amount must be positive")
          self.__balance += amount
          self._notify_observers("deposit", amount)
          
     def _set_balance(self, value):
          self.__balance = value

     @abstractmethod
     def withdraw(self, amount):
          if amount > self.__balance:
               raise ValueError("You don't have any money to withdraw!") 
          else:
               self.__balance -= amount
               
     @abstractmethod          
     def statement(self):
          print(f"{self.owner}({self.account_number}): {self.balance} ETB")
          
     def subscribe_notify(self, observer):
          self._observers.append(observer)

     def _notify_observers(self, event_type, amount):
          for observer in self._observers:
               observer.update(self, event_type, amount)


class SavingsAccount(Account):
     def __init__(self, owner, account_number, balance, rate=0.03):
          super().__init__(owner, account_number, balance)
          self.rate = rate
          
     def withdraw(self, amount):
          super().withdraw(amount)
          self._notify_observers("withdraw", amount)
          
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
          self._notify_observers("withdraw", amount)
          
          if new_balance < -self.overdraft:
               raise ValueError("Transaction declined: Exceeds overdraft limit!")
          
          self._set_balance(new_balance)
          
     def statement(self):
          print(f"[Current] {self.owner}({self.account_number}): {self.balance} ETB")
          

class AlertService:
     def send_alert(self, account, message):
          print(f"ALERT for {account.owner}: {message}")
          
class AccountFactory:
     @staticmethod
     def create(kind, owner, account_number, balance, rate=0.03, overdraft=5000):
          if kind == "savings":
               return SavingsAccount(owner, account_number, balance, rate)
          elif kind == "current":
               return CurrentAccount(owner, account_number, balance, overdraft)
          else:
               raise ValueError(f"Unknown account kind: {kind}")
          
class Observer:
     def update(self, account, event_type, amount):
          pass

class SMSAlert(Observer):
     def __init__(self):
          self.alert_service = AlertService()
     
     def update(self, account, event_type, amount):
          message = f"{event_type.capitalize()} of {amount} ETB processed for {account.owner}"
          self.alert_service.send_alert(account, message)

if __name__ == "__main__":
     yeab = AccountFactory.create("savings", "Yeab", 76542332127, 3400, rate=0.05)
     almaz = AccountFactory.create("current", "Almaz", 1000670921, 1000, overdraft=3000)
     
     sms_alert = SMSAlert()
     yeab.subscribe_notify(sms_alert)
     almaz.subscribe_notify(sms_alert)
     
     yeab.add_interest()
     almaz.withdraw(3300)
     
     accounts = [yeab, almaz]
     for account in accounts:
          account.statement()