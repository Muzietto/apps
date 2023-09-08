import baseSystemPrompt from '@configs/prompts/baseSystemPrompt';
import baseUrl from '@configs/ai/baseUrl';
import { DialogAppSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { AppInstallationParameters, ProfileType } from '@locations/ConfigScreen';
import AI from '@utils/aiApi';
import { ChatCompletionRequestMessage } from 'openai';
import { useEffect, useMemo, useState } from 'react';
import { mapV1ParamsToV2 } from '@utils/config/parameterHelpers';

export type GenerateMessage = (prompt: string, targetLocale: string) => Promise<string>;

/**
 * This hook is used to generate messages using the OpenAI API
 * output will stream messages just like a chatbot
 *
 * @returns { generateMessage, resetOutput, output, sendStopSignal }
 */
const useAI = () => {
  const sdk = useSDK<DialogAppSDK>();
  const parameters = sdk.parameters.installation;
  let newParameters = {};

  if (parameters.version !== 2) {
    newParameters = { ...mapV1ParamsToV2(parameters) };
  } else {
    newParameters = { ...parameters };
  }

  const { apiKey, model } = newParameters as AppInstallationParameters;

  const ai = useMemo(() => new AI(baseUrl, apiKey, model), [apiKey, model]);
  const [output, setOutput] = useState<string>('');
  const [stream, setStream] = useState<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const createGPTPayload = (
    content: string,
    profile: ProfileType,
    targetLocale: string
  ): ChatCompletionRequestMessage[] => {
    const userPrompt: ChatCompletionRequestMessage = {
      role: 'user',
      content,
    };

    return [...baseSystemPrompt(profile, targetLocale), userPrompt];
  };

  const resetOutput = () => {
    setOutput('');
  };

  const generateMessage = async (prompt: string, targetLocale: string) => {
    resetOutput();
    let completeMessage = '';

    try {
      const payload = createGPTPayload(prompt, sdk.parameters.installation.profile, targetLocale);

      const stream = await ai.streamChatCompletion(payload);
      setStream(stream);

      while (stream) {
        const streamOutput = await ai.parseStream(stream);

        if (streamOutput === false) {
          break;
        }

        setOutput((prev) => prev + streamOutput);
        completeMessage += streamOutput;
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setStream(null);
    }

    return completeMessage;
  };

  const sendStopSignal = async () => {
    try {
      await ai.sendStopSignal(stream);
      setStream(null);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsGenerating(stream !== null);
  }, [stream]);

  return {
    generateMessage,
    isGenerating,
    output,
    setOutput,
    resetOutput,
    sendStopSignal,
  };
};

export default useAI;
