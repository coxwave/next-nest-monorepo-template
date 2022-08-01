import TagManager, { type TagManagerArgs } from 'react-gtm-module';

const GTM = {
  initialize: (gtmId: string, options?: Omit<TagManagerArgs, 'gtmId'>) => {
    TagManager.initialize({ gtmId, ...options });
  },
  // dataLayer: TagManager.dataLayer,
};

export default GTM;
