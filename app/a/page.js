import Page from '../../components/Page';

const PageA = () => {
  return (
    <Page
      title="Page A"
      chatProps={{ someProp: 'valueForPageA' }}
    >
      <p>This is Page A with a chat widget.</p>
    </Page>
  );
};

export default PageA;
