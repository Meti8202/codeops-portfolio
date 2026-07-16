# Vehicle hierarchy. Make a Vehicle base class with make, model, and a describe() method. Add Car and Truck subclasses.
class Vehicle:
     def __init__(self, make, model):
          self.make = make
          self.model = model
     def describe(self):
          print(f"The {self.make} {self.model} is an amazing vehicle.")
class Car(Vehicle):
     pass
class Truck(Vehicle):
     pass

Toyota = Car("Toyota", "Corolla")
Toyota.describe()
Ford = Truck("Ford", "F-150")
Ford.describe()

# Use super(). Give Truck a capacity attribute, setting make and model via super().__init__().
class Vehicle:
     def __init__(self, make, model):
          self.make = make
          self.model = model
     def describe(self):
          print(f"The {self.make} {self.model} is an amazing vehicle.")
class Car(Vehicle):
     pass
class Truck(Vehicle):
     def __init__(self, make, model, capacity):
          super().__init__(make, model)
          self.capacity = capacity
          
Toyota = Car("Toyota", "Corolla")
Toyota.describe()
Ford = Truck("Ford", "F-150", "2 tons")
Ford.describe()

# Override. Override describe() in Truck so it also mentions the capacity
class Vehicle:
     def __init__(self, make, model):
          self.make = make
          self.model = model
     def describe(self):
          print(f"The {self.make} {self.model} is an amazing vehicle.")
class Car(Vehicle):
     pass
class Truck(Vehicle):
     def __init__(self, make, model, capacity):
          super().__init__(make, model)
          self.capacity = capacity
     def describe(self):
          print(f"The {self.make} {self.model} truck is the one of the best trucks in the market.")
          
Toyota = Car("Toyota", "Corolla")
Toyota.describe()
Ford = Truck("Ford", "F-150", "2 tons")
Ford.describe()

# Polymorphism. Put several vehicles in a list and loop over them, calling describe() on each.
     
class Vehicle:
     def __init__(self, make, model):
          self.make = make
          self.model = model
     def describe(self):
          print(f"The {self.make} {self.model} is an amazing vehicle.")
class Car(Vehicle):
     def describe(self):
          print(f"The {self.make} {self.model} is an amazing car.")
class Truck(Vehicle):
     def __init__(self, make, model, capacity):
          super().__init__(make, model)
          self.capacity = capacity
     def describe(self):
          print(f"The {self.make} {self.model} truck is the one of the best trucks in the market. It has {self.capacity} capacity.")
          
Toyota = Car("Toyota", "Corolla")
Ford = Truck("Ford", "F-150", "2 tons")
vehicles = [Ford, Toyota]
for vehicle in vehicles:
     vehicle.describe()
     
# Abstract method. Make Vehicle an abstract base class with an abstract wheels() method, and have each subclass return its own number.
from abc import ABC, abstractmethod

class Vehicle(ABC):
     def __init__(self, make, model):
          self.make = make
          self.model = model
     def describe(self):
          print(f"The {self.make} {self.model} is an amazing vehicle.")
     @abstractmethod
     def wheels(self):
          pass

class Car(Vehicle):
     def __init__(self, make, model):
          super().__init__(make, model)
          
     def describe(self):
          print(f"The {self.make} {self.model} is an amazing car.")
     
     def wheels(self):
          return 4
          
class Truck(Vehicle):
     def __init__(self, make, model, capacity):
          super().__init__(make, model)
          self.capacity = capacity
          
     def describe(self):
          print(f"The {self.make} {self.model} truck is the one of the best trucks in the market.")
          
     def wheels(self):
          return 5
          
Toyota = Car("Toyota", "Corolla", )
Ford = Truck("Ford", "F-150", "2 tons")
vehicles = [Toyota, Ford]
for vehicle in vehicles:
     vehicle.describe()
     print(f"   |------> It has {vehicle.wheels()} wheels.")