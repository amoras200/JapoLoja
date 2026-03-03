const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configura as credenciais
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configura o armazenamento
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'japosports_produtos', // Vai criar uma pastinha organizada lá no Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
    }
});

const upload = multer({ storage: storage });

module.exports = upload;