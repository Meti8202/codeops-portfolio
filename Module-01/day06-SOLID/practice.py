# Spot the SRP violation. Take a Report class that builds, saves, and emails a report. Split it into three focused classes.
class Report:
     def __init__(self, title, content):
          self.title = title
          self.content = content

     def build(self):
          return f" {self.title}\n{self.content}"

class ReportSaver:
     def save(self, report, filename):
          with open(filename, 'w') as f:
               f.write(report)


class ReportEmailer:
     def email(self, report, recipient):
          print(f"Email to {recipient}:\n{report}")

r = Report("Sales", "Q1 sales are up 10%.")
built = r.build()
saver = ReportSaver()
saver.save(built, "report.txt")
emailer = ReportEmailer()
emailer.email(built, "email@gmail.com")

# Refactor to OCP. Replace an if/elif that prints a shape's area by shape type with a small class hierarchy and one method.
from abc import ABC, abstractmethod
import math

class Shape(ABC):
     @abstractmethod
     def area(self):
          pass

class Circle(Shape):
     def __init__(self, radius):
          self.radius = radius
     def area(self):
          return math.pi * self.radius ** 2

class Square(Shape):
     def __init__(self, side):
          self.side = side
     def area(self):
          return self.side ** 2

class Triangle(Shape):
     def __init__(self, base, height):
          self.base = base
          self.height = height
     def area(self):
          return 0.5 * self.base * self.height

shapes = [Circle(5), Square(4), Triangle(3, 6)]
for shape in shapes:
     print(f"{shape.__class__.__name__} area: {shape.area():.2f}")

# Write a Singleton. Build an AppSettings Singleton holding a currency ("ETB") and confirm two instances are the same object.
class AppSettings:
     _instance = None

     def __new__(cls):
          if cls._instance is None:
               cls._instance = super().__new__(cls)
          return cls._instance

     def __init__(self):
          if not hasattr(self, 'initialized'):
               self.currency = "ETB"
               self.initialized = True

s1 = AppSettings()
s2 = AppSettings()
print(s1 is s2)          
print(s1.currency)     

# Write a Factory. Create a ShapeFactory.create(kind) that returns a Circle, Square, or Triangle.
class ShapeFactory:
     @staticmethod
     def create(kind, *args):
          if kind == "circle":
               return Circle(*args)
          elif kind == "square":
               return Square(*args)
          elif kind == "triangle":
               return Triangle(*args)
          else:
               raise ValueError(f"Unknown shape kind: {kind}")

circle = ShapeFactory.create("circle", 10)
square = ShapeFactory.create("square", 5)
triangle = ShapeFactory.create("triangle", 4, 7)
print(circle.area(), square.area(), triangle.area())

# Write an Observer pair. Make a NewsAgency subject and two subscriber classes that print when notified.
class NewsAgency:
     def __init__(self):
          self.subscribers = []
          self.news = ""

     def subscribe(self, subscriber):
          self.subscribers.append(subscriber)

     def set_news(self, news):
          self.news = news
          self._notify()

     def _notify(self):
          for sub in self.subscribers:
               sub.update(self.news)

class EmailSubscriber:
     def update(self, news):
          print(f"Email: Latest news – {news}")

class SMSSubscriber:
     def update(self, news):
          print(f"SMS: Breaking news – {news}")

agency = NewsAgency()
email = EmailSubscriber()
sms = SMSSubscriber()

agency.subscribe(email)
agency.subscribe(sms)

agency.set_news("IPhone 20 released!")