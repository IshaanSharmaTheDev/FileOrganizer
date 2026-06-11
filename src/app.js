(function(){
  'use strict';
  let allFiles = [];

  function loadFiles(fileList) {
    allFiles = Array.from(fileList);
    renderAll();
  }

  function renderAll() {
    renderStats();
    renderCategories();
    renderDuplicates();
    renderLargeFiles();
  }

  function renderStats() {
    const s = FileOrganizer.getStats(allFiles);
    document.getElementById('stat-count').textContent = s.count;
    document.getElementById('stat-size').textContent = FileOrganizer.formatSize(s.total);
    document.getElementById('stat-cats').textContent = s.categories;
    const breakdown = document.getElementById('cat-breakdown');
    breakdown.innerHTML = s.catBreakdown.sort((a,b)=>b.count-a.count).map(c =>
      `<div class="breakdown-row">
        <span class="bd-name">${c.name}</span>
        <span class="bd-count">${c.count} files</span>
        <span class="bd-size">${FileOrganizer.formatSize(c.size)}</span>
        <div class="bd-bar"><div style="width:${Math.round(c.count/allFiles.length*100)}%;background:var(--accent)"></div></div>
      </div>`
    ).join('');
  }

  function renderCategories() {
    const cats = FileOrganizer.categorize(allFiles);
    const container = document.getElementById('file-grid');
    container.innerHTML = Object.entries(cats).map(([cat, files]) =>
      `<div class="cat-section">
        <div class="cat-header"><span class="cat-name">${getIcon(cat)} ${cat}</span><span class="cat-count">${files.length}</span></div>
        <div class="file-list">
          ${files.slice(0,30).map(f=>`<div class="file-row"><span class="file-name">${esc(f.name)}</span><span class="file-size">${FileOrganizer.formatSize(f.size)}</span></div>`).join('')}
          ${files.length>30?`<div class="more-files">+${files.length-30} more…</div>`:''}
        </div>
      </div>`
    ).join('') || '<div class="empty">Drop files or click to select</div>';
  }

  function renderDuplicates() {
    const dupes = FileOrganizer.getDuplicates(allFiles);
    document.getElementById('dupe-list').innerHTML = dupes.length
      ? dupes.map(f=>`<div class="file-row warn"><span class="file-name">⚠ ${esc(f.name)}</span><span class="file-size">${FileOrganizer.formatSize(f.size)}</span></div>`).join('')
      : '<div class="empty-small">No duplicates found</div>';
    document.getElementById('dupe-count').textContent = dupes.length;
  }

  function renderLargeFiles() {
    const threshold = parseInt(document.getElementById('large-threshold').value)||10;
    const large = FileOrganizer.getLargeFiles(allFiles, threshold);
    document.getElementById('large-list').innerHTML = large.length
      ? large.sort((a,b)=>b.size-a.size).map(f=>`<div class="file-row"><span class="file-name">${esc(f.name)}</span><span class="file-size large-size">${FileOrganizer.formatSize(f.size)}</span></div>`).join('')
      : '<div class="empty-small">No large files</div>';
  }

  function getIcon(cat) {
    const icons = {Images:'🖼',Videos:'🎬',Audio:'🎵',Documents:'📄',Code:'💻',Archives:'📦',Data:'📊',Fonts:'🔤',Ebooks:'📚',Other:'📁'};
    return icons[cat]||'📁';
  }

  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function init() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', e => { e.preventDefault(); dropZone.classList.remove('drag-over'); loadFiles(e.dataTransfer.files); });
    fileInput.addEventListener('change', () => loadFiles(fileInput.files));
    document.getElementById('large-threshold').addEventListener('change', renderLargeFiles);
    document.getElementById('filter-input').addEventListener('input', function() {
      const q = this.value.toLowerCase();
      document.querySelectorAll('.file-row').forEach(r => r.style.display = r.textContent.toLowerCase().includes(q)?'':'none');
    });
  }
  document.addEventListener('DOMContentLoaded', init);
})();
