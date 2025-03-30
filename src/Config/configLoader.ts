import yaml from 'js-yaml';

export interface AppConfiguration {
  api: {
    baseUrl: string;
    endpoints: [
      auth: {
        login: string;
        refreshToken: string;
      },
      testimonial: {
        getAll: string;
        create: string;
        delete: string;
      },
      email: {
        receiveEmail: string;
        sendVerificationCodeEmail: string;
      },
    ];
  };
  secrets: {
    readOnlyUserPassword: string;
  };
  user: {
    email: string;
  };
}

// Load environment variables (secrets)
const loadEnvironmentSecrets = (): AppConfiguration['secrets'] => {
  return {
    readOnlyUserPassword: import.meta.env.VITE_READ_ONLY_USER_PASSWORD || '',
  };
};

// Get the correct config file based on APP_ENV
const getConfigFile = (): string => {
  const env = import.meta.env.VITE_APP_ENV.toLowerCase() || 'local';
  return `src/Config/config.${env}.yml`;
};

let appConfiguration: AppConfiguration | null = null;
// Load YAML config dynamically
export const loadAppConfig = async (): Promise<void> => {
  try {
    const configFile = getConfigFile();
    const response = await fetch(configFile);
    const yamlText = await response.text();
    const yamlConfig = yaml.load(yamlText) as AppConfiguration;

    appConfiguration = {
      ...yamlConfig,
      secrets: loadEnvironmentSecrets(),
    };
  } catch (error) {
    console.error('Failed to load Application configuration:', error);
  }
};

export const getAppConfiguration = (): AppConfiguration | null => appConfiguration;
