import Page from '../../components/Page';

const PageB = () => {
  return (
    <Page
      title="Page B"
      chatProps={{ someProp: 'valueForPageB' }} 
    >
      <p>This is Page B with a chat widget.</p>
    </Page>
  );
};

export default PageB;
