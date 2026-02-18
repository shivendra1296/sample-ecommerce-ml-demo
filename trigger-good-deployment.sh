#!/bin/bash

echo "=========================================="
echo "Triggering GOOD Deployment Scenario"
echo "=========================================="
echo ""
echo "This will create a small, safe change that gets APPROVED"
echo ""

# Make sure we're on main branch
git checkout main
git pull origin main

# Create a small, focused bug fix
echo ""
echo "Making changes..."

cat >> server.js << 'JS'

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
JS

echo " Added input validation (5 lines)"
echo ""

# Commit and push
git add server.js
git commit -m "fix: add input validation for product ID parameter"

echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "=========================================="
echo "GOOD DEPLOYMENT TRIGGERED"
echo "=========================================="
echo ""
echo ""
