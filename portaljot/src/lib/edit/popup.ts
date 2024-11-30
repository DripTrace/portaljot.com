// lib/popup.ts
'use client';

export function popup(text: HTMLElement) {
  const div = document.createElement('div');
  div.addEventListener('keydown', function (ev) {
    ev.stopPropagation();
  });
  const close = document.createElement('a');
  close.addEventListener('click', function () {
    div.remove();
  });
  close.textContent = '[x]';
  close.classList.add('close');
  div.appendChild(close);
  div.appendChild(text);
  div.classList.add('popup');
  document.body.appendChild(div);
}
