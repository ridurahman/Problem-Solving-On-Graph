function hasValidPath(n, edges, source, destination) {
  if (source == destination) {
    return 1;
  }
  let graph = new Map();

  for (let i = 0; i < edges.length; i++) {
    let values = [];
    if (graph.has(edges[i][0])) {
      let value = graph.get(edges[i][0]);
      values.push(...value);
    }
    values.push(edges[i][1]);
    graph.set(edges[i][0], values);
    values = [];
    if (graph.has(edges[i][1])) {
      let value = graph.get(edges[i][1]);
      values.push(...value);
    }
    values.push(edges[i][0]);
    graph.set(edges[i][1], values);
  }

  let adj = [];

  graph.forEach((value, key) => {
    adj.push([key, ...value]);
  });
  //console.log(adj);
  let visited = new Array(n).fill(0);
  return isDestination(adj, visited, source, destination);
}

function isDestination(adj, visited, source, destination) {
  if (source == destination) {
    return true;
  }
  visited[source] = 1;
  for (let i = 0; i < adj[source].length; i++) {
    if (!visited[adj[source][i]]) {
      let result = isDestination(adj, visited, adj[source][i], destination);
      if(result===true){
        return true;
      }
    }
  }
  return false;
}

let n1 = 3;
let edges1 = [
  [0, 1],
  [1, 2],
  [2, 0],
];
console.log(hasValidPath(n1, edges1, 0, 2));

let n2 = 6;
let edges2 = [
  [0, 1],
  [0, 2],
  [3, 5],
  [5, 4],
  [4, 3],
];
console.log(hasValidPath(n2, edges2, 0, 5));

/*

 Time Complexity: O(n + e) where n is the number of nodes and e is the number of edges of the graph.
 Space Complexity: O(n + e) where n is the length of the Array required to store visited nodes and e is the space needed to create adjacency list from the given graph.

*/