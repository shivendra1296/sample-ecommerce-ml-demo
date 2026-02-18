#!/bin/bash

echo "=========================================="
echo " Triggering BAD Deployment Scenario"
echo "=========================================="
echo ""
echo "This will create risky changes that get BLOCKED"
echo ""

# Create risky branch
BRANCH_NAME="risky-deployment-$(date +%s)"
git checkout -b $BRANCH_NAME

echo " Creating risky changes..."
echo ""

# 1. Break the tests
cat > test.js << 'JS'
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
JS

echo " Modified tests to fail (2/3 failing)"

# 2. Add risky code with security issues
cat >> server.js << 'JS'

// ========================================
// RISKY CODE - DO NOT DEPLOY
// ========================================

// SECURITY ISSUE: Payment endpoint with no validation
app.post('/api/process-payment', (req, res) => {
  const { cardNumber, cvv, expiryDate, amount } = req.body;
  
  // CRITICAL: Logging sensitive credit card information!
  console.log('Processing payment:');
  console.log('Card Number:', cardNumber);
  console.log('CVV:', cvv);
  console.log('Expiry:', expiryDate);
  
  // CRITICAL: No input validation
  // CRITICAL: No authentication check
  // CRITICAL: No encryption
  
  // SECURITY ISSUE: Returning sensitive data in response
  res.json({
    success: true,
    cardNumber: cardNumber,  // EXPOSING CARD NUMBER!
    amount: amount,
    processedAt: new Date().toISOString()
  });
});

// SECURITY ISSUE: Admin endpoint with no authorization
app.delete('/api/admin/delete-user/:id', (req, res) => {
  const userId = req.params.id;
  
  // CRITICAL: No admin check - anyone can delete users!
  console.log('Deleting user:', userId);
  
  res.json({ 
    deleted: true, 
    userId: userId 
  });
});

// SECURITY ISSUE: Debug endpoint exposing secrets
app.get('/api/debug/config', (req, res) => {
  // CRITICAL: Exposing environment variables and secrets
  res.json({
    environment: process.env,
    databasePassword: 'admin123',  // HARDCODED PASSWORD!
    apiKeys: {
      stripe: 'sk_test_fake_key_12345',
      aws: 'AKIAIOSFODNN7EXAMPLE'
    }
  });
});

// Bug: Memory leak
const leakyArray = [];
app.get('/api/leak', (req, res) => {
  // Memory leak - array keeps growing
  for (let i = 0; i < 100000; i++) {
    leakyArray.push(new Array(1000).fill('leak'));
  }
  res.json({ status: 'ok' });
});

// Generate more code to increase change volume
const dummyFunctions = [];
for (let i = 0; i < 50; i++) {
  dummyFunctions.push(function dummy() {
    const data = new Array(10000).fill(`dummy_${i}`);
    return data.length;
  });
}

// More risky code
app.post('/api/unsafe-eval', (req, res) => {
  // CRITICAL: Using eval() - code injection vulnerability!
  const result = eval(req.body.code);
  res.json({ result });
});
JS

echo " Added 150+ lines of risky code"
echo "   - Security vulnerabilities (credit card logging)"
echo "   - No authentication on admin endpoints"
echo "   - Memory leaks"
echo "   - Code injection vulnerability"
echo ""

# 3. Add vulnerable dependency
cat > package.json << 'JSON'
{
  "name": "sample-ecommerce-api",
  "version": "2.0.0-risky",
  "description": "Risky deployment with security issues",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "node test.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "lodash": "4.17.4"
  }
}
JSON

echo " Added vulnerable dependencies"
echo ""

# Commit and push
git add .
git commit -m "feat: major refactor - new payment system, admin panel, and debug tools (URGENT - Friday 11PM)"

echo ""
echo " Pushing to GitHub..."
git push origin $BRANCH_NAME

echo ""
echo "=========================================="
echo " BAD DEPLOYMENT TRIGGERED"
echo "=========================================="
echo ""
echo ""
echo "Branch created: $BRANCH_NAME"
echo ""

