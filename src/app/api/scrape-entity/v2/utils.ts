import 'server-only';

import { model } from '@/lib/model';
import { log } from '@/utils/global/logger';
import { generateObject } from 'ai';
import type { z } from 'zod';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import * as cheerio from 'cheerio'; 

function cleanHTML(html: string): string {
  const $ = cheerio.load(html);
  $('script, style, noscript, meta, link').remove();
  $('*').each(function() {
    const el = $(this);
    el.removeAttr('class');
    el.removeAttr('style');
    el.removeAttr('id');
  });
  
  // Compress HTML
  return $.html()
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

// scroll slowly to the bottom of the page
async function autoScroll(page: puppeteer.Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

export async function scrapPageV2(
  schemaName: string,
  schema: z.ZodSchema,
  url: string,
  systemPrompt: string
) {

  const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await autoScroll(page);

   await page.waitForSelector('iframe', { timeout: 5000 }).catch(() => {
    console.log('No iframes found on the page.');
  });

  // Get all iframe elements
  const iframeElements = await page.$$('iframe');

  for (const iframeEl of iframeElements) {
    const frame = await iframeEl.contentFrame();
    if (frame) {
      const innerHTML = await frame.content();

      // Inject the iframe HTML back into the parent page
      await page.evaluate(
        (el, html) => {
          el.removeAttribute('src'); 
          el.innerHTML = html;       
        },
        iframeEl,
        innerHTML
      );
    }
  }

  // Save the full page with inlined iframe content
  const fullHTML = await page.content();
  
  await browser.close();

  const cleanedHTML = cleanHTML(fullHTML);
  const MAX_HTML_SIZE = 30000; 
  const processedHTML = cleanedHTML.length > MAX_HTML_SIZE 
      ? cleanedHTML.substring(0, MAX_HTML_SIZE) + '... [TRUNCATED]' 
      : cleanedHTML;
  
  console.log('Processed HTML:', processedHTML);
  const filePath = path.join(process.cwd(), 'scraped-page.html');
  fs.writeFileSync(filePath, processedHTML, 'utf-8');

  const { object, usage, warnings } = await generateObject({
    model: model('google'),
    schemaName: schemaName,
    schema: schema,
    system: systemPrompt,
    // prompt: processedHTML,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'file',
            data: new URL(url),
            mimeType: 'text/html',
          },
        ],
      },
    ],
  });

  log.info('Usage: ', {
    url,
    usage,
  });

  if (warnings && warnings.length > 0) {
    log.warning('Warnings: ', {
      url,
      warnings,
    });
  }

  return new Response(JSON.stringify(object), { status: 200 });
}
