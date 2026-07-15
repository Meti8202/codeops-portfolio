# Book class. Define Book with title, author, and pages. Add a describe() method that prints a one-line summary. Create two books.
class Book:
     def __init__(self, title, author, pages):
          self.title = title
          self.author = author
          self.pages = pages
     def describe(self):
          print(f"The book {self.title} written by {self.author} has {self.pages} pages.")

Book_1 = Book("Atomic Habits", "James Clear", 256)
Book_2 = Book("LOTR", "Tolkien", 1210)
Book_1.describe()
Book_2.describe()
     

# Product class. Define Product with name, price (ETB), and quantity. Add restock(n) and sell(n) methods that change the quantity.
class Product:
     def __init__(self, name, price, quantity):
          self.name = name
          self.price = price
          self.quantity = quantity
     def restock(self, amount):
          self.quantity += amount
     def sell(self, amount):
          self.quantity -= amount
     def display(self):
          print(f"{self.name}: {self.price} ETB ----> {self.quantity} in stock.")
          
Pepsi = Product("pepsi", 70, 12)
Pepsi.display()
Pepsi.restock(23)
Pepsi.display()
Pepsi.sell(7)
Pepsi.display()

# Make it private. Change quantity to a private __quantity and add a @property getter for it.
class Product:
     def __init__(self, name, price, quantity):
          self.name = name
          self.price = price
          self.__quantity = quantity
     @property
     def quantity(self):
          return self.__quantity
     def restock(self, amount):
          self.__quantity += amount
     def sell(self, amount):
          self.__quantity -= amount
     def display(self):
          print(f"{self.name}: {self.price} ETB ----> {self.quantity} in stock.")
          
Pepsi = Product("pepsi", 65, 24)
Pepsi.display()
Pepsi.restock(3)
Pepsi.display()
Pepsi.sell(10)
Pepsi.display()
          
# Validate. Add a setter (or guard in sell) that refuses to let the quantity go below zero.
class Product:
     def __init__(self, name, price, quantity):
          self.name = name
          self.price = price
          self.quantity = quantity
     @property
     def quantity(self):
          return self.__quantity
     @quantity.setter
     def quantity(self, amount):
          if amount < 0:
               raise ValueError("Stock quantity can't be negative")
          self.__quantity = amount
     def restock(self, amount):
          self.quantity += amount
     def sell(self, amount):
          self.quantity -= amount
     def display(self):
          print(f"{self.name}: {self.price} ETB ----> {self.quantity} in stock.")
          
# Pepsi = Product("pepsi", 65, -6)
Pepsi.display()

# Prove independence. Create three Product objects, change one, and show the other two are unaffected.
class Product:
     def __init__(self, name, price, quantity):
          self.name = name
          self.price = price
          self.quantity = quantity
     @property
     def quantity(self):
          return self.__quantity
     @quantity.setter
     def quantity(self, amount):
          if amount < 0:
               raise ValueError("Stock quantity can't be negative")
          self.__quantity = amount
     def restock(self, amount):
          self.quantity += amount
     def sell(self, amount):
          self.quantity -= amount
     def display(self):
          print(f"{self.name}: {self.price} ETB ----> {self.quantity} in stock.")
          
Ambo = Product("ambo", 70, 29)
Ambo.display()
Coca = Product("coca", 60, 50)
Coca.display()
Mirinda = Product("mirinda", 90, 6)
Mirinda.display()
Ambo.sell(6)
Ambo.display()