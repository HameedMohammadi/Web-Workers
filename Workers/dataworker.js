// worker.js

// Listen for messages from the main thread
self.addEventListener('message', function (e) {
    // Simulate some heavy computation
    const result = doHeavyComputation(e.data);

    // Send the result back to the main thread
    self.postMessage(result);
});

// Function to simulate heavy computation
function doHeavyComputation(data) {
    // Simulate computation by calculating the square of a large number
    const result = data * data;
    return result;
}
