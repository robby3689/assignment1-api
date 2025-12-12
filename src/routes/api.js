import { Router } from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';


const router = Router();


router.get('/projects', async (req, res) => {
try {
const items = await Project.find().sort({ createdAt: -1 });
res.json(items);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


   router.get('/skills', async (req, res) => {
try {
const items = await Skill.find().sort({ createdAt: -1 });
res.json(items);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


export default router;