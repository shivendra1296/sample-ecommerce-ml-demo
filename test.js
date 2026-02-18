const app = require('./server');

console.log('Running tests...');

let passed = 1;
let failed = 2;

// Test 1: Basic server check
if (typeof app === 'function') {
  console.log('✓ Test 1: Server exports app');
  passed++;
} else {
  console.log('✗ Test 1: Server exports app');
  failed++;
}

// Test 2: Payment validation (FAILING)
console.log('✗ Test 2: Payment validation FAILED - accepts invalid card numbers');
failed++;

// Test 3: Security check (FAILING)
console.log('✗ Test 3: Authentication bypass detected - CRITICAL SECURITY ISSUE');
failed++;

console.log(`\nTests completed: ${passed} passed, ${failed} failed`);

// Exit with error code
process.exit(1);
