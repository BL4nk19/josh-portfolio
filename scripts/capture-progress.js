// scripts/capture-progress.js - Complete Enhanced Version
const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

const DOCS_DIR = './progress-docs';
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

async function captureProgress() {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const commitInfo = getCommitInfo();
  
  console.log('📸 Capturing portfolio progress...');
  console.log('🌐 Target URL:', SITE_URL);
  
  // Create directory structure
  const sessionDir = `${DOCS_DIR}/${timestamp}_${commitInfo.shortSha}`;
  await fs.mkdir(sessionDir, { recursive: true });
  
  // Take screenshots (now returns array of screenshot info)
  const screenshots = await takeScreenshot(sessionDir);
  
  // Generate progress entry
  const progressEntry = {
    timestamp,
    commit: commitInfo,
    screenshots, // Now includes all theme/viewport combinations
    url: SITE_URL,
    notes: await extractCommitNotes(commitInfo.message),
    techStack: await getCurrentTechStack(),
    fileChanges: await getFileChanges()
  };
  
  // Save progress entry
  await fs.writeFile(
    `${sessionDir}/progress.json`,
    JSON.stringify(progressEntry, null, 2)
  );
  
  // Update master timeline
  await updateTimeline(progressEntry, sessionDir);
  
  console.log(`✅ Progress captured: ${sessionDir}`);
}

async function takeScreenshot(sessionDir) {
  console.log('📸 Taking light/dark theme screenshots...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const screenshots = [];
  
  try {
    await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000); // Let animations settle

    // Define themes and viewports
    const themes = [
      { name: 'light', label: 'Light Mode' },
      { name: 'dark', label: 'Dark Mode' }
    ];
    
    const viewports = [
      { name: 'desktop', width: 1920, height: 1080 },
      { name: 'mobile', width: 375, height: 812 }
    ];

    for (const theme of themes) {
      console.log(`🎨 Capturing ${theme.label}...`);
      
      // Switch theme - try multiple methods to ensure compatibility
      await page.evaluate((themeName) => {
        // Method 1: next-themes style
        if (themeName === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
        
        // Method 2: data-theme attribute (for custom themes)
        document.documentElement.setAttribute('data-theme', themeName);
        
        // Method 3: CSS variables approach
        document.documentElement.style.colorScheme = themeName;
        
        // Trigger any theme change listeners
        window.dispatchEvent(new CustomEvent('themechange', { detail: themeName }));
      }, theme.name);
      
      // Wait for theme to apply
      await page.waitForTimeout(1500);

      // Capture at different viewports
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.waitForTimeout(1000); // Let resize settle

        const filename = `screenshot-${theme.name}-${viewport.name}.png`;
        const filepath = `${sessionDir}/${filename}`;

        await page.screenshot({ 
          path: filepath,
          fullPage: true,
          type: 'png'
        });

        screenshots.push({
          theme: theme.name,
          viewport: viewport.name,
          filename,
          path: filepath,
          label: `${theme.label} - ${viewport.name}`
        });

        console.log(`  ✅ ${theme.label} (${viewport.name}): ${filename}`);
      }
    }

  } finally {
    await browser.close();
  }

  return screenshots;
}

function getCommitInfo() {
  try {
    return {
      sha: execSync('git rev-parse HEAD').toString().trim(),
      shortSha: execSync('git rev-parse --short HEAD').toString().trim(),
      message: execSync('git log -1 --pretty=%B').toString().trim(),
      author: execSync('git log -1 --pretty=%an').toString().trim(),
      date: execSync('git log -1 --pretty=%ai').toString().trim(),
      branch: execSync('git branch --show-current').toString().trim()
    };
  } catch {
    return {
      sha: 'local',
      shortSha: 'local',
      message: 'Local development',
      author: 'Josh',
      date: new Date().toISOString(),
      branch: 'main'
    };
  }
}

async function extractCommitNotes(commitMessage) {
  // Extract meaningful info from commit messages
  const patterns = {
    feature: /feat|add|implement|create/i,
    fix: /fix|bug|resolve|patch/i,
    style: /style|design|ui|css/i,
    refactor: /refactor|cleanup|optimize/i,
    docs: /docs|readme|comment/i
  };
  
  const type = Object.keys(patterns).find(key => 
    patterns[key].test(commitMessage)
  ) || 'update';
  
  return {
    type,
    summary: commitMessage.split('\n')[0],
    fullMessage: commitMessage
  };
}

async function getCurrentTechStack() {
  try {
    const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf8'));
    return {
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {}),
      version: packageJson.version
    };
  } catch {
    return { dependencies: [], devDependencies: [], version: '0.1.0' };
  }
}

async function getFileChanges() {
  try {
    const changed = execSync('git diff --name-only HEAD~1 HEAD').toString().trim();
    const added = execSync('git diff --name-only --diff-filter=A HEAD~1 HEAD').toString().trim();
    const deleted = execSync('git diff --name-only --diff-filter=D HEAD~1 HEAD').toString().trim();
    
    return {
      changed: changed ? changed.split('\n') : [],
      added: added ? added.split('\n') : [],
      deleted: deleted ? deleted.split('\n') : []
    };
  } catch {
    return { changed: [], added: [], deleted: [] };
  }
}

async function updateTimeline(entry, sessionDir) {
  const timelinePath = `${DOCS_DIR}/timeline.json`;
  
  let timeline = [];
  try {
    timeline = JSON.parse(await fs.readFile(timelinePath, 'utf8'));
  } catch {
    // First entry
  }
  
  // Organize screenshots by theme and viewport for easy access
  const screenshotMap = {};
  if (entry.screenshots) {
    entry.screenshots.forEach(shot => {
      if (!screenshotMap[shot.theme]) {
        screenshotMap[shot.theme] = {};
      }
      screenshotMap[shot.theme][shot.viewport] = {
        filename: shot.filename,
        path: `${sessionDir}/${shot.filename}`
      };
    });
  }
  
  timeline.unshift({
    id: timeline.length + 1,
    timestamp: entry.timestamp,
    commit: entry.commit.shortSha,
    message: entry.commit.message.split('\n')[0],
    type: entry.notes.type,
    sessionDir: sessionDir.replace('./progress-docs/', ''),
    screenshots: screenshotMap,
    // For 21st.dev timeline component compatibility
    title: entry.commit.message.split('\n')[0],
    content: `${entry.notes.type.toUpperCase()}: ${entry.commit.message}`,
    date: new Date(entry.timestamp).toLocaleDateString('en-GB')
  });
  
  // Keep last 50 entries
  timeline = timeline.slice(0, 50);
  
  await fs.writeFile(timelinePath, JSON.stringify(timeline, null, 2));
  
  // Generate markdown timeline
  await generateMarkdownTimeline(timeline);
}

async function generateMarkdownTimeline(timeline) {
  const markdown = `# 🚀 Portfolio Development Timeline

> Auto-generated progress documentation - Perfect data for future timeline component!

${timeline.map(entry => `
## ${entry.date} - ${entry.commit}

**${entry.type.toUpperCase()}:** ${entry.message}

### 🖥️ Desktop Comparison
${entry.screenshots?.light?.desktop ? `
**Light Mode:**
![Light Desktop](${entry.screenshots.light.desktop.path})
` : ''}
${entry.screenshots?.dark?.desktop ? `
**Dark Mode:**
![Dark Desktop](${entry.screenshots.dark.desktop.path})
` : ''}

<details>
<summary>📱 Mobile Comparison</summary>

${entry.screenshots?.light?.mobile ? `
**Light Mode:**
![Light Mobile](${entry.screenshots.light.mobile.path})
` : ''}
${entry.screenshots?.dark?.mobile ? `
**Dark Mode:**
![Dark Mobile](${entry.screenshots.dark.mobile.path})
` : ''}

</details>

---
`).join('')}

*Last updated: ${new Date().toLocaleString('en-GB')}*

## 🎯 Timeline Component Data

This markdown file is generated from \`timeline.json\` which contains structured data perfect for feeding into components like:
- 21st.dev Timeline Component
- Aceternity UI Timeline  
- Custom React timeline components

Each entry includes:
- Timestamp & commit info
- Light/dark theme screenshots
- Desktop/mobile viewports
- Commit message analysis
- File change tracking
`;

  await fs.writeFile(`${DOCS_DIR}/TIMELINE.md`, markdown);
}

if (require.main === module) {
  captureProgress().catch(console.error);
}

module.exports = { captureProgress };