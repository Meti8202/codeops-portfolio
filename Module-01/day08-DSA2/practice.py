
# *Recursive sum. Write a recursive total(nums) that sums a list, and a recursive count_down(n) that prints n down to 1.
def total(nums):
     if not nums:
          return 0
     return nums[0] + total(nums[1:])
def count_down(n):
     if n == 0:
          print("done")
          return
     print(n)
     count_down(n - 1)

count_down(10)

# *Binary search. Implement binary_search(items, target) on a sorted list and return the index, or -1. Test it on a sorted list of balances.
def binary_search(items, target):
     lo, hi = 0, len(items) - 1

     while lo <= hi:
          mid = (lo + hi) // 2
          if items[mid] == target:
               return mid
          elif items[mid] < target:
               lo = mid + 1
          else:
               hi = mid - 1

     return "Not found"


balances = [150, 250, 450, 800, 1200, 2300, 5000]

print(binary_search(balances, 2300))  
print(binary_search(balances, 999))    
print(binary_search(balances, 5000))       
print(binary_search(balances, 150))    
          

# *Merge sort. Implement merge_sort(items) and its merge helper. Confirm it matches sorted() on random lists.



# *Sort with a key. Given a list of (name, balance) tuples, sort it by balance descending using sorted(key=...).
data = [("abebe", 4653), ("beti", 2500), ("sara", 2000), ("chala", 6000), ("kebede", 2500),]
sorted_data = sorted(data, key=lambda x: x[1], reverse=True)
print(sorted_data)


# *Two pointers. Write has_pair(nums, target) for a sorted list, returning whether two values sum to the target.
def has_pair(nums, target):
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return False

nums = [1, 2, 3, 4, 9]
target = 10
print(has_pair(nums, target))  




# !CLASS PRACTICE 
# *Bubble sort = repeatedly swapping adjacent elements until every element is in its right place within the list
def bubble_sort(arr):
     h = len(arr)
     
     for i in range(h):
          already_sorted= True
          for j in range(h - i - 1):
               if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    already_sorted = False
               
     return arr
height = [190, 178, 165, 187, 182, 188, 171]
sorted_height = bubble_sort(height)
print("Sorted height: ", height , "cm")


# *Selection sort = repeatedly finding the smallest element.
def selection_sort(arr):
     h = len(arr)
     for i in range(h):
          min_index = i
          for j in range(i + 1, h):
               if arr[j] < arr[min_index]:                     min_index = j
          arr[i], arr[min_index] = arr[min_index], arr[i]

     return arr

height = [190, 178, 165, 187, 182, 188, 171]
sorted_height = selection_sort(height)
print("Sorted height: ", height , "cm")

# *Insertion sort
def insertionSort(arr):
     for i in range(1, len(arr)):
          key = arr[i]
          j = i - 1
          while j >= 0 and arr[j] > key:
               arr[j + 1] = arr[j]
               j -= 1
                    
          arr[j + 1] = key

     return arr

height = [190, 178, 165, 187, 182, 188, 171]
sorted_height = insertionSort(height)
print("Sorted height: ", height , "cm")