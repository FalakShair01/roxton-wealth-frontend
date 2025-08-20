import { FORM_DATA } from '@/constants/form-data';

export const GenerateStepsFromFormData = () => {
  return FORM_DATA.map((section) => {
    const { title, sections } = section;

    let subTitles: string[] = [];

    if (sections) {
      subTitles = sections.map((s) => s.sub_title).filter(Boolean);
    }

    return {
      title,
      ...(subTitles.length > 0 && { subTitles })
    };
  });
};
