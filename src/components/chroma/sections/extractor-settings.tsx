import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import useChromaStore from '@/stores/chroma';
import * as z from 'zod';

export default function ExtractorSettings() {
  const settings = useChromaStore((state) => state.settings);
  const settingsSchema = z.object({
    n_colors: z.coerce
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
      .default(settings.n_colors),

    algorithm: z.enum(['KMeans', 'KMeansPP']).default(settings.algorithm),
  });

  const setSettings = useChromaStore((state) => state.setSettings);
  return (
    <AutoForm
      formSchema={settingsSchema}
      fieldConfig={{
        n_colors: {
          description: 'The number of colors you want to extract',
        },
        algorithm: {
          description: 'The algorithm used to extract colors from image',
        },
      }}
      onSubmit={(data) => setSettings(data)}
    >
      <AutoFormSubmit>Apply settings</AutoFormSubmit>
    </AutoForm>
  );
}
