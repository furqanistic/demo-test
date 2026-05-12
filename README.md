## **Blockchain-Integrated Real Estate Platform**  

### **Overview**  
This project aims to innovate the real estate industry by integrating blockchain technology, cryptocurrency, and NFTs into a user-friendly platform. It provides secure, transparent, and efficient solutions for buying, selling, and investing in real estate.  

---

### **Key Features**  
- **Tokenized Real Estate**: Convert properties into NFTs, enabling fractional ownership.  
- **Smart Contracts**: Automate and secure property transactions.  
- **Crypto Payments**: Accept cryptocurrency for purchases, rentals, and investments.  
- **NFT Marketplace**: Buy, sell, or trade tokenized property assets.  
- **Blockchain Registry**: Maintain tamper-proof records of ownership and transactions.  
- **Loyalty Rewards**: Earn tokens through platform activity and referrals.  

---

### **Technologies**  
- **Blockchain**: Ethereum, Binance Smart Chain.  
- **Frontend**: Next.js.  
- **Backend**: Node.js.
- **Database**: MongoDB for decentralized storage.  
- **Wallet Integration**: MetaMask, Trust Wallet, and more.  

---


### **Usage**  
- **Users**: Invest in properties, make payments, and manage ownership.  
- **Admins**: Tokenize properties and oversee marketplace activities.  

---

## Getting Started

### Prerequisites
- Node.js v20.x.x
- MongoDB (Local or Atlas Cloud)

### Installation
```bash
# Install dependencies
npm install
```

### Database Setup (MongoDB)

#### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
4. Update `server/config/config.env` with your connection string:
   ```
   MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/real_estate_platform?retryWrites=true&w=majority
   ```

#### Option 2: Local MongoDB
1. Install MongoDB locally: [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Start MongoDB service: `mongod`
3. Update `server/config/config.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/real_estate_platform
   ```

### Environment Variables
Update `server/config/config.env` with your credentials:
```
PORT=4000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_secret_key
```

### Running the Project
```bash
# Development mode (runs both frontend and backend)
npm run dev

# Frontend only
npm run client

# Backend only
npm run server
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000