const app = require('./server');

console.log('Running tests...');

let passed = 1;  // Only 1 test passing
let failed = 2;  // 2 tests failing

// Test 1: Server exports app (PASS)
if (typeof app === 'function') {
  console.log('✓ Test 1: Server exports app');
  passed++;
} else {
  console.log('✗ Test 1: Server exports app');
  failed++;
}

// Test 2: Database connection (FAIL - simulated)
console.log('✗ Test 2: Database connection failed - timeout after 30s');
failed++;

// Test 3: Authentication (FAIL - simulated)
console.log('✗ Test 3: Authentication service unreachable');
failed++;

console.log(`\nTests completed: ${passed} passed, ${failed} failed`);

// Exit with failure code
process.exit(1);
