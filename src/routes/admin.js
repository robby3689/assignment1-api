import { Router } from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';


const router = Router();


router.get('/', (req, res) => {
res.render('admin_home', { title: 'Admin Dashboard' });
});


// —— Projects ——
router.get('/projects', async (req, res) => {
const projects = await Project.find().sort({ createdAt: -1 });
res.render('projects_list', { title: 'Projects', projects });
});


router.get('/projects/new', (req, res) => {
res.render('projects_form', { title: 'New Project', project: {} });
});


router.post('/projects', async (req, res) => {
const { title, description, url, tech, featured } = req.body;
await Project.create({
title,
description,
url,
tech: (tech || '').split(',').map((t) => t.trim()).filter(Boolean),
featured: !!featured
});
res.redirect('/admin/projects');
});


router.get('/projects/:id/edit', async (req, res) => {
const project = await Project.findById(req.params.id);
res.render('projects_form', { title: 'Edit Project', project });
});


router.post('/projects/:id', async (req, res) => {
const { title, description, url, tech, featured } = req.body;
await Project.findByIdAndUpdate(req.params.id, {
title,
description,
url,
tech: (tech || '').split(',').map((t) => t.trim()).filter(Boolean),
featured: !!featured
});
res.redirect('/admin/projects');
});


router.post('/projects/:id/delete', async (req, res) => {
await Project.findByIdAndDelete(req.params.id);
res.redirect('/admin/projects');
});


// —— Skills ——
router.get('/skills', async (req, res) => {
const skills = await Skill.find().sort({ createdAt: -1 });
res.render('skills_list', { title: 'Skills', skills });
});


router.get('/skills/new', (req, res) => {
res.render('skills_form', { title: 'New Skill', skill: {} });
});


export default router;