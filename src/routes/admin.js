import { Router } from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';

const router = Router();

// ——— Admin Home ———
router.get('/', (req, res) => {
  res.render('admin_home', { title: 'Admin Dashboard' });
});


// ==========================
//        PROJECTS
// ==========================

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



// ==========================
//          SKILLS
// ==========================

// List Skills
router.get('/skills', async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.render('skills_list', { title: 'Skills', skills });
});

// New Skill Form
router.get('/skills/new', (req, res) => {
  res.render('skills_form', { title: 'New Skill', skill: {} });
});

// Create Skill
router.post('/skills', async (req, res) => {
  try {
    const { name, level, category } = req.body;
    await Skill.create({ name, level, category });
    res.redirect('/admin/skills');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating skill');
  }
});

// Edit Skill Form
router.get('/skills/:id/edit', async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  res.render('skills_form', { title: 'Edit Skill', skill });
});

// Update Skill
router.post('/skills/:id', async (req, res) => {
  try {
    const { name, level, category } = req.body;
    await Skill.findByIdAndUpdate(req.params.id, { name, level, category });
    res.redirect('/admin/skills');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating skill');
  }
});

// Delete Skill
router.post('/skills/:id/delete', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect('/admin/skills');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting skill');
  }
});


export default router;
