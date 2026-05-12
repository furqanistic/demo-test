const mongoose = require('mongoose');

const connectDatabase = () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.error('❌ MONGO_URI is not defined in environment variables');
        console.log('💡 Please set up your MongoDB connection in server/config/config.env');
        console.log('   Get a free MongoDB Atlas cluster at: https://www.mongodb.com/atlas');
        process.exit(1);
    }

    mongoose.connect(MONGO_URI)
        .then((con) => {
            console.log(`✅ MongoDB Connected: ${con.connection.host}`);
        })
        .catch((err) => {
            console.error('❌ MongoDB Connection Error:', err.message);
            console.log('\n💡 Setup Instructions:');
            console.log('   1. Get a free MongoDB Atlas cluster: https://www.mongodb.com/atlas');
            console.log('   2. Update MONGO_URI in server/config/config.env');
            console.log('   3. Restart the server\n');
            process.exit(1);
        });
};

module.exports = connectDatabase;