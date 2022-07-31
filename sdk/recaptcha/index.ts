import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import { ConsoleLogger, Logger } from '@packages/utils';

export class Recaptcha {
  client: RecaptchaEnterpriseServiceClient;
  projectPath: string;
  siteKey: string;
  logger: Logger;

  constructor(createOpt: {
    client: RecaptchaEnterpriseServiceClient;
    gcpProjectId: string;
    siteKey: string;
    logger?: Logger;
  }) {
    const { client, gcpProjectId, siteKey, logger } = createOpt;

    const projectPath = client.projectPath(gcpProjectId);

    this.client = client;
    this.projectPath = projectPath;
    this.siteKey = siteKey;
    this.logger = logger || new ConsoleLogger();
  }

  async verifyToken(token: string, scoreThreshold: number = 0.7): Promise<void> {
    const [response] = await this.client.createAssessment({
      assessment: { event: { token, siteKey: this.siteKey } },
      parent: this.projectPath,
    });

    // Invalid token
    if (!response.tokenProperties?.valid) {
      throw new Error('Invalid recaptcha token.');
    }

    if (!response.riskAnalysis) {
      throw new Error('No rickAnalysis from recaptcha response');
    }

    if (process.env.NODE_ENV === 'development') {
      this.logger.info('The reCAPTCHA score is: ' + response.riskAnalysis.score);
      response.riskAnalysis.reasons?.forEach((reason) => {
        this.logger.info(String(reason));
      });
    }

    const { score } = response.riskAnalysis;

    if (score && score < scoreThreshold) {
      throw new Error('Low recaptcha score.');
    }
  }
}

/** @see https://cloud.google.com/recaptcha-enterprise/docs/create-assessment */
export const initializeRecaptcahClient = async (createOpt: {
  gcpProjectId: string;
  siteKey: string;
  logger?: Logger;
}) => {
  const { gcpProjectId, siteKey, logger } = createOpt;
  const client = new RecaptchaEnterpriseServiceClient();

  const recaptchaClient = new Recaptcha({ client, gcpProjectId, siteKey, logger });

  // validate provided GCP auth credentials
  await recaptchaClient.client.auth.getAccessToken();

  return recaptchaClient;
};
