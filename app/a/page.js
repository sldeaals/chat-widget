import Page from '../../components/Page';
import { fetchPrompts } from '../../lib/fetchPrompts';

const PageA = async () => {
  const prompts = await fetchPrompts('pageA');

  return (
    <Page
      title="Page A"
      chatProps={{ prompts }}
    >
      <p>This is Page A with a chat widget.</p>
    </Page>
  );
};

export default PageA;
