<h1 align="center">⚡ GraphPath Optimizer ⚡</h1>
<p align="center"><b>Ultra-fast BFS, Dijkstra, and A* for massive 1M node grids.</b></p>

### 1. Key Features
* 🚀 **Scale Ready:** Optimized for low memory overhead.
* 🧠 **Heuristic Focus:** A* implementation with Manhattan metric.
* 🏗️ **Data Structures:** MinHeap used for Dijkstra and A*.

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
| **A\*** | $O(E)$ average (with good heuristic) | $O(V)$ | Optimal performance via heuristics |

#### ⏱️ Benchmark
*Tested on 1000x1000 empty grid (browser / average / 16GB RAM)*

| Algorithm | Execution time | Visited nodes | Guaranteed shortest route |
| :--- | :---: | :---: | :--- |
| **BFS** | 5 ms | High (Full scan) | Yes (for weights = 1) |
| **Dijkstra** | 384 ms | High (Wide search) | Yes |
| **A\*** | 131 ms | Low (Targeted) | Yes (with heuristic) |

### 3. 🛠️ Tech Stack
* **Typescript 5.9.3** - Typed superset of JavaScript.
* **jsdom 29.0.1** - Web browser environment emulation for Node.js.
* **vite 8.0.3** - Modern, ultra-fast frontend tooling.
* **vitest 4.1.2** - Vite-native unit testing framework.

### 4. Usage

#### Quick Start (For Users)
1. npm run dev.

2. Open localhost:5173.

3. Click once to set the Start, click second time to set the Target.

4. Click on the grid to draw walls, water or sand and select an algorithm from the list.

#### Library Usage (For Developers)

```typescript
import { findPathAStar } from "./a-star";
import { GRID_CELL } from "./constants";

// Prepare a 10x10 grid
const grid = new Uint8Array(100).fill(0);

grid[15] = GRID_CELL.WALL; // Impassable
grid[16] = GRID_CELL.SAND; // Higher movement cost
grid[17] = GRID_CELL.WATER; // Very high movement cost

// Find path from index 0 (top-left) to 99 (bottom-right)
const path = findPathAStar(0, 99, grid, 10, 10);
```

### 5. ⚙️ Installation & Setup

1. **Prerequisites**
Make sure you have Node.js installed (LTS version recommended).

2. **Clone the Repository**
```bash
git clone https://github.com/DiegoCreator/graph-algorithms-visualizer.git
cd graph-algorithms-visualizer
```

3. **Install Dependencies**

We use npm (or yarn/pnpm) to install all dependencies, including Vite, TypeScript and Vitest:

```bash
npm install
```

4. **Available Scripts**

  The following commands are configured in the project:

    * npm run dev – Starts the development server.

    * npm run test - Runs unit tests in Vitest. This is where you can validate algorithms.

    * npm run preview – Allows you to preview a built production version.

### 6. 💡Lessons Learned

This project was a testing ground for me in terms of algorithms and performance optimization in the TypeScript environment.

1. **Main challenges**

* **Computational complexity:** On a 1000x1000 grid (1 million nodes), simple solutions failed. I learned how to avoid CPU bottlenecks by efficiently managing the priority queue.

* **My own MinHeap implementation:** I understood the binary heap structure from scratch. This self-implementation was crucial for Dijkstra and A* to run in real time.

* **Memory management:** I learned how the V8 engine handles large datasets and why it's better to use flat structures instead of deeply nested objects in such cases.

2. **What I learned**

* Implementing and optimizing the **BFS, Dijkstra, and A*** algorithms.

* Practical applications of **heuristics** in navigation.

* Writing clean, efficient code in TS

### 7. 🧾 License

This project is open-source and available under the MIT License.
