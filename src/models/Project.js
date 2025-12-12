import mongoose from 'mongoose';


const ProjectSchema = new mongoose.Schema(
{
title: { type: String, required: true },
description: { type: String },
url: { type: String },
tech: [{ type: String }],
featured: { type: Boolean, default: false }
},
{ timestamps: true }
);


export default mongoose.model('Project', ProjectSchema);