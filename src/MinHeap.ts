interface HeapNode {
  index: number;
  priority: number;
}

export class MinHeap {
  private heap: HeapNode[] = [];

  /**
   * Adds a new node to the heap and maintains the min-heap property by bubbling up.
   */
  public push(node: HeapNode): void {
    this.heap.push(node);

    let currentIndex = this.heap.length - 1;

    // Bubble up: move the new node up until it finds its correct position
    while (currentIndex > 0) {
      const parentIndex = ((currentIndex - 1) / 2) | 0;

      if (this.heap[currentIndex].priority < this.heap[parentIndex].priority) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Removes and returns the node with the lowest priority (the root).
   */
  public pop(): HeapNode | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const result = this.heap[0];
    // Move the last element to the root and re-balance
    this.heap[0] = this.heap.pop()!;

    this.bubbleDown();

    return result;
  }
  /**
   * Restores the min-heap property by moving the root node down to its correct position.
   */
  private bubbleDown(): void {
    let currentIndex = 0;
    while (true) {
      let smallest = currentIndex;
      const leftChildrenIndex = 2 * currentIndex + 1;
      const rightChildrenIndex = 2 * currentIndex + 2;

      // Check if left child exists and has a smaller priority
      if (
        leftChildrenIndex < this.heap.length &&
        this.heap[leftChildrenIndex].priority < this.heap[smallest].priority
      ) {
        smallest = leftChildrenIndex;
      }

      // Check if right child exists and is smaller than the current smallest
      if (
        rightChildrenIndex < this.heap.length &&
        this.heap[rightChildrenIndex].priority < this.heap[smallest].priority
      ) {
        smallest = rightChildrenIndex;
      }

      // If a smaller child was found, swap and continue
      if (smallest !== currentIndex) {
        this.swap(currentIndex, smallest);
        currentIndex = smallest;
      } else {
        break;
      }
    }
  }

  /**
   * Utility to swap two nodes in the heap array.
   */
  private swap(index: number, parentIndex: number) {
    [this.heap[parentIndex], this.heap[index]] = [
      this.heap[index],
      this.heap[parentIndex],
    ];
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
