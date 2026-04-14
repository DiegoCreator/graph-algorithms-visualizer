import { MinHeap } from "./MinHeap";
import { describe, test, expect } from "vitest";
describe("findPathTyped", () => {
  test("should return null when pop is called on an empty heap", () => {
    const heap = new MinHeap();
    const result = heap.pop();
    expect(result).toBeNull();
  });
  test("should return true if heap is empty while using IsEmpty", () => {
    const heap = new MinHeap();
    const result = heap.isEmpty();
    expect(result).toBeTruthy();
  });

  test("pop should pull the number with the lowest priority", () => {
    const heap = new MinHeap();
    heap.push({ index: 0, priority: 10 });
    heap.push({ index: 1, priority: 5 });
    heap.push({ index: 2, priority: 20 });
    heap.push({ index: 3, priority: 1 });
    const result = heap.pop();
    const result2 = heap.pop();
    expect(result).toEqual({ index: 3, priority: 1 });
    expect(result2).toEqual({ index: 1, priority: 5 });
  });

  test("should support two element with the same priority", () => {
    const heap = new MinHeap();
    heap.push({ index: 0, priority: 1 });
    heap.push({ index: 1, priority: 1 });
    const result = heap.pop();
    const result2 = heap.pop();
    expect(result).toEqual({ index: 0, priority: 1 });
    expect(result2).toEqual({ index: 1, priority: 1 });
  });

  test("should return true in isEmpty after removing all items in heap", () => {
    const heap = new MinHeap();
    heap.push({ index: 0, priority: 1 });
    heap.push({ index: 1, priority: 1 });
    heap.pop();
    heap.pop();
    const result = heap.isEmpty();
    expect(result).toBeTruthy;
  });

  test("should handle 1000 random elements in correct order", () => {
    const heap = new MinHeap();
    const inputData: any[] = [];
    for (let i = 0; i < 1000; i++) {
      const node = { index: i, priority: Math.random() };
      inputData.push(node);
      heap.push(node);
    }

    const expectedData = [...inputData].sort((a, b) => a.priority - b.priority);

    for (let i = 0; i < 1000; i++) {
      const result = heap.pop();
      expect(result?.priority).toBe(expectedData[i].priority);
    }
    expect(heap.isEmpty()).toBe(true);
  });
});
