import { inngest } from '@/lib/inngest/client';
import { sendDailyNewsSummary, sendSignupEmail } from '@/lib/inngest/functions';
import { serve } from 'inngest/next';

export const { POST, GET, PUT } = serve({
  client: inngest,
  functions: [sendSignupEmail, sendDailyNewsSummary],
});
