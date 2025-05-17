import fs from 'fs';
import path from 'path';

/**
 * Simple fallback HTML template for ticket verification
 */
const FALLBACK_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Verification</title>
    <style>
        body { font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .success { color: #2ecc71; }
        .failure { color: #e74c3c; }
        .title { font-size: 24px; font-weight: bold; }
        .details { margin-top: 20px; border: 1px solid #eee; padding: 15px; }
    </style>
</head>
<body>
    <h1 class="{{titleClass}}">{{title}}</h1>
    <div class="{{statusClass}}">{{statusMessage}}</div>
    
    <div class="details">
        <p><strong>Event:</strong> {{eventName}}</p>
        <p><strong>Sector:</strong> {{sectorName}}</p>
        <p><strong>Wallet Address:</strong> {{walletAddress}}</p>
    </div>
</body>
</html>`;

/**
 * Simple template engine that replaces placeholders in the format {{key}} with values
 * and handles basic conditional includes
 *
 * @param template The template string with {{key}} placeholders
 * @param replacements Object with key-value pairs for template placeholders
 * @returns Rendered string content
 */
const compileTemplate = (template: string, replacements: Record<string, string>): string => {
  // Handle basic conditionals like {{#var.includes('value')}}content{{else}}alternative{{/var.includes}}
  let result = template.replace(
    /{{#(\w+)\.includes\('([^']+)'\)}}(.*?){{else}}(.*?){{\/\1\.includes}}/gs,
    (match, variable, value, ifContent, elseContent) => {
      const varValue = replacements[variable] || '';
      return varValue.includes(value) ? ifContent : elseContent;
    }
  );

  // Handle simple variable replacement {{variable}}
  result = result.replace(/{{(\w+)}}/g, (match, key) => {
    return replacements[key] !== undefined ? replacements[key] : match;
  });

  return result;
};

/**
 * Renders an HTML template by replacing placeholders with values
 *
 * @param templatePath Path to the template file (absolute or relative)
 * @param replacements Object with key-value pairs for template placeholders
 * @returns Rendered HTML content
 */
export const renderTemplate = (templatePath: string, replacements: Record<string, string>): string => {
  try {
    // Read the template file
    let resolvedPath = templatePath;
    let templateContent = '';

    // Try different path resolutions if the file doesn't exist
    if (!fs.existsSync(resolvedPath)) {
      // Try to resolve from current working directory
      resolvedPath = path.resolve(process.cwd(), templatePath);

      // If still doesn't exist, try relative to the src directory
      if (!fs.existsSync(resolvedPath)) {
        const srcPath = path.join(process.cwd(), 'src', templatePath);
        if (fs.existsSync(srcPath)) {
          resolvedPath = srcPath;
        } else {
          // If we still can't find it, use the fallback template
          console.warn(`Template file not found at ${templatePath}, using fallback template`);
          templateContent = FALLBACK_TEMPLATE;
        }
      }
    }

    // Read the file if we found it
    if (!templateContent && resolvedPath) {
      try {
        templateContent = fs.readFileSync(resolvedPath, 'utf8');
      } catch (readError) {
        console.warn(`Error reading template: ${readError}, using fallback template`);
        templateContent = FALLBACK_TEMPLATE;
      }
    }

    // Render the template with our simple template engine
    return compileTemplate(templateContent, replacements);
  } catch (error) {
    console.error(`Failed to render template (${templatePath}): ${error}`);
    // Very simple fallback with no styling if everything fails
    let errorHtml = `<html><body><h1>Template Error</h1><p>${error}</p>`;

    // Add the data we were trying to render
    errorHtml += '<h2>Template Data:</h2><pre>' + JSON.stringify(replacements, null, 2) + '</pre></body></html>';

    return errorHtml;
  }
};
