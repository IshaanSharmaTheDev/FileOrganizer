const FileOrganizer = (() => {
  const CATEGORIES = {
    Images: ['jpg','jpeg','png','gif','webp','svg','bmp','ico','tiff','avif'],
    Videos: ['mp4','mov','avi','mkv','webm','flv','wmv','m4v'],
    Audio: ['mp3','wav','ogg','flac','aac','m4a','wma'],
    Documents: ['pdf','doc','docx','xls','xlsx','ppt','pptx','odt','pages','numbers'],
    Code: ['js','ts','py','rb','go','rs','cpp','c','h','java','cs','php','html','css','json','xml','yaml','sh','sql'],
    Archives: ['zip','tar','gz','rar','7z','bz2'],
    Data: ['csv','tsv','sqlite','db'],
    Fonts: ['ttf','otf','woff','woff2'],
    Ebooks: ['epub','mobi','azw'],
  };

  function categorize(files) {
    const cats = {};
    const unknown = [];
    files.forEach(f => {
      const ext = (f.name.split('.').pop()||'').toLowerCase();
      let placed = false;
      for (const [cat, exts] of Object.entries(CATEGORIES)) {
        if (exts.includes(ext)) {
          if (!cats[cat]) cats[cat] = [];
          cats[cat].push(f);
          placed = true; break;
        }
      }
      if (!placed) unknown.push(f);
    });
    if (unknown.length) cats['Other'] = unknown;
    return cats;
  }

  function getDuplicates(files) {
    const seen = {};
    const dupes = [];
    files.forEach(f => {
      const key = `${f.name}_${f.size}`;
      if (seen[key]) dupes.push(f);
      else seen[key] = true;
    });
    return dupes;
  }

  function getLargeFiles(files, thresholdMB = 10) {
    return files.filter(f => f.size > thresholdMB * 1024 * 1024);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes/1024).toFixed(1) + ' KB';
    if (bytes < 1073741824) return (bytes/1048576).toFixed(1) + ' MB';
    return (bytes/1073741824).toFixed(2) + ' GB';
  }

  function getStats(files) {
    const total = files.reduce((s,f)=>s+f.size,0);
    const cats = categorize(files);
    return { total, count: files.length, categories: Object.keys(cats).length, catBreakdown: Object.entries(cats).map(([k,v])=>({name:k,count:v.length,size:v.reduce((s,f)=>s+f.size,0)})) };
  }

  return { categorize, getDuplicates, getLargeFiles, formatSize, getStats, CATEGORIES };
})();
