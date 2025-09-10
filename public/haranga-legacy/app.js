(async function(){
  // edition = /haranga-legacy/editions/0001/
  const parts = location.pathname.replace(/\/+$/, '').split('/');
  const edition = parts[parts.length-1].match(/^\d{4}$/) ? parts[parts.length-1] : null;

  const elEdition = document.querySelector('[data-edition]');
  const elOwner   = document.querySelector('[data-owner]');
  const elClaim   = document.querySelector('[data-claim]'); // үлдээсэн ч, одоо автоматаар асууна
  const elForm    = document.querySelector('#claim-form');   // байж болно (backup), гэхдээ prompt-аар шийдэж байна
  const elName    = document.querySelector('#owner-name');
  const elStatus  = document.querySelector('#status');

  if (elEdition) elEdition.textContent = edition ?? '—';

  // ----- API helpers -----
  async function getStatus(id) {
    const r = await fetch(`/api/edition/${id}`, { headers: { 'accept':'application/json' }});
    if (!r.ok) throw new Error('API error GET');
    return r.json();
  }
  async function claim(id, name) {
    const r = await fetch(`/api/edition/${id}`, {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ name })
    });
    if (!r.ok) {
      const j = await r.json().catch(()=>({}));
      throw new Error(j.error || 'claim_failed');
    }
    return r.json();
  }

  // ----- UI update -----
  function showClaimed(name, whenIso) {
    if (elOwner) elOwner.textContent = name;
    if (elClaim) elClaim.hidden = true;
    if (elStatus) {
      const when = whenIso ? new Date(whenIso).toLocaleString() : '';
      elStatus.innerHTML = `<span class="lock">Locked</span>${when ? ' · Claimed at ' + when : ''}`;
    }
  }
  function showUnclaimed() {
    if (elOwner) elOwner.textContent = '(unclaimed)';
    if (elClaim) elClaim.hidden = false;
    if (elStatus) elStatus.textContent = 'First claim will lock this edition.';
  }

  // ----- First-visit prompt flow -----
  async function maybePromptAndClaim(id) {
    // Хэрвээ prompt цонхыг өмнө нь энэ session-д хаасан бол дахин шахахгүй
    const dismissedKey = `mm_prompt_dismissed_${id}`;
    if (sessionStorage.getItem(dismissedKey) === '1') return;

    const name = (prompt('Энэ edition-ийн эзэмшигчийн нэрийг оруулна уу:') || '').trim();
    if (!name) {
      // хэрэглэгч хаасан/хоосон орхисон → энэ session-д дахин бүү шах
      sessionStorage.setItem(dismissedKey, '1');
      return;
    }
    try {
      const res = await claim(id, name);
      showClaimed(res.owner, res.claimed_at);
    } catch (e) {
      if (String(e.message) === 'already_claimed') {
        // өөр хүн түрүүлээд авсан бол статус шинэчлээд л зогсооно
        const st = await getStatus(id);
        if (st.owner) showClaimed(st.owner, st.claimed_at);
      } else {
        alert('Claim алдаа: ' + e.message);
      }
    }
  }

  // ----- Initial load -----
  try {
    const st = await getStatus(edition);
    if (st.owner) {
      showClaimed(st.owner, st.claimed_at);
    } else {
      showUnclaimed();
      // owner байхгүй тул анхны ачаалтад шууд асууна
      await maybePromptAndClaim(edition);
    }
  } catch (e) {
    if (elStatus) elStatus.textContent = 'API error. Please refresh.';
  }

  // ----- (Нөөц) Form-оор claim хийх боломжийг үлдээнэ -----
  if (elForm) {
    elForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = (elName?.value || '').trim();
      if (!name) { alert('Нэрээ оруулна уу'); return; }
      try {
        const res = await claim(edition, name);
        showClaimed(res.owner, res.claimed_at);
      } catch (err) {
        alert(err.message === 'already_claimed'
          ? 'Энэ дугаар аль хэдийн эзэмшигчтэй.'
          : 'Алдаа. Дахин оролдоно уу.');
      }
    });
  }

  // ----- Hidden autoplay audio -----
  const audio = document.getElementById('bg-audio');
  if (audio) {
    const tryPlay = async () => {
    try {
		await audio.play();
		} catch {}
	};
	tryPlay();
    document.addEventListener('click', tryPlay, { once: true });      // хориглолттой бол эхний click дээр
    document.addEventListener('touchstart', tryPlay, { once: true }); // mobile fallback
	setTimeout(() => {
		if (audio.muted) {
			audio.muted = false;
    }
  }, 3000);
}