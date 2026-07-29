#!/usr/bin/env node
// Build blog data JSON file from markdown posts
const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'content', 'blog');
const outFile = path.join(__dirname, 'public', 'blog-data.json');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Missing frontmatter');
  const fmLines = match[1].split('\n');
  const fm = {};
  const markdown = match[2];
  for (const line of fmLines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    } else {
      val = val.replace(/^["']|["']$/g, '');
    }
    fm[key] = val;
  }
  return { frontmatter: fm, markdown };
}

function mdToHtml(md) {
  let html = md;
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  const lines = html.split('\n').filter(l => l.trim());
  const result = [];
  for (const line of lines) {
    if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<li') || line.startsWith('<img') || line.startsWith('<a')) {
      result.push(line);
    } else {
      result.push('<p>' + line + '</p>');
    }
  }
  return result.join('\n');
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
const posts = [];

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  const { frontmatter, markdown } = parseFrontmatter(raw);
  posts.push({
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    author: frontmatter.author,
    excerpt: frontmatter.excerpt,
    image: frontmatter.image,
    tags: frontmatter.tags || [],
    contentHtml: mdToHtml(markdown),
  });
}

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
console.log('Wrote ' + posts.length + ' posts to ' + outFile);