import test from 'node:test';
import assert from 'node:assert/strict';
import * as p from '../src/data/profile.ts';

test('hero copy is the approved copy', () => {
  assert.equal(p.hero.headlineLead, 'From client idea to shipped product,');
  assert.equal(p.hero.headlineAccent, 'with AI in the loop.');
  assert.equal(p.hero.lede, 'I sit between clients and engineers at Runtime Revolution: I help clients decide what to build, help my teams work out how, and still ship code myself.');
  assert.equal(p.hero.byline, 'Team Leader at Runtime Revolution · Lisbon, Portugal');
  assert.equal(p.hero.primary.label, 'Start a conversation');
  assert.equal(p.hero.primary.href, p.links.linkedin);
  assert.equal(p.hero.secondary.href, '#work');
  assert.equal(p.hero.cv, undefined);
});

test('strip, AI work, projects and experience have the approved counts and values', () => {
  assert.deepEqual(p.strip(new Date('2026-10-25')).map(s => s.value), ['8 years', 'Healthcare · Automotive · Travel', '4 live sites']);
  assert.equal(p.strip(new Date('2027-01-02'))[0].value, '9 years');
  assert.equal(p.strip(new Date('2026-10-25'))[0].key, 'Track record');
  assert.equal(p.basedIn.body, 'Same time zone as London, all year. Overlaps nicely with most of Europe, mornings with the US east coast.');
  assert.equal(p.aiWork.items.length, 4);
  assert.equal(p.aiWork.items[0].title, 'Deal parsing from partner sites');
  assert.deepEqual(p.projects.items.map(i => i.name), ['Fran Padel Project', 'Blue Soul Journeys', 'Quinta do Espinhal', 'TRT Adv']);
  assert.equal(p.experience.length, 4);
  assert.equal(p.experience[0].sub, 'Full Stack Developer until 2025');
  assert.equal(p.experience[3].note, undefined);
});

test('one contact verb, no CV links, no phone', () => {
  for (const l of [p.nav.cta.label, p.hero.primary.label, p.band.cta.label]) assert.equal(l, 'Start a conversation');
  const json = JSON.stringify(p);
  assert.ok(!/resume|\.pdf|915238870/i.test(json));
  assert.equal(p.links.email, 'andrenunes.work@gmail.com');
});
