import ContentComponent from '@/components/merchandise/ContentComponent';
import QuickSketch from '@/lib/merchandise/Production/QuickSketch';

function Sketch() {
  return (
    <>
      <ContentComponent title="Sketch" description="quick sketch">
        <QuickSketch />
      </ContentComponent>
    </>
  );
}

export default Sketch;
