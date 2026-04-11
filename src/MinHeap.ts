interface HeapNode {
  index: number;
  priority: number;
}

export class MinHeap {
  private heap: HeapNode[] = [];

  public push(node: HeapNode): void {
    this.heap.push(node);

    let currentIndex = this.heap.length - 1;

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

  public pop(): HeapNode | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const result = this.heap[0];
    this.heap[0] = this.heap.pop()!;

    this.bubbleDown();

    return result;
  }

  private bubbleDown(): void {
    let currentIndex = 0;
    while (true) {
      let smallest = currentIndex;
      const leftChildrenIndex = 2 * currentIndex + 1;
      const rightChildrenIndex = 2 * currentIndex + 2;
      if (
        leftChildrenIndex < this.heap.length &&
        this.heap[leftChildrenIndex].priority < this.heap[smallest].priority
      ) {
        smallest = leftChildrenIndex;
      }
      if (
        rightChildrenIndex < this.heap.length &&
        this.heap[rightChildrenIndex].priority < this.heap[smallest].priority
      ) {
        smallest = rightChildrenIndex;
      }
      if (smallest !== currentIndex) {
        this.swap(currentIndex, smallest);
        currentIndex = smallest;
      } else {
        break;
      }
    }
  }

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
