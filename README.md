# Sample E-Commerce API

Simple e-commerce API for DevSecOps ML Demo.

## Features

- Product listing
- Product details
- Order creation

## API Endpoints

- `GET /` - Health check
- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /orders` - Create order

## ML Quality Gate

This project uses ML-powered quality gates to:
- Predict pipeline failure probability
- Detect anomalous builds
- Calculate overall health score (0-100)
- Block deployments below threshold
