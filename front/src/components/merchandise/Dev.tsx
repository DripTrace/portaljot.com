import ContentComponent from '@/components/merchandise/ContentComponent';

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function Dev() {
  return (
    <ContentComponent title="Dev" description={`${title} - ${subtitle}`}>
      <h1>Dev</h1>
    </ContentComponent>
  );
}
