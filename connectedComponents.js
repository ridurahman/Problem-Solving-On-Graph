function numberOfConnectedComponents(A, B) {
  let graph = new Map();

  for (let i = 0; i < B.length; i++) {
    let values = new Set();
    if (graph.has(B[i][0])) {
      let value = graph.get(B[i][0]);
      values.add(...value);
    }
    values.add(B[i][1]);
    graph.set(B[i][0], values);
    values = new Set();
    if (graph.has(B[i][1])) {
      let value = graph.get(B[i][1]);
      values.add(...value);
    }
    values.add(B[i][0]);
    graph.set(B[i][1], values);
  }

  let adj = [];

  graph.forEach((value, key) => {
    adj.push([key, ...value]);
  });
  //console.log(adj);
  let visited = new Set();
  let count = 0;
  //console.log(visited);
  for (let i = 1; i <= A; i++) {
    if (!visited.has(i)) {
      //   console.log(count);
      dfs(i, visited, adj);
      //console.log(visited);
      count++;
    }
  }
  return count;
}

function dfs(i, visited, adj) {
  visited.add(i);
  //console.log(i, visited);
  //console.log(adj[i-1]?adj[i-1].length:0);
  for (let x = 0; x < (adj[i - 1] ? adj[i - 1].length : 0); x++) {
    if (!visited.has(adj[i - 1][x])) {
      dfs(adj[i - 1][x], visited, adj);
    }
  }
}

let A1 = 4;
let B1 = [
  [1, 2],
  [3, 4],
];
console.log(numberOfConnectedComponents(A1, B1));

let A2 = 3;
let B2 = [
  [1, 2],
  [2, 1],
];
console.log(numberOfConnectedComponents(A2, B2));

/*

 Time Complexity: O(A + B) where A is the number of nodes and B is the number of edges of the graph.
 Space Complexity: O(A + B) where A is the size of the Set required to store visited nodes and B is the space needed to create adjacency list from the given graph.

*/
