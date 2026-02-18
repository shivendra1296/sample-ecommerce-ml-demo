const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample products database
const products = [
  { id: 1, name: 'Laptop', price: 999, stock: 50 },
  { id: 2, name: 'Phone', price: 699, stock: 100 },
  { id: 3, name: 'Tablet', price: 499, stock: 75 }
];

app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API v1.0',
    status: 'running'
  });
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/orders', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  if (quantity > product.stock) {
    return res.status(400).json({ error: 'Insufficient stock' });
  }
  
  res.json({
    orderId: Math.floor(Math.random() * 10000),
    product: product.name,
    quantity,
    total: product.price * quantity
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
// v1.0.1 - Minor update

// Health check endpoint improvement
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Bug fix: Add input validation for product lookup
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  // Validation: Check if ID is a valid number
  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Bug fix: Add input validation for product lookup
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  // Validation: Check if ID is a valid number
  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Bug fix: Add input validation for product lookup
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  // Validation: Check if ID is a valid number
  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Bug fix: Add input validation for product lookup
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  // Validation: Check if ID is a valid number
  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

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
