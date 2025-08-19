import PageContainer from '@/components/layout/page-container';
import AddClientContent from './AddClientContent';

export const metadata = {
  title: 'Dashboard: Client'
};

export default async function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-2'>
        <AddClientContent />
      </div>
    </PageContainer>
  );
}
