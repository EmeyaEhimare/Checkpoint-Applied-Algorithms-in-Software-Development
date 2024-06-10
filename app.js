function dijkstra(graph, start) {
    // Set to store distances from the starting vertex
    const distances = {};
    // Set to store processed vertices
    const processed = new Set();
  
    // Initialize distances for all vertices to infinity (except start)
    for (const vertex in graph) {
      distances[vertex] = Infinity;
    }
    distances[start] = 0;
  
    // Priority queue to efficiently select the unvisited vertex with the shortest tentative distance
    const pq = new PriorityQueue({ compare: (a, b) => distances[a] - distances[b] });
    pq.enqueue(start);
  
    // Dijkstra's algorithm loop
    while (!pq.isEmpty()) {
      // Get the vertex with the shortest tentative distance from the queue
      const current = pq.dequeue();
  
      // Mark current vertex as processed
      processed.add(current);
  
      // Iterate through neighbors of the current vertex
      for (const neighbor in graph[current]) {
        const newDistance = distances[current] + graph[current][neighbor];
  
        // If neighbor is not processed and the new distance is shorter than the current distance
        if (!processed.has(neighbor) && newDistance < distances[neighbor]) {
          // Update the distance for the neighbor
          distances[neighbor] = newDistance;
          // Add the neighbor to the priority queue with the updated distance
          pq.enqueue(neighbor);
        }
      }
    }
  
    // Return the distances object containing shortest paths from the starting vertex
    return distances;
  }
  
  // Helper class for a priority queue (implement using a min-heap for efficiency)
  class PriorityQueue {
    constructor(options) {
      this.compare = options.compare || ((a, b) => a - b);
      this.heap = [];
    }
  
    enqueue(item) {
      this.heap.push(item);
      this.heapifyUp(this.heap.length - 1);
    }
  
    dequeue() {
      const item = this.heap.shift();
      this.heapifyDown(0);
      return item;
    }
  
    isEmpty() {
      return this.heap.length === 0;
    }
  
    heapifyUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.compare(this.heap[parentIndex], this.heap[index]) > 0) {
          [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    heapifyDown(index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let swapIndex = index;
  
      if (leftChildIndex < this.heap.length && this.compare(this.heap[swapIndex], this.heap[leftChildIndex]) > 0) {
        swapIndex = leftChildIndex;
      }
  
      if (rightChildIndex < this.heap.length && this.compare(this.heap[swapIndex], this.heap[rightChildIndex]) > 0) {
        swapIndex = rightChildIndex;
      }
  
      if (swapIndex !== index) {
        [this.heap[swapIndex], this.heap[index]] = [this.heap[index], this.heap[swapIndex]];
        this.heapifyDown(swapIndex);
      }
    }
  }
  
  // Example usage
  const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
  };
  
  const distances = dijkstra(graph, 'A');
  console.log(distances); // Output: { 'A': 0, 'B': 4, 'C': 2, 'D': 5 }
  