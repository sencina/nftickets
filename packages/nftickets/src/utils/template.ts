import fs from 'fs';
import path from 'path';

/**
 * Renders an HTML template by replacing placeholders with values
 *
 * @param templatePath Relative path to the template file from the project root
 * @param replacements Object with key-value pairs for template placeholders
 * @returns Rendered HTML content
 */
export const renderTemplate = (templatePath: string, replacements: Record<string, string>): string => {
  try {
    // Read the template file
    const templateContent = fs.readFileSync(path.resolve(process.cwd(), templatePath), 'utf8');

    // Replace all placeholders in the template
    let renderedContent = templateContent;
    for (const [key, value] of Object.entries(replacements)) {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      renderedContent = renderedContent.replace(placeholder, value);
    }

    return renderedContent;
  } catch (error) {
    console.error(`Failed to render template: ${error}`);
    return `<html><body><h1>Template Error</h1><p>${error}</p></body></html>`;
  }
};
