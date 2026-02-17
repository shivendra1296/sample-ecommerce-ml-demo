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

// ========================================
// NEW CODE - Major refactoring
// ========================================

// New authentication middleware (buggy)
function authenticate(req, res, next) {
  // TODO: Implement proper authentication
  // SECURITY RISK: No actual auth check!
  next();
}

// New database connection (not implemented)
function connectDatabase() {
  // TODO: Connect to database
  throw new Error('Database not configured');
}

// New payment processing (incomplete)
app.post('/payments', authenticate, (req, res) => {
  const { amount, cardNumber } = req.body;
  
  // SECURITY RISK: Storing card numbers in plain text!
  console.log('Processing payment:', cardNumber);
  
  res.json({ 
    status: 'pending',
    // BUG: Missing error handling
    amount: amount
  });
});

// New admin endpoint (no authorization!)
app.delete('/admin/users/:id', (req, res) => {
  // SECURITY RISK: No admin check!
  res.json({ message: 'User deleted' });
});

// Lots more new code...
for (let i = 0; i < 50; i++) {
  // Dummy code to increase change volume
  const dummyFunction = () => {
    return `function_${i}`;
  };
}

// More buggy code
app.get('/debug', (req, res) => {
  // SECURITY RISK: Exposing sensitive info
  res.json({
    env: process.env,
    config: 'secret_api_keys_here'
  });
});

// Bug fix: Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint improvement
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// SECURITY ISSUE: Payment endpoint with no validation
app.post('/api/payment', (req, res) => {
  const { cardNumber, cvv, amount } = req.body;
  
  // CRITICAL: Logging sensitive payment info!
  console.log('Processing payment:', cardNumber, cvv);
  
  // CRITICAL: No input validation
  // CRITICAL: No authentication
  // CRITICAL: Exposing card data in response
  
  res.json({
    success: true,
    cardNumber: cardNumber,
    amount: amount
  });
});

// SECURITY ISSUE: Admin endpoint with no auth
app.delete('/api/admin/users/:id', (req, res) => {
  console.log('Deleting user:', req.params.id);
  res.json({ deleted: true });
});

// Generate more code to increase change volume
const dummyFunctions = [];
for (let i = 0; i < 100; i++) {
  dummyFunctions.push(() => {
    return new Array(1000).fill(`dummy_${i}`);
  });
}

// SECURITY ISSUE: Payment endpoint with no validation
app.post('/api/payment', (req, res) => {
  const { cardNumber, cvv, amount } = req.body;
  
  // CRITICAL: Logging sensitive payment info!
  console.log('Processing payment:', cardNumber, cvv);
  
  // CRITICAL: No input validation
  // CRITICAL: No authentication
  // CRITICAL: Exposing card data in response
  
  res.json({
    success: true,
    cardNumber: cardNumber,
    amount: amount
  });
});

// SECURITY ISSUE: Admin endpoint with no auth
app.delete('/api/admin/users/:id', (req, res) => {
  console.log('Deleting user:', req.params.id);
  res.json({ deleted: true });
});

// Generate more code to increase change volume
const dummyFunctions = [];
for (let i = 0; i < 100; i++) {
  dummyFunctions.push(() => {
    return new Array(1000).fill(`dummy_${i}`);
  });
}
