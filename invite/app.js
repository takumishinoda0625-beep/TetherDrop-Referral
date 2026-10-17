'use strict';
(() => {
  const url = new URL(window.location.href);
  const entries = [...url.searchParams.entries()];
  const code = url.searchParams.get('code');
  const valid = !url.hash && entries.length === 1 && entries[0][0] === 'code' && /^[a-fA-F0-9]{12}$/.test(code || '');
  if (!valid) {
    const showError = () => {
      const english = document.documentElement.lang === 'en';
      document.getElementById('invalid').textContent = english ? 'This referral link is invalid. Reopen the original link from your friend.' : '紹介リンクが正しくありません。友達から届いたリンクを開き直してください。';
      document.querySelector('.lead').textContent = english ? 'Use the referral link you received from your friend.' : '友達から届いた紹介リンクをご利用ください。';
    };
    document.addEventListener('tetherdrop-language', showError);
    showError();
    return;
  }
  const normalized = code.toUpperCase();
  document.getElementById('code').textContent = normalized;
  document.getElementById('open-app').href = `tetherdrop://invite?code=${normalized}`;
  document.getElementById('invalid').hidden = true;
  document.getElementById('invitation').hidden = false;
})();
