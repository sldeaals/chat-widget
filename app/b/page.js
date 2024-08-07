import Page from '../../components/Page';
import { fetchPrompts } from '../../lib/fetchPrompts';

const PageB = async () => {
  const prompts = await fetchPrompts('pageB');

  return (
    <Page
      title="Page B"
      chatProps={{ prompts }}
    >
      <p>This is Page B with a chat widget.</p>
    </Page>
  );
};

export default PageB;
