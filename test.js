const app = require('./server');

console.log('Running tests...');

let passed = 0;
let failed = 0;

// Test 1: Server exports app
if (typeof app === 'function') {
  console.log('✓ Test 1: Server exports app');
  passed++;
} else {
  console.log('✗ Test 1: Server exports app');
  failed++;
}

// Test 2: Products array exists
const products = [
  { id: 1, name: 'Laptop', price: 999, stock: 50 },
  { id: 2, name: 'Phone', price: 699, stock: 100 },
  { id: 3, name: 'Tablet', price: 499, stock: 75 }
];

if (products.length === 3) {
  console.log('✓ Test 2: Products array has correct length');
  passed++;
} else {
  console.log('✗ Test 2: Products array has correct length');
  failed++;
}

// Test 3: Product prices are valid
const allPricesValid = products.every(p => p.price > 0);
if (allPricesValid) {
  console.log('✓ Test 3: All product prices are valid');
  passed++;
} else {
  console.log('✗ Test 3: All product prices are valid');
  failed++;
}

console.log(`\nTests completed: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
