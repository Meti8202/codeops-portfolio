# Goal
# Add a balance leaderboard, a binary search by account number, and a recursive total to the AccountRegistry.
# Steps
# Copy day07/registry.py into day08/ to keep growing it.
# Add top_by_balance(n) using sorted with a key=lambda.
# Write your own binary_search; add find_by_number().
# Add recursive total_transactions() for one account.
# Test all three on sample data; push to day08/registry.py

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

    def top_by_balance(self, n=5):
        accts = sorted(self.by_number.values(), key=lambda a: a.balance, reverse=True)
        return accts[:n]

    def binary_search(self, sorted_list, target):
        low, high = 0, len(sorted_list) - 1
        while low <= high:
            mid = (low + high) // 2
            if sorted_list[mid] < target:
                low = mid + 1
            elif sorted_list[mid] > target:
                high = mid - 1
            else:
                return mid
        return -1

    def find_by_number(self, number):
        nums = sorted(self.by_number.keys())
        i = self.binary_search(nums, number)
        if i == -1:
            return None
        return self.by_number[nums[i]]

    def total_transactions(self, number):
        account = self.find(number)
        if account is None:
            return 0
        return self._recursive_total(account.history, 0)

    def _recursive_total(self, history, index):
        if index >= len(history):
            return 0
        txn_type, amount = history[index]
        return amount + self._recursive_total(history, index + 1)

if __name__ == "__main__":
    registry = AccountRegistry()
    
    almaz = Account("1000001", "Almaz", 1000)
    bekele = Account("1000002", "Bekele", 500)
    chaltu = Account("1000003", "Chaltu", 2000)
    
    registry.add(almaz)
    registry.add(bekele)
    registry.add(chaltu)
    
    almaz.deposit(300)
    almaz.withdraw(50)
    bekele.deposit(1000)
    chaltu.withdraw(500)
    
    for acc in registry.list_all():
        print(f"  {acc.account_number} — {acc.owner} — {acc.balance}")
    
    print("\nTop accounts")
    for acc in registry.top_by_balance(2):
        print(f"  {acc.owner}: {acc.balance}")
    
    found = registry.find_by_number("1000001")
    if found:
        print(f"Found: {found.owner}, balance: {found.balance}")
    
    total = registry.total_transactions("1000001")
    print(f"\nTotal Transactions for Almaz")
    print(f"Sum of all transaction amounts: {total} ETB")
    print(f"History: {len(almaz.history)}")
    
    almaz.undo_last()   
    almaz.undo_last()   
    almaz.undo_last()   