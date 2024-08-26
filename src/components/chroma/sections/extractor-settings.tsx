import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import * as z from 'zod';

export default function ExtractorSettings() {
  const settingsSchema = z.object({
    numberOfColors: z.coerce
      .number({
        invalid_type_error: 'The numbers of color to extract must be a number',
      })
      .min(3, {
        message:
          'at least 3 colors must be extracted (primary, secondary, accent)',
      })
      .max(10, {
        message: "ok that's a lot of colors don't you think ?",
      })
      .describe('Numbers of colors to extract from image')
      .default(5)
      .optional(),

    extractionAlgorithm: z
      .enum(['K-MEANS', 'K-MEANS++'])
      .default('K-MEANS')
      .describe('Algorithm used to extract colors')
      .optional(),
  });

  return (
    <AutoForm formSchema={settingsSchema}>
      <AutoFormSubmit>Apply settings</AutoFormSubmit>
    </AutoForm>
  );
}
