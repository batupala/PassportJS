const router = require('express').Router();
const yonetimController = require('../controllers/yonetim_controller');
const authMiddleware = require('../middleware/auth_middleware');

router.get('/', authMiddleware.oturumAcilmis, yonetimController.anaSayfayiGoster);



module.exports = router;