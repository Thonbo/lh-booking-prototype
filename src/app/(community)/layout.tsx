import SkipLink from '@/components/community/SkipLink';
import CommunityHeader from '@/components/community/CommunityHeader';
import CommunityFooter from '@/components/community/CommunityFooter';

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <CommunityHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <CommunityFooter />
    </>
  );
}
