'use strict';
(() => {
  const url = new URL(window.location.href);
  const entries = [...url.searchParams.entries()];
  const code = url.searchParams.get('code');
  const valid = !url.hash && entries.length === 1 && entries[0][0] === 'code' && /^[a-fA-F0-9]{12}$/.test(code || '');
  if (!valid) {
    document.getElementById('invalid').textContent = '紹介リンクが正しくありません。友達から届いたリンクを開き直してください。';
    document.querySelector('.lead').textContent = '友達から届いた紹介リンクをご利用ください。';
    return;
  }
  const normalized = code.toUpperCase();
  document.getElementById('code').textContent = normalized;
  document.getElementById('open-app').href = `tetherdrop://invite?code=${normalized}`;
  document.getElementById('invalid').hidden = true;
  document.getElementById('invitation').hidden = false;
})();
