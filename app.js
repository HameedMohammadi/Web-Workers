// Function to create and run Web Worker
function runWorker() {
    // Generate a large array of random numbers
    const arraySize = 1000000; // 1 million elements
    const largeArray = Array.from({ length: arraySize }, () => Math.random());

    const workerCode = `
        // Listen for messages from the main thread
        self.addEventListener('message', function (e) {
            // Receive the array from the main thread
            const arrayToSort = e.data;

            // Sort the array
            const sortedArray = arrayToSort.slice().sort((a, b) => a - b);

            // Send the sorted array back to the main thread
            self.postMessage(sortedArray);
        });
    `;

    // Create a blob from the worker code
    const blob = new Blob([workerCode], { type: 'application/javascript' });

    // Create a URL for the blob
    const workerUrl = URL.createObjectURL(blob);

    // Create a new Worker using the blob URL
    const worker = new Worker(workerUrl);

    // Listen for messages from the worker
    worker.addEventListener('message', function (e) {
        // Format the sorted array for display
        const formattedArray = e.data.slice(0, 100).map(num => num.toFixed(8)); // Displaying up to 8 decimal places for each number

        // Display the formatted array in the HTML interface
        const outputElement = document.getElementById('output');
        outputElement.textContent = `Sorted Array: ${formattedArray.join(', ')}...`;
    });

    // Start the worker and send the large array
    worker.postMessage(largeArray);
}

// Function to sort the array without using Web Worker
function sortWithoutWorker() {
    // Generate a large array of random numbers
    const arraySize = 1000000; // 1 million elements
    const largeArray = Array.from({ length: arraySize }, () => Math.random());

    // Sort the array directly in the main thread
    const sortedArray = largeArray.slice().sort((a, b) => a - b);

    // Format the sorted array for display
    const formattedArray = sortedArray.slice(0, 100).map(num => num.toFixed(8)); // Displaying up to 8 decimal places for each number

    // Display the formatted array in the HTML interface
    const outputElement = document.getElementById('output');
    outputElement.textContent = `Sorted Array (without Web Worker): ${formattedArray.join(', ')}...`;
}
// Function to change the color of the output element
function changeColor() {
    const outputElement = document.getElementById('output');
    const colors = ['#FF5733', '#33FF57', '#3366FF', '#FF33CC', '#FFFF33']; // Array of colors
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Randomly select a color
    outputElement.style.backgroundColor = randomColor; // Set the background color of the output element
}

// Event listener for button click to change the color of the output element
document.getElementById('changeColor').addEventListener('click', changeColor);

// Event listener for button click to start the worker
document.getElementById('startWorker').addEventListener('click', runWorker);

// Event listener for button click to sort without Web Worker
document.getElementById('sortNoWorker').addEventListener('click', sortWithoutWorker);
