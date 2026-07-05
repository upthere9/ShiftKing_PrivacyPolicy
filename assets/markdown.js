/*
 * Minimal Markdown renderer.
 * Escapes all input first, then only ever emits tags it generates itself,
 * so raw HTML/script tags inside a source .md file can never execute.
 */
(function (global) {
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderInline(text) {
    var out = escapeHtml(text);

    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (match, label, url) {
      var isSafe = /^(https?:|mailto:|\.\/|\/|#)/i.test(url);
      var safeUrl = isSafe ? url : '#';
      var isExternal = /^https?:/i.test(safeUrl);
      return '<a href="' + safeUrl + '"' +
        (isExternal ? ' target="_blank" rel="noopener noreferrer"' : '') +
        '>' + label + '</a>';
    });

    return out;
  }

  function splitTableRow(line) {
    return line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map(function (cell) { return cell.trim(); });
  }

  function isTableSeparator(line) {
    return /^\s*\|?(\s*:?-+:?\s*\|)*\s*:?-+:?\s*\|?\s*$/.test(line) && line.indexOf('-') !== -1;
  }

  function render(markdown) {
    var lines = markdown.replace(/\r\n/g, '\n').split('\n');
    var html = '';
    var i = 0;
    var paragraphBuf = [];

    function flushParagraph() {
      if (paragraphBuf.length) {
        html += '<p>' + renderInline(paragraphBuf.join(' ')) + '</p>\n';
        paragraphBuf = [];
      }
    }

    while (i < lines.length) {
      var line = lines[i];

      if (/^\s*$/.test(line)) {
        flushParagraph();
        i++;
        continue;
      }

      if (/^\s*---+\s*$/.test(line)) {
        flushParagraph();
        html += '<hr>\n';
        i++;
        continue;
      }

      var headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        flushParagraph();
        var level = headingMatch[1].length;
        html += '<h' + level + '>' + renderInline(headingMatch[2]) + '</h' + level + '>\n';
        i++;
        continue;
      }

      if (line.indexOf('|') !== -1 && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
        flushParagraph();
        var headerCells = splitTableRow(line);
        i += 2;
        var rows = [];
        while (i < lines.length && lines[i].indexOf('|') !== -1 && !/^\s*$/.test(lines[i])) {
          rows.push(splitTableRow(lines[i]));
          i++;
        }
        html += '<table>\n<thead><tr>' +
          headerCells.map(function (c) { return '<th>' + renderInline(c) + '</th>'; }).join('') +
          '</tr></thead>\n<tbody>\n';
        rows.forEach(function (r) {
          html += '<tr>' + r.map(function (c) { return '<td>' + renderInline(c) + '</td>'; }).join('') + '</tr>\n';
        });
        html += '</tbody>\n</table>\n';
        continue;
      }

      if (/^\s*[-*]\s+/.test(line)) {
        flushParagraph();
        html += '<ul>\n';
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          html += '<li>' + renderInline(lines[i].replace(/^\s*[-*]\s+/, '')) + '</li>\n';
          i++;
        }
        html += '</ul>\n';
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        flushParagraph();
        html += '<ol>\n';
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          html += '<li>' + renderInline(lines[i].replace(/^\s*\d+\.\s+/, '')) + '</li>\n';
          i++;
        }
        html += '</ol>\n';
        continue;
      }

      paragraphBuf.push(line.trim());
      i++;
    }

    flushParagraph();
    return html;
  }

  global.MiniMarkdown = { render: render };
})(window);
