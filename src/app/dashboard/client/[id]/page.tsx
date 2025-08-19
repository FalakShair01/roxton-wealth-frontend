import PageContainer from '@/components/layout/page-container';
import ClientDetailContent from './ClientDetailContent';
import { MOCK_CLIENTS_DETAIL } from '@/constants/mock-clients-detail';

export const metadata = {
  title: 'Dashboard: View Client'
};

type Params = { id: string };
type Search = Record<string, string | string[] | undefined>;

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<Params>;
  searchParams?: Promise<Search>;
}) {
  const { id: clientId } = await params;
  console.log('Client ID:', clientId);
  const clientData = MOCK_CLIENTS_DETAIL.find(
    (client) => client.id === clientId
  );
  console.log('Client Data:', clientData);

  if (!clientData) {
    return (
      <PageContainer scrollable={false}>
        <div className='flex flex-1 flex-col space-y-2'>
          <p>Client not found</p>
        </div>
      </PageContainer>
    );
  }
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-2'>
        <ClientDetailContent data={clientData} />
      </div>
    </PageContainer>
  );
}
