// Explicit opt-ins only. Never copy the original application PDFs into public/.
export const publicContact: { email: string | null; redactedPdfs: { en: string | null; el: string | null } } = {
  email: null,
  redactedPdfs: { en: null, el: null },
};
