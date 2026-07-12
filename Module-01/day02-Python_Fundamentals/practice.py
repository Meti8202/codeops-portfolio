# Temperature label: Ask for a temperature in °C, then print "cold" below 15, "warm" from 15–28, and "hot" above 28, using if / elif / else.
print("Enter the temperature in Celsius: ")
temperature_in_C = int(input("-> "))  # got error without the type casting bc the input was read as a string so it couldn't compare the input and the set temps

if temperature_in_C < 15 :
     print("cold")
elif temperature_in_C in range (15,29):
     print("warm")
# elif temperature_in_C > 28:
     # print("hot")
else:
     print("hot")

# Receipt loop: Use a for loop and range to print receipt numbers 1 through 10, each on its own line as "Receipt #N".
for receipt_number in range(1,11):
     print("Receipt #", receipt_number)

# Even numbers: Print every even number from 1 to 20 using a loop and the modulo operator %
for even_number in range (1,21): 
     remainder = even_number % 2 
     if remainder == 1:
          continue
     print(even_number)  # first used remainder here but it printed the odd numbers only and since it was to print only even nos, switched to i

# Discount function: Write apply_discount(price, percent=10) that returns the price after the discount. Test it with and without the default.
def apply_discount(price, percent=10):
     price = price - (price/100 * percent)
     return price
print(apply_discount(250))
print(apply_discount(12))

# without the default percent, using user input instead
print("Enter discount percent: ")
def apply_discount(price, percent=input('-> ')):
     price = price - (price/100 * int(percent))
     return price
print(apply_discount(250))
print(apply_discount(12))


# Countdown : Use a while loop to count down from 5 to 1, printing each number, then print "Liftoff!".
countdown = 5
while countdown > 0:
     print(countdown)
     countdown = countdown - 1
print("Liftoff!")