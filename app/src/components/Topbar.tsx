import type { KeyboardEvent, ReactNode } from 'react';
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react';
import { Bike, LogIn, LogOut, UserPlus } from 'lucide-react';
import linkedin from '@/assets/InBug-Black.png';
import gh from '@/assets/GitHub_Invertocat_Black.png';
import { TABS, tabId, tabPanelId, type TabId } from './tabs';

type TopbarProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function Topbar({ activeTab, onTabChange }: TopbarProps) {
  return (
    <header className="relative border-b-2 border-gold/50 bg-felt bg-radial-[at_20%_0%] from-felt-light to-felt text-white">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-[clamp(16px,3vw,42px)] pt-2.5 pb-2 md:h-16 md:py-0">
        <Brand />
        <span className="hidden border-l border-white/15 pl-4 text-xs font-medium text-white/55 xl:block">
          Toronto bike share station activity (2024–present)
        </span>

        <TabList activeTab={activeTab} onTabChange={onTabChange} />

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Show when="signed-out">
            <SignInButton>
              <AuthButton variant="outline" icon={<LogIn size={16} aria-hidden="true" />}>
                Log in
              </AuthButton>
            </SignInButton>
            <SignUpButton>
              <AuthButton variant="solid" icon={<UserPlus size={16} aria-hidden="true" />} className="max-sm:hidden">
                Sign up
              </AuthButton>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
            <SignOutButton>
              <AuthButton variant="outline" icon={<LogOut size={16} aria-hidden="true" />}>
                Log out
              </AuthButton>
            </SignOutButton>
          </Show>

          <span className="mx-1 hidden h-6 w-px bg-white/15 sm:block" aria-hidden="true" />
          <SocialLink href="https://github.com/DylanGoodman60/bike-share-route-stats" label="GitHub" icon={gh} />
          <SocialLink href="https://www.linkedin.com/in/dylan-jr-goodman/" label="LinkedIn" icon={linkedin} />
        </div>
      </div>
    </header>
  );
}

function Brand() {
  return (
    <div className="group flex shrink-0 items-center gap-2.5 select-none">
      <span
        className="grid size-9 place-items-center rounded-full border-[3px] border-dashed border-white/90 bg-chip shadow-[0_0_0_2px_var(--color-chip),0_4px_12px_rgb(0_0_0/40%)] transition-transform duration-500 group-hover:rotate-180 md:size-10"
        aria-hidden="true"
      >
        <Bike size={18} strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[10px] tracking-[0.3em] text-white/80 md:text-[11px]">Bike Share</span>
        <span className="bg-linear-to-b from-gold-light via-gold to-gold-deep bg-clip-text font-display text-2xl text-transparent drop-shadow-[0_2px_0_rgb(0_0_0/45%)] md:text-[28px]">
          Bounty
        </span>
      </span>
    </div>
  );
}

function TabList({ activeTab, onTabChange }: TopbarProps) {
  // Roving focus per the WAI-ARIA tabs pattern: arrows/Home/End move between tabs.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = TABS.findIndex((tab) => tab.id === activeTab);
    const next = {
      ArrowRight: (index + 1) % TABS.length,
      ArrowLeft: (index - 1 + TABS.length) % TABS.length,
      Home: 0,
      End: TABS.length - 1,
    }[event.key];
    if (next === undefined) return;

    event.preventDefault();
    onTabChange(TABS[next].id);
    document.getElementById(tabId(TABS[next].id))?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Sections"
      onKeyDown={handleKeyDown}
      className="order-last -mx-1 flex w-full gap-1 overflow-x-auto px-1 pb-1 md:order-none md:mx-0 md:w-auto md:p-0"
    >
      {TABS.map(({ id, label, icon: Icon }) => {
        const selected = id === activeTab;
        return (
          <button
            key={id}
            id={tabId(id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={tabPanelId(id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onTabChange(id)}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              selected
                ? 'bg-linear-to-b from-gold-light to-gold text-felt shadow-[inset_0_-2px_0_var(--color-gold-deep),0_0_14px_rgb(245_197_66/35%)]'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

type AuthButtonProps = {
  variant: 'solid' | 'outline';
  icon: ReactNode;
  className?: string;
  children: ReactNode;
  // Clerk's Sign*Button clones its child and injects onClick.
  onClick?: () => void;
};

function AuthButton({ variant, icon, className = '', children, onClick }: AuthButtonProps) {
  const variantClass = variant === 'solid'
    ? 'border-gold-deep bg-linear-to-b from-gold-light to-gold text-felt shadow-[inset_0_-2px_0_var(--color-gold-deep)] hover:brightness-105'
    : 'border-gold/60 text-gold hover:border-gold hover:bg-gold/10';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:translate-y-px ${variantClass} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} profile`}
      title={label}
      className="hidden rounded-lg p-1 transition-colors hover:bg-white/10 focus-visible:bg-white/10 sm:block"
    >
      <img src={icon} alt="" width="26" height="26" className="invert" />
    </a>
  );
}
