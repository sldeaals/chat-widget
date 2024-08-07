import Page from '../../components/Page';
import { fetchPrompts } from '../../lib/fetchPrompts';

const PageC = async () => {
  const prompts = await fetchPrompts('pageC');

  return (
    <Page
      title="Page C"
      chatProps={{ prompts }}
    >
      <p>This is Page C with a chat widget.</p>
    </Page>
  );
};

export default PageC;
