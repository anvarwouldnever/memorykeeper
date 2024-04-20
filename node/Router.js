import Router from "express";
import DataFetch from "./DataFetch.js";

const router = Router();

router.get('/current', DataFetch.getCurrent)
router.get('/weekly', (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

export default router;
