<h1 align="center">⚡ GraphPath Optimizer ⚡</h1>
<p align="center"><b>Ultra-fast BFS, Dijkstra, and A* for massive 1M node grids.</b></p>

### 1. Key Features
  * 🚀 <b>Scale Ready:</b> Optimized for millions of edges without memory leaks.
  
  * 🧠 <b>Heuristic Focus:</b> A* implementation with Manhattan metric.
  
  * 🏗️ <b>Data Structures:</b> MinHeap used for Dijkstra and A*.

### 2. Technical details and optimizations

#### 🧠 Memory Management
1. **Flat Buffers:** Instead of objects/2D arrays, uses one-dimensional `TypedArrays`.
2. **Bitwise Optimization:** Replaced `Math.floor()` with bitwise OR (`| 0`) for performance.
3. **Head Pointer:** BFS uses a head pointer instead of `.shift()` to avoid $O(n)$ complexity.
4. **Lazy Iteration:** `yield` generators in `getValidNeighbors` minimize memory allocation.

#### 🚪 Early Exit
The algorithms stop execution immediately after finding the target node.
  
#### 📊 Complexity
| Algorithm | Time complexity | Memory complexity | Application |
| :--- | :---: | :---: | :--- |
| **BFS** | $O(V + E)$ | $O(V)$ | Shortest path (unit weights) |
| **Dijkstra** | $O(E \log V)$ | $O(V)$ | Shortest path (weighted: sand, water) |
| **A\*** | $O(E)$ (avg) | $O(V)$ | Optimal performance via heuristics |
