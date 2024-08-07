import Page from '../../components/Page';

const PageC = () => {
  return (
    <Page
      title="Page C"
      chatProps={{ someProp: 'valueForPageC' }}
    >
      <p>This is Page C with a chat widget.</p>
    </Page>
  );
};

export default PageC;
