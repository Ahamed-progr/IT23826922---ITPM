const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

function normalize(str) {
  return str.trim().toLowerCase();
}


// Test Data
const TEST_DATA = {
  positive: [
    {
      tcId: 'Pos_Fun_0001',
      name: 'Convert simple daily sentence',
      input: 'mama gedhara yanavaa',
      expected: 'මම ගෙදර යනවා'
    },
    {
      tcId: 'Pos_Fun_0002',
      name: 'Convert interrogative sentence',
      input: 'oyaa enavadha?',
      expected: 'ඔයා එනවද?'
    },
    {
      tcId: 'Pos_Fun_0003',
      name: 'Convert imperative command',
      input: 'issarahata yanna',
      expected: 'ඉස්සරහට යන්න'
    },
     {
      tcId: 'Pos_Fun_0004',
      name: 'Convert negative sentence form',
      input: 'mama ehema karanne naehae',
      expected: 'මම එහෙම කරන්නේ නැහැ'
    },
     {
      tcId: 'Pos_Fun_0005',
      name: 'Convert Request sentence form',
      input: 'karuNaakaralaa mata podi udhavvak karanna puluvandha?',
      expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුලුවන්ද?'
    },
     {
      tcId: 'Pos_Fun_0006',
      name: 'Punctuation',
      input: 'meeka hariyata vaeda karanavaadha?',
      expected: 'මේක හරියට වැඩ කරනවාද?'
    },
     {
      tcId: 'Pos_Fun_0007',
      name: 'Convert mixed Singlish and English input',
      input: 'Zoom meeting ekak thiyennee heta',
      expected: 'Zoom meeting එකක් තියෙන්නේ හෙට'
    },
     {
      tcId: 'Pos_Fun_0008',
      name: 'greetings',
      input: 'suba udhaeesanak',
      expected: 'සුබ උදෑසනක්'
    },
     {
      tcId: 'Pos_Fun_0009',
      name: 'Place name',
      input: 'api Kandy yamu',
      expected: 'අපි Kandy යමු'
    },
     {
      tcId: 'Pos_Fun_0010',
      name: 'Convert daily responses',
      input: 'uba palayan passe, mama ennam',
      expected: 'උබ පලයන් පස්සෙ, මම එන්නම්'
    },
     {
      tcId: 'Pos_Fun_0011',
      name: 'Abbreviation',
      input: 'ID eka dhenna',
      expected: 'ID එක දෙන්න'
    },
     {
      tcId: 'Pos_Fun_0012',
      name: 'Plural pronoun',
      input: 'oyaalaa enavadha?',
      expected: 'ඔයාලා එනවද?'
    },
     {
      tcId: 'Pos_Fun_0013',
      name: 'Convert daily responses',
      input: 'mata meaka  karaganna puluvan ',
      expected: 'මට මේක  කරගන්න පුලුවන් '
    },
     {
      tcId: 'Pos_Fun_0014',
      name: 'Future tense usage ',
      input: 'api heta ennam',
      expected: 'අපි හෙට එන්නම්'
    },
     {
      tcId: 'Pos_Fun_0015',
      name: 'Currency formats ',
      input: 'Rs.5000 k  ganna puluvandha?',
      expected: 'Rs.5000 ක්  ගන්න පුලුවන්ද?'
    },
     {
      tcId: 'Pos_Fun_0016',
      name: 'informal phrase',
      input: 'hariyata karapan',
      expected: 'හරියට කරපන්'
    },
     {
      tcId: 'Pos_Fun_0017',
      name: 'Convert Long sentences',
      input: 'mama gedhara innee dhaen. heta api office yanna thiyenavaa.vaessa thibboth traffic thiyanna puluvan.',
      expected: 'මම ගෙදර ඉන්නේ දැන්. හෙට අපි office යන්න තියෙනවා.වැස්ස තිබ්බොත් traffic තියන්න පුලුවන්.'
    },
     {
      tcId: 'Pos_Fun_0018',
      name: 'Past tense usage ',
      input: 'iiye oya kohedha hitiye?',
      expected: 'ඊයෙ ඔය කොහෙද හිටියෙ?'
    },
     {
      tcId: 'Pos_Fun_0019',
      name: 'Present tense usage',
      input: 'mama pothak kiyavanavaa',
      expected: 'මම පොතක් කියවනවා'
    },
     {
      tcId: 'Pos_Fun_0020',
      name: 'Urgent command',
      input: 'vahaama kriyaathmaka karanna',
      expected: 'වහාම ක්‍රියාත්මක කරන්න'
    },
     {
      tcId: 'Pos_Fun_0021',
      name: 'Repetitation words',
      input: 'mama sinhala chutta chutta dhannavaa',
      expected: 'මම sinhala චුට්ට චුට්ට දන්නවා'
    },
     {
      tcId: 'Pos_Fun_0022',
      name: 'Time format',
      input: 'class eka havasa 4.00 ta patangannavaa',
      expected: 'class එක හවස 4.00 ට පටන්ගන්නවා'
    },
    {
      tcId: 'Pos_Fun_0023',
      name: 'complex sentences',
      input: 'oyaa hariyata paadam karaanam, pass venna puluvan',
      expected: 'ඔයා හරියට පාඩම් කරානම්, pass වෙන්න පුලුවන්'
    }
    
  ],

  negative: [
    {
      tcId: 'Neg_Fun_0001',
      name: 'Empty input',
      input: '',
      expected: 'no output'
    },
    {
      tcId: 'Neg_Fun_0002',
      name: 'Numbers only',
      input: '232332',
      expected: ''
    },
    {
      tcId: 'Neg_Fun_0003',
      name: 'Pure English',
      input: 'I am a student',
      expected: ''
    },
    {
      tcId: 'Neg_Fun_0004',
      name: 'Extra space',
      input: 'mama   gedhara            giyaa',
      expected: 'මම ගෙදර ගියා'
    },
    {
      tcId: 'Neg_Fun_0005',
      name: 'Word Repitation',
      input: 'mama mama  paadam paadam paadam paadam karanavaa karanavaa',
      expected: 'මම පාඩම් කරනවා'
    },
    {
      tcId: 'Neg_Fun_0006',
      name: 'Emoji',
      input: 'mama 😊 gedhara yanavaa',
      expected: 'මම ගෙදර යනවා'
    },
    {
      tcId: 'Neg_Fun_0007',
      name: 'Invalid symbols ',
      input: ' #$$@@$$#$',
      expected: ''
    },
    {
      tcId: 'Neg_Fun_0008',
      name: 'line braking format',
      input: 'mama gedhara \n giyaa',
      expected: 'මම ගෙදර ගියා'
    },{
      tcId: 'Neg_Fun_0009',
      name: 'Repeating puctuation symbols',
      input: 'oyaa kavadhdha enne?????',
      expected: 'ඔයා කවද්ද එන්නෙ?'
    }
  ],

  ui: {
    tcId: 'Pos_UI_0001',
    name: 'Real-time translation updates as typing',
    input: 'mama paadam karanavaa',
    partialInput: 'mama paada',
    expectedFull: 'මම පාඩම් කරනවා'
  },
  ui: {
    tcId: 'Pos_UI_0002',
    name: 'Real-time translation updates as typing',
    input: 'api paadam karamu',
    partialInput: 'api paada',
    expectedFull: 'අපි පාඩම් කරමු'
  },
  ui: {
    tcId: 'Neg_UI_0001',
    name: 'Real-time translation updates as typing',
    input: 'mama kaeema kannavaa',
    partialInput: 'mama kae',
    expectedFull: 'මම කෑම කන්නවා'
  },
};

// Helper Functions (Page Object Model)
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    // FIX: swifttranslator textbox has NO accessible name
    return this.page.getByPlaceholder(CONFIG.selectors.inputField);
  }

  async getOutputField() {
    return this.page.locator(CONFIG.selectors.outputContainer).first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.click();
    await input.press('Control+A');
    await input.press('Backspace');
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    if (text !== '') {
      await input.type(text, { delay: 40 });
    }
  }

  async waitForOutput() {
    await expect.poll(
      async () => {
        const output = await this.getOutputField();
        const text = await output.textContent();
        return text?.trim();
      },
      { timeout: 10000 }
    ).not.toBe('');
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    return (await output.textContent()).trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(normalize(actualOutput)).toBe(normalize(testCase.expected));
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async () => {
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();

      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      await translator.page.waitForTimeout(1500);

      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);

      await input.pressSequentially(
        TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length),
        { delay: 150 }
      );

      await translator.waitForOutput();
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);

      await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
