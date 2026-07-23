# Build a BST. Write a Node class and an insert(root, value) function. Insert several balances, then print them with an in-order traversal — they should come out sorted.
class Node:
     def __init__(self, val):
          self.val = val
          self.left = self.right = None

def insert(root, val):
     if not root:
          return Node(val)
     if val < root.val:
          root.left = insert(root.left, val)
     elif val > root.val:
          root.right = insert(root.right, val)
     return root

def in_order(root):
     return in_order(root.left) + [root.val] + in_order(root.right) if root else []

balances = [150, 80, 200, 50, 120, 180, 250]
root = None
for b in balances:
     root = insert(root, b)
print(in_order(root))   

# Tree depth. Write a recursive height(node) that returns the depth of a binary tree.

# Graph BFS. Given an adjacency-list graph, implement bfs(graph, start) and return the set of reachable vertices.
def bfs(graph, start):
     visited = set()
     queue = [start]
     
     while queue:
          vertex = queue.pop(0)
          if vertex not in visited:
               visited.add(vertex)
               queue.extend(neighbor for neighbor in graph[vertex] if neighbor not in visited)
     return visited

if __name__ == "__main__":
     graph = {
          'A': ['B', 'C'],
          'B': ['A', 'D'],
          'C': ['A'],
          'D': ['B'],
     }
     
start_vertex = 'A'
reachable_vertices = bfs(graph, start_vertex)
print("Reachable vertices from {}: {}".format(start_vertex, reachable_vertices))

# Graph DFS. Implement dfs(graph, start) recursively, and compare the visit order with your BFS.
def dfs(graph, start, visited=None, order=None):
    if visited is None:
        visited = set()
        order = []
    visited.add(start)
    order.append(start)
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)
    return visited, order

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A'],
    'D': ['B'],
}
start = 'A'

dfs_reachable  = dfs(graph, start)

print("DFS reachable set:", dfs_reachable)


# Priority queue. Use heapq to push five (priority, task) tuples in mixed order, then pop them all — they should come out by priority.

import heapq

tasks = [
     (3, "Backup database"),
     (1, "Restart server"),
     (4, "Update SSL cert"),
     (5, "Critical security patch"),
     (2, "Clear log files")
]

heap = []
for priority, task in tasks:
     heapq.heappush(heap, (priority, task))
     print(f"Added: ({priority}, {task})")
while heap:
     priority, task = heapq.heappop(heap)
     print(f"Popped: ({priority}, {task})")



