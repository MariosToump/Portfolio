document.querySelectorAll<HTMLButtonElement>('[data-print]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
});
const filters = document.querySelector<HTMLElement>('.filters');
if (filters) {
  filters.hidden = false;
  filters.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let count = 0;
      document.querySelectorAll<HTMLElement>('.timeline li').forEach(role => {
        role.hidden = selected !== 'all' && !role.dataset.groups?.split(' ').includes(selected!);
        if (!role.hidden) count++;
      });
      const counter = document.querySelector('#filter-count');
      if (counter) counter.textContent = `${count} ${document.documentElement.lang === 'el' ? 'θέσεις εμφανίζονται' : 'roles shown'}`;
    });
  });
}
const form = document.querySelector<HTMLFormElement>('#report-demo');
if (form) {
  form.hidden = false;
  const issue = form.querySelector<HTMLSelectElement>('#issue')!;
  const critical = form.querySelector<HTMLInputElement>('#critical')!;
  const status = form.querySelector<HTMLSelectElement>('#status')!;
  const summary = form.querySelector<HTMLElement>('#management-summary')!;
  function update() {
    form!.querySelector('#summary-issue')!.textContent = issue.selectedOptions[0].textContent;
    form!.querySelector('#summary-priority')!.textContent = critical.checked ? summary.dataset.urgent! : summary.dataset.normal!;
    form!.querySelector('#summary-status')!.textContent = status.selectedOptions[0].textContent;
    summary.classList.toggle('is-critical', critical.checked);
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', update);
  form.addEventListener('reset', () => { setTimeout(update, 0); });
}
function preserveSection() {
  document.querySelectorAll<HTMLAnchorElement>('.language-switch').forEach(link => {
    const path = new URL(link.href).pathname;
    link.href = `${path}${window.location.hash}`;
  });
}
preserveSection();
window.addEventListener('hashchange', preserveSection);
