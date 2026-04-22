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
```typescript
const grid = 1000;
const path = findPathBFS(startIdx, endIdx, grid, GRID_SIZE, GRID_SIZE);

console.log(path);
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

### 6. 🧾 License

This project is open-source and available under the MIT License.
