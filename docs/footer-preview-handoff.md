# Footer and trust pages: preview handoff

Date: 2026-11-17. Baseline: `2b64aaaa9665b82627f4fa4cabc95631536cbb77`.
Branch: `codex/footer-trust-preview`. Preview approval does not authorize production.

## Delivered

- Four footer groups with 17 destinations in each language, including collaboration, help center, contact, security/AI data, terms, privacy, cookies and cancellation/refunds.
- Expanded practical guides and FAQ. Internal related links stay in the selected locale. Legal pages have individual version dates and an accessible table of contents.
- Owner-selected `support@elynto.io`, with topic-specific mail links. No form endpoint, message sent, or support-response-time promise.
- Native privacy dialog: keyboard focus, Escape, close button and focus return. Essential preferences and optional statistics are distinguished.
- Statistics require explicit versioned opt-in. Refusal, legacy opt-out, DNT and GPC prevent collection. Revocation stops future events and removes browser statistics IDs; it does not claim deletion of historical server data. Collector rejects pre-consent payload versions. Shared analytics/dataLayer hooks follow the same choice.
- No new dependencies. Approved Hero, network, typewriter, demo cards, avatars and animation timing were not edited.

## Owner decisions and publication checklist

- The owner requested no operating-entity name and selected the support address as a placeholder. Activate and test that mailbox before release. This omission is not a claim that operator identification is unnecessary in every jurisdiction.
- Terms and policies are a reviewable draft, not a legal certification. Before production, confirm the applicable legal/operator disclosures and the actual app/provider processing inventory, retention and cross-border arrangements. Avoid unsupported claims about SOC 2, ISO, training exclusion, zero retention or fixed uptime.
- No prices, refund window or paid-plan promises were invented. Final commercial conditions must be displayed before payment. Pricing, Changelog and Status links are intentionally deferred until real content, release records and monitoring exist.
- Feature availability can vary by workspace. Security text describes relevant-context AI processing and review of output without promising an unreleased feature or an unverified provider contract.
- Website statistics Redis retention is capped at 400 days. Local development file storage is separate and not the hosted production retention mechanism.
- No app workspace data, production configuration, main branch or production alias changed.

## Validation

- TypeScript passed.
- 12 Node tests passed: bilingual destination/link completeness, policy dates/actions, consent requirements, blocked-storage fallback, revocation, DNT/GPC, shared analytics, payload minimization and existing statistics behavior.
- ESLint: no errors, two pre-existing warnings (LanguageSwitch navigation and ProjectWorkspace unused ME).
- Optimized Next.js build passed, including all 34 footer destination pages.
- Preview UI and HTTP verification recorded in the pull request after deployment.
