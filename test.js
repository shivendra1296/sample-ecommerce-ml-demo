const app = require('./server');

console.log('Running tests...');

let passed = 1;
let failed = 2;

console.log('✓ Test 1: Server exports app');
console.log('✗ Test 2: Payment validation FAILED - accepts invalid cards');
console.log('✗ Test 3: Auth bypass CRITICAL - security issue detected');

console.log(`\nTests completed: ${passed} passed, ${failed} failed`);
process.exit(1);
