const fs = require('fs');
const path = require('path');

// Files to fix with their patterns
const filesToFix = [
  'app/api/courses/approve/[id]/route.ts',
  'app/api/admin/courses/route.ts', 
  'app/api/admin/pending-courses/route.ts',
  'app/api/student/courses/route.ts',
  'app/api/courses/[id]/reject/route.ts',
  'app/api/institute/dashboard/route.ts'
];

function fixFile(filePath) {
  const fullPath = path.join('c:\\Users\\Ayush\\Desktop\\LMS@\\LMS', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = 0;
  
  // Fix include statements
  const includePattern = /include:\s*{\s*teacher:\s*{/g;
  if (content.match(includePattern)) {
    content = content.replace(includePattern, 'include: {\n        User: {');
    changes++;
  }
  
  // Fix nested teacher references in include statements
  const nestedPattern = /teacher:\s*{\s*select:/g;
  if (content.match(nestedPattern)) {
    content = content.replace(nestedPattern, 'User: {\n          select:');
    changes++;
  }
  
  // Fix property access patterns
  const accessPatterns = [
    /(\w+)\.teacher\.name/g,
    /(\w+)\.teacher\.email/g,
    /(\w+)\.teacher\.id/g
  ];
  
  accessPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, '$1.User.name');
      content = content.replace(/(\w+)\.User\.name/g, '$1.User.name');
      content = content.replace(/(\w+)\.teacher\.email/g, '$1.User.email');
      content = content.replace(/(\w+)\.teacher\.id/g, '$1.User.id');
      changes++;
    }
  });
  
  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed ${changes} issues in ${filePath}`);
  } else {
    console.log(`📄 No changes needed in ${filePath}`);
  }
}

console.log('🔧 Fixing teacher relation references in API files...\n');

filesToFix.forEach(fixFile);

console.log('\n🎉 All API files have been updated!');
console.log('\n📝 Summary of changes:');
console.log('- Changed teacher: { to User: {');  
console.log('- Changed .teacher.name to .User.name');
console.log('- Changed .teacher.email to .User.email');
console.log('- Changed .teacher.id to .User.id');