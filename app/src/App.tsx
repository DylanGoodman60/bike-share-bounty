import { useState, type ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { StationMap } from '@/features/stations/StationMap';
import { Topbar } from '@/components/Topbar';
import { TABS, tabId, tabPanelId, type TabId } from '@/components/tabs';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('map');

  return (
    <div className="grid h-dvh w-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
      <Topbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex min-h-0 min-w-0 p-2.5 sm:px-[clamp(14px,2.4vw,32px)] sm:pt-3.5 sm:pb-[clamp(14px,2.4vw,28px)]">
        {/* The map stays mounted while hidden so its view and selected route survive tab switches. */}
        <TabPanel id="map" activeTab={activeTab}>
          <div className="relative size-full overflow-hidden rounded-[10px] sm:rounded-xl" aria-label="Toronto map">
            <StationMap />
          </div>
        </TabPanel>
        {TABS.filter((tab) => tab.id !== 'map').map((tab) => (
          <TabPanel key={tab.id} id={tab.id} activeTab={activeTab}>
            <ComingSoon title={tab.label} />
          </TabPanel>
        ))}
      </main>

      <footer className="px-[clamp(14px,2.4vw,32px)] pb-3 text-center text-xs text-quiet">
        Fan project. Not affiliated with Bike Share Toronto.
        <br />
        Made by{' '}
        <a
          href="https://dylangoodman.ca"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-ink focus-visible:text-ink"
        >
          Dylan Goodman
        </a>
      </footer>
    </div>
  );
}

function TabPanel({ id, activeTab, children }: { id: TabId; activeTab: TabId; children: ReactNode }) {
  return (
    <section
      id={tabPanelId(id)}
      role="tabpanel"
      aria-labelledby={tabId(id)}
      hidden={id !== activeTab}
      className="min-h-0 min-w-0 flex-1 rounded-[14px] border border-edge bg-surface p-1 shadow-[0_14px_38px_rgb(34_58_48/12%)] sm:rounded-[18px] sm:p-1.25"
    >
      {children}
    </section>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="grid size-full place-items-center rounded-[10px] bg-felt bg-radial-[at_50%_30%] from-felt-light to-felt p-6 text-center sm:rounded-xl">
      <div className="flex flex-col items-center gap-3">
        <Sparkles className="text-gold" size={32} aria-hidden="true" />
        <h2 className="bg-linear-to-b from-gold-light to-gold-deep bg-clip-text font-display text-3xl text-transparent sm:text-4xl">
          {title}
        </h2>
        <p className="text-sm font-semibold tracking-[0.25em] text-white/60 uppercase">Coming soon</p>
      </div>
    </div>
  );
}

export default App
