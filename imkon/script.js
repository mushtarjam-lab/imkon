const fontRange = document.getElementById('fontRange');
const fontOutput = document.getElementById('fontOutput');
fontRange.addEventListener('input', () => {
  const scale = Number(fontRange.value);
  fontOutput.value = scale + '%';
  document.querySelectorAll('.lesson-card p, .lesson-card h3, .lesson-card .key-fact').forEach(el => {
    el.style.fontSize = '';
    el.style.zoom = scale / 100;
  });
});

const contrastBtn = document.getElementById('contrastBtn');
contrastBtn.addEventListener('click', () => {
  const active = document.body.classList.toggle('high-contrast');
  contrastBtn.setAttribute('aria-pressed', String(active));
  contrastBtn.textContent = active ? '◐ Oddiy kontrast' : '◐ Kontrast';
});

document.getElementById('readBtn').addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    alert('Brauzeringiz ovozli o‘qishni qo‘llab-quvvatlamaydi. Chrome yoki Edge brauzerini sinab ko‘ring.');
    return;
  }
  speechSynthesis.cancel();
  const text = document.getElementById('lessonText').innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'uz-UZ';
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
});
document.getElementById('stopBtn').addEventListener('click', () => {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
});

document.getElementById('simplifyBtn').addEventListener('click', () => {
  const input = document.getElementById('sourceText').value.trim();
  const output = document.getElementById('simpleResult');
  if (!input) { output.textContent = 'Avval matn kiriting.'; return; }
  // Demo simplifier: split long sentences and replace a few complex expressions.
  const replacements = [
    [/hayot faoliyati uchun muhim tabiiy resurs hisoblanadi/gi, 'yashash uchun juda kerak'],
    [/oqilona foydalanish/gi, 'tejab va to‘g‘ri ishlatish'],
    [/ekologik barqarorlikni ta'minlashda/gi, 'tabiatni asrashda'],
    [/muhim ahamiyatga ega/gi, 'juda muhim']
  ];
  let result = input;
  replacements.forEach(([pattern, value]) => result = result.replace(pattern, value));
  result = result.replace(/;\s*/g, '. ').replace(/,\s*/g, ', ');
  const sentences = result.match(/[^.!?]+[.!?]?/g) || [result];
  output.innerHTML = '';
  sentences.map(s => s.trim()).filter(Boolean).forEach(sentence => {
    const p = document.createElement('p');
    p.textContent = sentence;
    output.appendChild(p);
  });
});

document.querySelectorAll('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById(btn.dataset.scroll).scrollIntoView({behavior:'smooth'});
}));
document.querySelectorAll('.phrase').forEach(btn => btn.addEventListener('click', () => {
  document.getElementById('phraseOutput').textContent = btn.dataset.phrase;
}));

document.querySelectorAll('#quizOptions button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('#quizOptions button').forEach(b => b.classList.remove('correct','wrong'));
  const good = btn.dataset.correct === 'true';
  btn.classList.add(good ? 'correct' : 'wrong');
  document.getElementById('quizFeedback').textContent = good ? 'Barakalla! To‘g‘ri javob.' : 'Yana bir bor urinib ko‘ring.';
}));
